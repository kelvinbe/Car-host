import React from 'react'
import { IVehicle } from '../../../globaltypes'
import Image from 'next/image'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import Rounded from '../Buttons/General/Rounded'

interface IProps {
    vehicles?: Partial<IVehicle>[],
    loading?: boolean
}

function VehiclePreview(props: IProps) {
  return (
    <div className="grid grid-cols-2 p-2 grid-rows-2 w-full gap-x-2 gap-y-2">
        {  props?.loading ? [...Array(4).fill(0)]?.map((_, i)=>{
            return (
                <div key={i} className="flex flex-row items-center h-[200px] w-full justify-center relative rounded-xl overflow-hidden cursor-pointer bg-slate-200 animate-pulse " role="button" >

                </div>
            )
        }) : (
            <>
                {
                    props?.vehicles?.slice(0, 4)?.map((vehicle, i)=>{
                    return (
                        <div key={i} className="flex flex-row items-center h-[200px] w-full justify-center relative rounded-xl overflow-hidden cursor-pointer " role="button" >
                            <Image
                                src={vehicle?.pictures?.[0] ?? ""} 
                                alt="vehicle image"
                                fill 
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                            <div className="flex flex-row items-center justify-center w-full h-full absolute top-0 left-0 bg-gradient-to-t group cursor-pointer from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.3)] opacity-0 hover:opacity-100">
                            <Link legacyBehavior href={`/vehicle-management?id=${vehicle?.id}`}>
                                <Rounded variant="solid" rounded="full">
                                    <Text
                                    cursor="pointer"
                                    data-cy={"redirect-vehicle-mgmt"}
                                    >
                                    Manage
                                    </Text>
                                </Rounded>
                            </Link>
                            </div>
                        </div>
                    )
                })
            }
            </>
        )
        }
    </div>
  )
}

export default VehiclePreview