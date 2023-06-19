import React from 'react'
import { IStation, IVehicle } from '../../../../globaltypes'
import Image from 'next/image'
import { Icon, Text } from '@chakra-ui/react'
import { ImLocation } from 'react-icons/im'

interface Props extends Partial<IVehicle & {
    station?: Partial<IStation>
}> {
}

function View(props: Props) {
  return (
    <div className="w-full flex flex-col items-center space-y-5 justify-start px-5 py-5">
        <div className="w-full grid grid-cols-4 items-center gap-x-5 gap-y-4">
            {
                props?.pictures?.map((picture, index)=>{
                    return (
                        <div key={index} className='relative flex flex-col w-[150px] h-[150px] items-center justify-center rounded-md overflow-hidden' >
                            <Image
                                src={picture} 
                                alt="Vehicle"
                                fill 
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    )
                })
            }
        </div>
        <div className="grid grid-cols-2 grid-rows-5 gap-x-5 gap-y-1 w-full">
            <div className="flex flex-row items-center justify-start col-span-2 space-x-5">
                <Icon
                    as={ImLocation}
                    sx={{
                        fontSize: '1.5rem',
                        w: 5,
                        h: 5,
                        color:"primary.1000"
                    }}
                />
                <Text
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                    }}
                >
                    {
                        props?.station?.name
                    }
                </Text>
            </div>
            <Text variant={"label"} >
                Make
            </Text>
            <Text>
                {
                    props?.make
                }
            </Text>
            <Text variant={"label"}>
                Model
            </Text>
            <Text>
                {
                    props?.model
                }
            </Text>
            <Text variant={"label"}>
                Year
            </Text>
            <Text>
                {
                    props?.year
                }
            </Text>
            <Text variant={"label"}>
                Color
            </Text>
            <Text>
                {
                    props?.color
                }
            </Text>
            <Text variant={"label"}>
                License Plate
            </Text>
            <Text>
                {
                    props?.plate
                }
            </Text>
            <Text variant={"label"}>
                Seats
            </Text>
            <Text>
                {
                    props?.seats
                }
            </Text>
            <Text variant={"label"}>
                Color
            </Text>
            <Text>
                {
                    props?.color
                }
            </Text>
            <Text variant={"label"}>
                Transmission
            </Text>
            <Text>
                {
                    props?.transmission
                }
            </Text>
            <Text variant={"label"}>
                Hourly Rate
            </Text>
            <Text>
                {
                    props?.hourly_rate
                }
            </Text>
        </div>
    </div>
  )
}

export default View