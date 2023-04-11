import { Button, Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react"
import { IUserProfile } from "../../../globaltypes"
import { PAYOUT_DOMAIN } from "../../../hooks/constants"
import apiClient from "../../../utils/apiClient"
import { FlexColCenterBetween, FlexRowCenterBetween, FlexRowCenterStart } from "../../../utils/theme/FlexConfigs"
import { useRef } from "react"


interface StepProps {
    onCompleted: (data?: Partial<IUserProfile>) => void,
    onBack: () => void,
}

// this isn't gonna be used anywhere else
export const getStripeOnBoardingUrl = () => {
    return apiClient.post(PAYOUT_DOMAIN).then((res)=> res.data.url)
}


const OnBoardingPayoutMethod = (props: StepProps) => {
    const toast = useToast()
    const { onCompleted, onBack } = props
    const loading = useRef(false)

    const handleOnStripeOnboarding = async () =>{
        loading.current = true
        try {
            const url = await getStripeOnBoardingUrl()
            loading.current = false
            // redirect to stripe onboarding
            window.location.href = url
        } catch (error) {
            loading.current = false
            toast({
                title: "Error",
                description: "An error occurred while trying to on board you with stripe",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Flex w="full" h="full" {...FlexColCenterBetween}  >
            <Grid w="80%" justifyItems={"center"} templateRows="80px 80px 40px 40px" >
                <GridItem w="full" colSpan={1} rowSpan={1} >
                    <Text>
                        Add your payout method
                    </Text>
                    <Text>
                        We use stripe as our payment processor, adding an account with stripe will enable you to receive payments from your customers
                    </Text>
                </GridItem>
                <GridItem w="full" >
                    <Button onClick={handleOnStripeOnboarding}>
                        Continue to Stripe
                    </Button>
                </GridItem>
            </Grid>
            <Flex w="80%" {...FlexRowCenterStart} >
                <Button onClick={onBack}
                    isLoading={loading.current}
                    loadingText="Loading..."
                >
                    Back
                </Button>
                
            </Flex>
        </Flex>
    )
}

export default OnBoardingPayoutMethod