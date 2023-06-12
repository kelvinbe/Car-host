/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, Grid, GridItem, Select, Text } from "@chakra-ui/react"
import { IUserProfile } from "../../../globaltypes"
import useLocation from "../../../hooks/useLocation"
import { selectMarketId, selectOnBoardingLoading, selectSubMarketId, setMarketId, setSubMarketId } from "../../../redux/onboardingSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { FlexColCenterBetween, FlexRowCenterBetween } from "../../../utils/theme/FlexConfigs"
import { isEmpty } from "lodash"
import { useEffect } from "react"


interface StepProps {
    onCompleted: (data?: Partial<IUserProfile>) => void,
    onBack: () => void,
}




const OnBoardinLocation = (props: StepProps) => {
    const { onCompleted, onBack } = props
    const marketId = useAppSelector(selectMarketId)
    const submarketId = useAppSelector(selectSubMarketId)
    const loading = useAppSelector(selectOnBoardingLoading)

    const dispatch = useAppDispatch()

    const updateMarket = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setMarketId(e.target.value))
    const updateSubmarket = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setSubMarketId(e.target.value))
    const { fetchMarkets, fetchSubmarkets, markets, submarkets } = useLocation()

    useEffect(() => {
        fetchMarkets()
    }, [])

    useEffect(() => {
        marketId && fetchSubmarkets(marketId as string)
    }, [marketId])

    const handleContinue = () => {
        onCompleted({
            market_id: marketId as string,
            sub_market_id: submarketId as string,
        })
    }


    return (
        <Flex  {...FlexColCenterBetween} h="full" w="full" >
            <Grid w="80%" justifyItems={"center"} templateRows="40px 40px 40px 40px" >
                <GridItem colSpan={1} rowSpan={1} >
                    <Text>
                        Add your location details
                    </Text>
                </GridItem>
                <GridItem w="full" >
                    <Grid
                        templateColumns={"1fr 1fr"}
                        w="full"
                        columnGap={40}
                        rowGap={10}
                    >
                        <GridItem colSpan={1} >
                            <FormControl
                                isRequired
                            >
                                <Select 
                                value={marketId as string}
                                onChange={
                                    updateMarket
                                } placeholder="Select a Market"  >
                                    {markets?.data?.map((market) => (
                                        <option key={market.id} value={market.id} >
                                            {market.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    Please select a market
                                </FormErrorMessage>
                                <FormHelperText>
                                    Your market is the country you are located in
                                </FormHelperText>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1} >
                            <FormControl
                                isRequired
                                isDisabled={!marketId}
                            >
                                <Select key={markets?.data?.length} onChange={
                                    updateSubmarket
                                } placeholder="Select a Sub Market"  value={submarketId as string} >
                                    {submarkets?.data?.map((market) => (
                                        <option key={market.id} value={market.id} >
                                            {market.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    Your submarket is the city you are located in
                                </FormHelperText>
                                <FormErrorMessage>
                                    Please select a market (country)
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
            <Flex {...FlexRowCenterBetween} w="full" >
                <Flex w="full" {...FlexRowCenterBetween} >
                    <Button  data-testid='back'
                        onClick={onBack}
                        disabled={loading}
                    >
                        Back
                    </Button>
                    <Button
                        isLoading={loading}
                        disabled={isEmpty(marketId) || isEmpty(submarketId)}
                        onClick={handleContinue}
                        data-testid='continue'
                    >
                        Continue
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default OnBoardinLocation