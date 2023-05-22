import { Button, Divider, Flex, Grid, Progress, Stack, Switch, Text, useToast, List, ListItem, Box, useDisclosure } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import { FlexColCenterStart, FlexColStartStart, FlexRowCenterBetween, FlexColCenterBetween, FlexColStartBetween, FlexRowStartBetween } from "../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUpdateUserSettingsFeedback, selectUser, updateUserSettings } from "../../redux/userSlice";
import { updatePayoutMethod } from '../../redux/payoutSlice'
import { useRouter } from "next/router";
import { tBankAccountPayoutSchema } from "../../components/organism/Forms/BankPayoutMethod";
import { DeleteIcon } from '@chakra-ui/icons'
import WithDrawalModal from '../../components/organism/Modals/WithDrawalModal'
import Image from 'next/image';






const SettingsPage: NextPage = () => {

    const toast = useToast({
        position: "top"
    })
    const user = useAppSelector(selectUser)
    const settingsUpdateFeedback = useAppSelector(selectUpdateUserSettingsFeedback)
    const dispatch = useAppDispatch()
    const { push } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()


    const newPayoutMethod = () => {
        push("/settings/new-payout-method")
    }

    const updateSettings = (setting: 'notifications_enabled' | 'tracking_enabled') => {
        dispatch(updateUserSettings({
            [setting]: !user?.user_settings?.[setting]
        })).unwrap().catch(() => {
            toast({
                title: "Something went wrong",
                description: 'Try again later'
            })
        })
    }



    const handleDelete = (id: string) => {
        dispatch(updatePayoutMethod({
            id: id,
            status: "INACTIVE"
        })).then(() => {
            toast({
                title: 'Success',
                description: 'Payout Method Deleted'
            })
        }).catch(() => {
            toast({
                title: 'Error',
                description: 'An Error occured while deleteing the payout method'
            })
        })
    }


    return (
        <Flex {...FlexColCenterStart} w="full" h="full" >
            <Text
                w="full"
                fontSize={"2xl"}
                fontWeight="bold"
                color="#E63B2E"
            >Settings</Text>
            {
                settingsUpdateFeedback?.loading && <Progress isIndeterminate w="full" colorScheme="primary.1000" />
            }
            <Flex p='40px'  w="full" h={'151px'} rounded='3xl' boxShadow={'lg'} columnGap={"20px"} rowGap="20px"  >
                <Flex w="full" rounded="md" p="10px 10px" display={"flex"} {...FlexColStartBetween} >
                    <Flex w='full' display={"flex"}  {...FlexRowCenterBetween}>
                    <Text fontSize="xl" fontWeight="semibold" color="gray.800" >
                        Notifications Enabled
                    </Text>
                    <Switch
                        isChecked={user?.user_settings?.notifications_enabled}
                        onChange={() => updateSettings('notifications_enabled')}
                    />
                    </Flex>
                
                    <Flex w='full' display={"flex"} marginTop='10px'  {...FlexRowCenterBetween}>
                    <Text fontSize="xl" fontWeight="semibold" color="gray.800" >
                        Tracking enabled
                    </Text>
                    <Switch
                        isChecked={user?.user_settings?.tracking_enabled}
                        onChange={() => updateSettings('tracking_enabled')}
                    />
                    </Flex>
                </Flex>

            </Flex>
            <Divider my="20px" />
            <Grid rounded='3xl' p='40px' experimental_spaceY="10px" w="full" h="309px" boxShadow={'lg'}  >
                <Text
                    w="full"
                    fontSize={"3xl"}
                    fontWeight="bold"
                    color="gray.700"
                >Earnings Summary</Text>

                <Grid templateColumns={"1fr 1fr"} w="full" rounded='md' justifyContent={'space-around'} h={'122px'} columnGap={"20px"} rowGap="20px"  >
                    <Flex p='20px' w="543px" h='140px' marginRight={'148px'} backgroundColor={'#ebedef'} marginBottom='18px' rounded="md"  {...FlexColStartStart} >
                        <Text marginLeft='20px' fontSize="xl" fontWeight="semibold" color="gray.800"  >
                            All Time
                        </Text>
                        <Text marginLeft='20px'  marginTop={7} fontSize="xl" fontWeight="semibold" color="gray.800"  >
                            {user?.market?.currency} {user?.earnings?.all_time}
                        </Text>
                    </Flex>
                    <Flex p='20px' w="543px" h='140px' backgroundColor={'#ebedef'}  marginBottom='18px' rounded="md"  {...FlexColStartStart} >
                        <Text marginLeft='20px'  fontSize="xl" fontWeight="semibold" color="gray.800"  >
                            Balance
                        </Text>
                        <Flex {...FlexRowCenterBetween}   w="full"  >
                            <Text  marginLeft='20px' marginTop={7} fontSize="xl" fontWeight="semibold" color="gray.800"  >
                                {
                                    user?.market?.currency
                                }
                                {
                                    user?.earnings?.available
                                }
                            </Text>

                            <Button backgroundColor={'#2E72CA'} marginTop='20px'  color='white' onClick={onOpen}>Withdraw</Button>
                        </Flex>
                        <WithDrawalModal isOpen={isOpen} onClose={onClose} />
                    </Flex>
                </Grid>
            </Grid>
            <Divider my="20px" />
            <Flex rounded='3xl' p='25px' {...FlexColStartStart} w="full" h={'417px'}  experimental_spaceY={"10px"} boxShadow={'lg'} >
                <Text marginLeft='10px' fontSize={"2xl"} fontWeight="semibold"  >
                    Payout Methods
                </Text>
                <Text marginLeft='10px' fontSize={"md"} fontWeight="semibold" color="gray.500" my="10px" >
                    To change your primary payout method, choose from the list below.
                </Text>
                <List p="10px" height='290px' w="full" rounded="md"  >
                    <Stack spacing={4} direction={"column"} >
                        {
                            user?.PayoutMethods?.map((method) => {
                                return (
                                    <>
                                        <ListItem ring='1px' padding='8px' rounded='2xl' key={method.id} value={method.id} >
                                            <Flex {...FlexRowCenterBetween} >
                                                <Box style={{ marginLeft: 20 }}>
                                                {method?.type === "MPESA" ? <Image src={"/images/mpesa.png"} width={40} height={40} alt='img' /> : method?.type === "PAYPAL" ? <Image src={"/images/paypal.png"} width={40} height={40} alt='img' /> : method?.type === "BANK_ACCOUNT" ? <Image src={"/images/visa.png"} width={40} height={40} alt='img' /> : method?.type === "MTN" ? <Image src={"/images/mtn.png"} width={40} height={40} alt='img' /> : null}
                                                </Box>
                                                <Box style={{ marginRight: 20 }}>
                                                    <DeleteIcon boxSize={6} onClick={() => handleDelete(method.id)} />
                                                </Box>

                                            </Flex>
                                        </ListItem>
                                    </>
                                )
                            })
                        }
                    </Stack>
                </List>
                
                <Button marginLeft='10px' backgroundColor="#38b0008f" color='white' height='53px' rounded='xl' onClick={newPayoutMethod} >
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