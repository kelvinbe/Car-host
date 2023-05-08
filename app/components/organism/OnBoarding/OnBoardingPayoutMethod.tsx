import { Divider, Flex, FormControl, FormLabel, Select, Text, useToast, Progress } from "@chakra-ui/react"
import { IUserProfile } from "../../../globaltypes"
import { FlexColCenterStart } from "../../../utils/theme/FlexConfigs"
import { useState } from "react"
import BankPayoutMethodForm, { tBankAccountPayoutSchema } from "../Forms/BankPayoutMethod"
import MobileMoneyPayoutMethodForm, { tMobileMoneyPayoutSchema } from "../Forms/MobileMoneyPayoutMethodForm"
import { ZodFormattedError } from "zod"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { addPayoutMethod, selectPayoutFeedback } from "../../../redux/payoutSlice"
import { isNull } from "lodash"
import { useRouter } from "next/router"
import { selectUser } from "../../../redux/userSlice"


interface StepProps {
    onCompleted: (data?: Partial<IUserProfile> | null) => void,
    onBack: () => void,
}


const OnBoardingPayoutMethod = (props: StepProps) => {
    const { onBack } = props
    const toast = useToast({
        position: "top"
    })
    const [payout_method, set_payout_method] = useState<string>("bank")
    const feedback = useAppSelector(selectPayoutFeedback)
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const { push } = useRouter()

    const handleBankCompleted = (data: Partial<tBankAccountPayoutSchema> & {agrees: boolean} | null, error: ZodFormattedError<tBankAccountPayoutSchema, string> | null ) => {
        if (isNull(data)) return
        dispatch(addPayoutMethod({
            details: data,
            type: "BANK_ACCOUNT"
        })).unwrap().then(()=>{
            push("/dashboard")
        }).catch((e)=>{
            toast({
                title: "Error",
                description: "An error occured while adding your payout method",
            })
        })
    }

    const handleMobileMoneyCompleted = (data: Partial<tMobileMoneyPayoutSchema> & { agrees: boolean } | null, error: ZodFormattedError<tMobileMoneyPayoutSchema, string> | null) => {
        if (isNull(data)) return 
        dispatch(addPayoutMethod({
            details: data,
            type: data?.provider
        })).unwrap().then(()=>{
            push("/dashboard")
        }).catch((e)=>{
            toast({
                title: "Error",
                description: "An error occured while adding your payout method",
            })
        })
    }

    return (
        <Flex flex="1"  w="full" h="full" {...FlexColCenterStart}  >
            {feedback.loading && <Progress size="xs"  isIndeterminate w="full" my="2" />}
            <Flex w="full" {...FlexColCenterStart} >
                <Text w="full" textAlign={"left"} fontSize="3xl" fontWeight="semibold" >
                    How would you like to get paid?
                </Text>
                <Divider my="20px" />
                <FormControl>
                    <FormLabel>
                        Choose a payout method
                    </FormLabel>
                    <Select value={payout_method} onChange={(e)=>{
                        set_payout_method(e.target.value)
                    }} placeholder="Choose a payout method" >
                        <option value="bank">Bank</option>
                        <option value="mobilemoney">Mobile Money</option>
                        {/* OThers can be added here */}
                    </Select>
                </FormControl>
                <Flex {...FlexColCenterStart} flex="1" px="20px" py="20px" >
                    {
                        payout_method === "bank" ? <BankPayoutMethodForm onDone={handleBankCompleted} onCancel={onBack} /> : <MobileMoneyPayoutMethodForm onDone={handleMobileMoneyCompleted} onCancel={onBack} />
                    }
                </Flex>
                
            </Flex>
        </Flex>
    )
}

export default OnBoardingPayoutMethod