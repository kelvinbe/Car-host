import { Avatar, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { FlexColStartStart, FlexRowCenterBetween, FlexRowStartBetween } from '../../../../utils/theme/FlexConfigs'
import Image from 'next/image'
import dayjs from 'dayjs'
import { IVehicle } from '../../../../globaltypes'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { blockCalendarSlot, selectCalendarFeedback } from '../../../../redux/calendarSlice'

interface Props extends Partial<IVehicle & {
    start_date_time: string,
    end_date_time: string,
    onClose: () => void
}>{}

function CalendarBlock(props: Props) {
    const toast = useToast({
        position: 'top'
    })
    const dispatch = useAppDispatch()
    const feedback = useAppSelector(selectCalendarFeedback)
    const {start_date_time, end_date_time, onClose, ...vehicle} = props

    const handleBlock = () => {
        dispatch(blockCalendarSlot({
            start_date_time,
            end_date_time,
            vehicle_id: vehicle.id,
        })).unwrap().then(()=>{
            toast({
                title: "Success",
                description: "Slot blocked successfully",
                status: "success",
                colorScheme: 'green'
            })
            onClose?.()
        }).catch(()=>{
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                colorScheme: 'red'
            })
        })
    }

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
        <Flex  w={"66%"} className='gap-y-2 flex h-full px-5 justify-between flex-col' >
            <Text fontSize={"md"}   >
              You are about to block this vehicle&apos;s time slot from <strong>{dayjs(start_date_time).format('DD/MM/YYYY HH:mm')} </strong> to <strong>{dayjs(end_date_time).format('DD/MM/YYYY HH:mm')}</strong>
              <br></br>
              It won&apos;t be available for booking during this time. and won&apos;t be visible on the app.
            </Text>
            <Flex {...FlexRowCenterBetween} >
              <Button colorScheme="red" isLoading={feedback?.calendarUpdate} onClick={handleBlock} >
                Block
              </Button>
              <Button colorScheme='red' variant={'outline'} onClick={onClose} >
                Back
              </Button>
            </Flex>
        </Flex> 
    </Flex>
  )
}

export default CalendarBlock