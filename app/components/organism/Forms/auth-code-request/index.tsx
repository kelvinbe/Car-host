import { Avatar, Flex, Text, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { FlexColCenterCenter, FlexColCenterStart, FlexColStartBetween, FlexColStartStart, FlexRowCenterBetween, FlexRowStartBetween } from '../../../../utils/theme/FlexConfigs'
import Image from 'next/image'
import { IAuthCode, IUserProfile, IVehicle } from '../../../../globaltypes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { activateAuthCode, selectUpdateAuthCodeFeedback, updateAuthCode } from '../../../../redux/authcodeSlice'
import LogRocket from 'logrocket'

dayjs.extend(relativeTime)

interface Props {
  data: Partial<IAuthCode> & {
    vehicle?: Partial<IVehicle>
    user?: Partial<IUserProfile>
  }
}

function AuthCodeRequestForm(props: Props) {
  const { data } = props
  const updateFeedback = useAppSelector(selectUpdateAuthCodeFeedback)
  const activateFeedback = useAppSelector(selectUpdateAuthCodeFeedback)
  const toast = useToast({
    position: 'top'
  })
  const dispatch = useAppDispatch()

  const handle_activate = () => {
      return dispatch(activateAuthCode(data?.id ?? ""))
      .unwrap()
      .then(()=>{
        toast({
          title: "Success",
          description: "Auth code activated.",
          status: "success",
        })
      })
      .catch((e: unknown)=>{
        toast({
          title: "Error",
          description: "Something went wrong while activating auth code.",
          status: "error",
        })
        LogRocket.error(e)
      })
  }


  const handle_revoke = () => {
    return dispatch(updateAuthCode({
      id: data?.id ?? "",
      status: "REVOKED"
    })).then(()=>{
      toast({
        title: "Success",
        description: "Auth code revoked.",
        status: "success",
      })
    }).catch((e)=>{
      toast({
        title: "Error",
        description: "Something went wrong while revoking auth code.",
        status: "error",
      })
      LogRocket.error(e)
    })
  }

  return (
    <Flex {...FlexRowStartBetween} w="full" rounded="md"   px="20px" py="10px" >
        <Flex {...FlexColStartStart}  w={"33%"} className='gap-y-2 gap-x-2' >
          <div className="flex flex-col items-center w-full h-[200px] overflow-hidden relative rounded-md ring-1 ring-red-500 ">
            <Image
              src={data?.vehicle?.pictures?.[0] ?? ""}
              alt={data?.vehicle?.make ?? ""}
              fill 
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-1 gap-y-1 w-full">
            <div className="flex flex-row items-center justify-start">
              <span className='font-semibold text-lg' >
                Make
              </span>
            </div>
            <div className="flex flex-row items-center justify-start">
              <span className='text-gray-600 text-lg' >
                {
                  data?.vehicle?.make ?? ""
                }
              </span>
            </div>
            <div className="flex flex-row items-center justify-start">
              <span className='font-semibold text-lg' >
                Model
              </span>
            </div>
            <div className="flex flex-row items-center justify-start">
              <span className='text-gray-600 text-lg' >
                {
                  data?.vehicle?.model ?? ""
                }
              </span>
            </div>
            <div className="flex flex-row items-center justify-start">
              <span className='font-semibold text-lg' >
                Plate
              </span>
            </div>
            <div className="flex flex-row items-center justify-start">
              <span className='text-gray-600 text-lg' >
                {
                  data?.vehicle?.plate ?? ""
                }
              </span>
            </div>
          </div>
        </Flex> 
        <Flex  w={"66%"} className='gap-y-2 h-full flex-col' >
            <Flex {...FlexRowStartBetween}  w="full"  rounded="md" bg="gray.50" px="5px" py="3px" >
              <Avatar
                size="md" 
                name={`${data?.user?.fname ?? ""} ${data?.user?.lname ?? ""}`}
                src={data?.user?.profile_pic_url ?? ""}
              />
              <Flex flexDir="column" w="30%"  px="10px" >
                <Text fontWeight={"semibold"} >
                  {
                    data?.user?.fname ?? ""
                  }
                  {
                    data?.user?.lname ?? ""
                  }
                </Text>
                <Text fontSize={"sm"} >
                  {
                    dayjs(data?.created_at).fromNow()
                  }
                </Text>
              </Flex>
            </Flex>
            <Text fontSize={"md"}  className='px-5' >
              The user has requested for an authorization code to create a reservation for the vehicle.
            </Text>
            <Flex {...FlexRowCenterBetween} className='flex-grow' >
              <Button 
              isLoading={activateFeedback?.loading}
              onClick={handle_activate}
              colorScheme='green' disabled={["ACTIVE", "REVOKED"]?.includes(data?.status ?? "")} >
                Generate
              </Button>
              <Button 
              isLoading={updateFeedback?.loading}
              onClick={handle_revoke}
              colorScheme='red' disabled={["REVOKED", "ACTIVE"].includes(data?.status ?? "")} >
                Deny
              </Button>
            </Flex>
        </Flex> 
    </Flex>
  )
}

export default AuthCodeRequestForm