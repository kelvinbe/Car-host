import { Flex, Grid, GridItem, Heading, Text, Tooltip, Switch } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Rounded from '../../components/molecules/Buttons/General/Rounded';
import FilterableTable from '../../components/organism/Table/FilterableTable/FilterableTable';
import { PayoutMethods } from '../../globaltypes';
import { useAppSelector } from '../../redux/store';
import { selectUser } from '../../redux/userSlice';
import { CardTableColumns } from '../../utils/tables/TableTypes';
import { insertTableActions } from '../../utils/tables/utils';
import { FlexRowCenterBetween } from '../../utils/theme/FlexConfigs';
import { useDisclosure } from '@chakra-ui/react';
import DeactivateCardModal from '../../components/organism/Modals/DeactivateCardModal';
import { getStripeOnBoardingUrl } from '../../components/organism/OnBoarding/OnBoardingPayoutMethod';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase/firebaseApp';
import { USERSETTINGS_API, USERS_DOMAIN } from '../../hooks/constants';

function Settings() {
  const [userPayoutData, setUserPayoutData] = useState<PayoutMethods[] | []>([])
  const [inactiveCards, setInactiveCards] = useState<PayoutMethods[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<{
    notifications:boolean,
    authcode:boolean,
    sms:boolean,
    tracking:boolean
  }>({
    notifications:false,
    authcode:false,
    sms:false,
    tracking:false
  });

  const user = useAppSelector(selectUser)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
      user && user.user_type === "HOST" && setUserPayoutData(user?.PayoutMethods)
    },[])
    const showDeactivateModal = (id:string) => {
        onOpen()
        const inactive = userPayoutData.filter(payoutMethod => payoutMethod.status !== 'ACTIVE')
        setInactiveCards(inactive)
    }
  const addCard = async() => {
      setLoading(true)
      try {
          const url = await getStripeOnBoardingUrl()
          setLoading(false)
          // redirect to stripe onboarding
          window.location.href = url
        } catch (error) {
            setLoading(false)
            toast({
            title: "Error",
            description: "An error occurred while trying to on board you with stripe",
            status: "error",
            duration: 5000,
            isClosable: true,
        })
    }
  }
  const toggleNotifications = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked({...isChecked, notifications:e.target.checked})
    const checked = e.target.checked
    const idToken = getAuth(app).currentUser?.getIdToken()
    const userSettings = user?.user_settings
    try {
            await axios.patch(USERSETTINGS_API, 
            {
                headers: {
                    "Authorization":`Bearer ${idToken}`
                },
                body: {
                    ...userSettings,
                    notifications_enabled: !userSettings?.notifications_enabled
                }
            }
        );
        checked && toast({
            position: "top",
            title: 'Success',
            description: 'Notifications set on',
            duration: 3000,
            isClosable: true,
            status: "success",
        })
        !checked && toast({
            position: "top",
            title: 'Notifications',
            description: 'Notifications have been set off',
            duration: 3000,
            isClosable: true,
            status: "warning",
        })
    } catch (error) {
        toast({
            position: "top",
            title: "Error",
            description: 'An error occurred',
            duration: 3000,
            isClosable: true,
            status: "error",
        })
    }
}  
const toggleSMS = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked({...isChecked, sms:e.target.checked})
    const checked = e.target.checked
    const idToken = getAuth(app).currentUser?.getIdToken()
    const userSettings = user?.user_settings
    try {
            await axios.patch(USERSETTINGS_API, 
            {
                headers: {
                    "Authorization":`Bearer ${idToken}`
                },
                body: {
                    ...userSettings,
                    sms_enabled: !userSettings?.sms_enabled
                }
            }
        );
        checked && toast({
            position: "top",
            title: 'Success',
            description: 'You can now receive SMS',
            duration: 3000,
            isClosable: true,
            status: "success",
        })
        !checked && toast({
            position: "top",
            title: 'SMS',
            description: 'You shall no longer recieve SMS',
            duration: 3000,
            isClosable: true,
            status: "warning",
        })
    } catch (error) {
        toast({
            position: "top",
            title: "Error",
            description: 'An error occurred',
            duration: 3000,
            isClosable: true,
            status: "error",
        })
    }
}  
const toggleTracking = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked({...isChecked, tracking:e.target.checked})
    const checked = e.target.checked
    const idToken = getAuth(app).currentUser?.getIdToken()
    const userSettings = user?.user_settings
    try {
            await axios.patch(USERSETTINGS_API, 
            {
                headers: {
                    "Authorization":`Bearer ${idToken}`
                },
                body: {
                    ...userSettings,
                    tracking_enabled: !userSettings?.tracking_enabled
                }
            }
        );
        checked && toast({
            position: "top",
            title: 'Success',
            description: 'Tracking has been set on',
            duration: 3000,
            isClosable: true,
            status: "success",
        })
        !checked && toast({
            position: "top",
            title: 'Tracking',
            description: 'Tracking has been set off',
            duration: 3000,
            isClosable: true,
            status: "warning",
        })
    } catch (error) {
        toast({
            position: "top",
            title: "Error",
            description: 'An error has occurred',
            duration: 3000,
            isClosable: true,
            status: "error",
        })
    }
}  
const toggleAuthcode = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked({...isChecked, authcode:e.target.checked})
    const checked = e.target.checked
    const idToken = getAuth(app).currentUser?.getIdToken()
    const userSettings = user?.user_settings
    try {
            await axios.patch(USERSETTINGS_API, 
            {
                headers: {
                    "Authorization":`Bearer ${idToken}`
                },
                body: {
                    ...userSettings,
                    authcode_enabled: !userSettings?.authcode_enabled
                }
            }
        );
        checked && toast({
            position: "top",
            title: 'Success',
            description: 'Authcode request feature has been enabled',
            duration: 3000,
            isClosable: true,
            status: "success",
        })
        !checked && toast({
            position: "top",
            title: 'Authcode',
            description: 'Authcode request feature has been set off',
            duration: 3000,
            isClosable: true,
            status: "warning",
        })
    } catch (error) {
        toast({
            position: "top",
            title: "Error",
            description: 'An error has occured',
            duration: 3000,
            isClosable: true,
            status: "error",
        })
    }
}  
  return (
    <>
        <DeactivateCardModal isOpen={isOpen} onClose={onClose} userCards={userPayoutData} inactiveCards={inactiveCards}/>
        <Grid 
        w="full"
        templateColumns={"1fr"}
        gridTemplateRows={"1fr 40px 1fr"}
        rowGap="28px">
        <GridItem w="full" maxHeight='80' overflowY={'scroll'}>
            <Heading as='h4' size='md' mb={1}>
                Payout methods
            </Heading>
            <FilterableTable
            viewSearchField={false}
                columns={insertTableActions(CardTableColumns, (i, data) => {
                    return (
                    <Flex {...FlexRowCenterBetween}>

                        {data.status === 'ACTIVE' && <Rounded onClick={() => showDeactivateModal(data.id)} variant='outline' setWidth={'140px'} rounded='full'>Deactivate</Rounded>}
                    </Flex>
                    )
                })}
                data={userPayoutData}
                dataFetchFunction={(fetchStatus) => {
                fetchStatus;
                }}
            />  
        </GridItem>
        <Rounded onClick={() => addCard()} variant='solid' setWidth={'200px'} rounded='full'>{loading ? 'Loading...' : 'Add Card'}</Rounded>  
        <GridItem w="full" maxHeight={'80'} overflowY={'scroll'}>
            <Heading as='h4' size='md' mb={1}>
                Other settings
            </Heading>
            <Flex w='full' h={20} justifyContent={'space-between'} alignItems={'center'}  border='1px solid' borderColor={'gray.300'} rounded={"20px"} padding={'10'} mb={4}>
                <Tooltip hasArrow label="When set to on, you will recieve notification alerts regarding authcode requests, tracking information and reservations made." bgColor={"#E63B2E"} color={'white'}>
                    <Heading as='h6' size='xs'>
                        Notifications
                    </Heading>
                </Tooltip>
                <Switch colorScheme='red' size='lg' onChange={toggleNotifications} isChecked={isChecked.notifications}/>
            </Flex>
            <Flex w='full' h={20} justifyContent={'space-between'} alignItems={'center'}  border='1px solid' borderColor={'gray.300'} rounded={"20px"} padding={'10'} mb={4}>
                <Tooltip hasArrow label="When set to on, you will recieve SMS regarding authcode requests and reservations made." bgColor={"#E63B2E"} color={'white'}>
                    <Heading as='h6' size='xs'>
                        SMS
                    </Heading>
                </Tooltip>
                <Switch colorScheme='red' size='lg'  onChange={toggleSMS}  isChecked={isChecked.sms}/>
            </Flex>
            <Flex w='full' h={20} justifyContent={'space-between'} alignItems={'center'}  border='1px solid' borderColor={'gray.300'} rounded={"20px"} padding={'10'} mb={4}>
                <Tooltip hasArrow label="When set to on, you will allow tracking of your vehicle for security measures" bgColor={"#E63B2E"} color={'white'}>
                    <Heading as='h6' size='xs'>
                        Tracking
                    </Heading>
                </Tooltip>
                <Switch colorScheme='red' size='lg'  onChange={toggleTracking}  isChecked={isChecked.tracking}/>
            </Flex>
            <Flex w='full' h={20} justifyContent={'space-between'} alignItems={'center'}  border='1px solid' borderColor={'gray.300'} rounded={"20px"} padding={'10'}>
                <Tooltip hasArrow label="When set to on, your customers will be required to ask for an authcode from you before making a reservation." bgColor={"#E63B2E"} color={'white'}>
                    <Heading as='h6' size='xs'>
                        Authcode
                    </Heading>
                </Tooltip>
                <Switch colorScheme='red' size='lg'  onChange={toggleAuthcode} isChecked={isChecked.authcode}/>
            </Flex>
        </GridItem>
        </Grid>
    </>
  )
}

export default Settings

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}