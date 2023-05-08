import { Button, Divider, Flex, Grid, GridItem, Progress, Radio, RadioGroup, Stack, Switch, Text, useToast } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import { FlexColCenterStart, FlexColStartStart, FlexRowCenterBetween, FlexRowCenterStart } from "../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUpdateUserSettingsFeedback, selectUser, updateUserSettings } from "../../redux/userSlice";
import { useRouter } from "next/router";
import { PayoutMethods } from "../../globaltypes";
import { tBankAccountPayoutSchema } from "../../components/organism/Forms/BankPayoutMethod";




const SettingsPage: NextPage = () => {

    const toast = useToast({
        position: "top"
    })
    const user = useAppSelector(selectUser)
    const settingsUpdateFeedback = useAppSelector(selectUpdateUserSettingsFeedback)
    const dispatch = useAppDispatch()
    const { push } = useRouter()

    const newPayoutMethod = () => {
        push("/settings/new-payout-method")
    }

    const updateSettings = ( setting: 'notifications_enabled' | 'tracking_enabled' ) => {
        dispatch(updateUserSettings({
            [setting]: !user?.user_settings?.[setting]
        })).unwrap().catch((e)=>{
            toast({
                title: "Something went wrong",
                description: 'Try again later'
            })
        })
    }

    

     return (
        <Flex {...FlexColCenterStart} w="full" h="full" >
            <Text 
                w="full"
                fontSize={"3xl"}
                fontWeight="bold"
                color="gray.700"
            >Settings</Text>
            {
                settingsUpdateFeedback?.loading && <Progress isIndeterminate w="full" colorScheme="primary.1000" />
            }
            <Grid templateColumns={"1fr 1fr"} w="full" columnGap={"20px"} rowGap="20px"  >
                <Flex w="full" ring={"1px"} rounded="md"  p="10px 10px" display={"flex"} {...FlexRowCenterBetween} >
                    <Text fontSize="xl" fontWeight="semibold" color="gray.800" >
                        Notifications Enabled
                    </Text>
                    <Switch
                        isChecked={user?.user_settings?.notifications_enabled}
                        onChange={()=>updateSettings('notifications_enabled')}
                    />
                </Flex>
                <Flex w="full" ring={"1px"} rounded="md"  p="10px 10px" display={"flex"} {...FlexRowCenterBetween} >
                    <Text fontSize="xl" fontWeight="semibold" color="gray.800" >
                        Tracking enabled
                    </Text>
                    <Switch
                        isChecked={user?.user_settings?.tracking_enabled}
                        onChange={()=>updateSettings('tracking_enabled')}
                    />
                </Flex>
            </Grid>
            <Divider my="20px" />
            <Grid experimental_spaceY="10px" w="full" >
                <Text 
                    w="full"
                    fontSize={"3xl"}
                    fontWeight="bold"
                    color="gray.700"
                >Earnings</Text>

                <Grid templateColumns={"1fr 1fr"} w="full" columnGap={"20px"} rowGap="20px"  >
                    <Flex w="full" ring={"1px"} rounded="md"  p="10px 10px" {...FlexColStartStart} >
                        <Text fontSize="xl" fontWeight="semibold" color="gray.800"  >
                            All Time 
                        </Text>
                        <Text fontSize="xl" fontWeight="semibold" color="gray.800"  >
                            {user?.market?.currency} {user?.earnings?.all_time}
                        </Text>
                    </Flex>
                    <Flex w="full" ring={"1px"} rounded="md"  p="10px 10px" {...FlexColStartStart} >
                        <Text fontSize="xl" fontWeight="semibold" color="gray.800"  >
                            This Month
                        </Text>
                        <Flex {...FlexRowCenterBetween} w="full"  >
                            <Text fontSize="xl" fontWeight="semibold" color="gray.800"  >
                                {
                                    user?.market?.currency
                                }
                                {
                                    user?.earnings?.month
                                }
                            </Text>

                            <Text fontWeight="medium" color="gray.500" fontSize={"sm"} >
                                This amount will get sent to your primary payout method at the end of the month.
                            </Text>
                        </Flex>
                        
                    </Flex>
                </Grid>
            </Grid>
            <Divider my="20px" /> 
            <Flex {...FlexColStartStart} w="full" experimental_spaceY={"10px"} >
                <Text fontSize={"2xl"} fontWeight="semibold"  >
                    Payout Methods
                </Text>
                <Text fontSize={"md"} fontWeight="semibold" color="gray.500" my="10px" >
                    To change your primary payout method, choose from the list below.
                </Text>
                <RadioGroup p="10px" ring="1px" w="full" rounded="md"  >
                    <Stack spacing={4} direction={"column"} >
                        {
                            user?.PayoutMethods?.map((method)=>{
                                return (
                                    <Radio key={method.id} value={method.id} >
                                        <Flex {...FlexRowCenterStart} >
                                            <Text fontSize={"lg"} fontWeight="semibold" color="gray.700" >
                                                {
                                                    method?.type === "PAYPAL" ? method?.paypal_email :
                                                    method?.type === "BANK_ACCOUNT" ? (method?.details as Partial<tBankAccountPayoutSchema>)?.account_number :
                                                    method?.type === "MPESA" ? method?.details?.phone_number :
                                                    method?.type === "MTN" ? method?.details?.phone_number :
                                                    null
                                                } ({method?.type})
                                            </Text>
                                        </Flex>
                                    </Radio>
                                )
                            })
                        }
                    </Stack>
                </RadioGroup>
                <Button colorScheme="green" onClick={newPayoutMethod} >
                    New Payout Method
                </Button>
            </Flex>
        </Flex>
     )
}


export default SettingsPage;


export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true,
        }
    }
}