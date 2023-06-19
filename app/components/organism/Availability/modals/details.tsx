import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FlexColStartStart, FlexRowCenterBetween, FlexRowStartBetween } from '../../../../utils/theme/FlexConfigs'
import Image from 'next/image'
import dayjs from 'dayjs'
import { IUserProfile, IVehicle } from '../../../../globaltypes'

interface Props extends Partial<IVehicle & {
    start_date_time: string,
    end_date_time: string,
    user: Partial<IUserProfile>
    onClose: () => void
}> {}

function CalendarDetails(props: Props) {
    const {start_date_time, end_date_time, user, onClose, ...vehicle} = props
  return (
    <Flex {...FlexRowStartBetween} w="full" rounded="md"   px="20px" py="10px" >
        <Flex {...FlexColStartStart}  w={"33%"} className='gap-y-2 gap-x-2' >
          <div className="flex flex-col items-center w-full h-[200px] overflow-hidden relative rounded-md ring-1 ring-red-500 ">
            <Image
              src={vehicle?.pictures?.[0] ?? ""}
              alt={vehicle?.make ?? ""}
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
                  vehicle?.make ?? ""
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
                  vehicle?.model ?? ""
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
                  vehicle?.plate ?? ""
                }
              </span>
            </div>
          </div>
        </Flex> 
        <Flex  w={"66%"} className='flex gap-y-2 h-full justify-between flex-col' >
        <Flex {...FlexRowStartBetween}  w="full"  rounded="md" bg="gray.50" px="5px" py="3px" >
              <Avatar
                size="md" 
                name={`${user?.fname ?? ""} ${user?.lname ?? ""}`}
                src={user?.profile_pic_url ?? ""}
              />
              <Flex flexDir="column" w="30%"  px="10px" >
                <Text fontWeight={"semibold"} >
                  {
                    user?.fname ?? ""
                  }
                  {
                    user?.lname ?? ""
                  }
                </Text>
                <Text fontSize={"sm"} >
                  
                </Text>
              </Flex>
            </Flex>
            <Text fontSize={"md"}  className='px-5' >
              Pickup : {dayjs(start_date_time).format("DD/MM/YYYY HH:mm")} <br></br>
              Dropoff : {dayjs(end_date_time).format("DD/MM/YYYY HH:mm")} <br></br>
            </Text>
            <Flex {...FlexRowCenterBetween} className='flex-grow' >
                <Button colorScheme='red' variant={'outline'} onClick={onClose} >
                    Close
                </Button>
            </Flex>
        </Flex> 
    </Flex>
  )
}

export default CalendarDetails