import React, { useEffect, useState } from 'react'
import UploadImage from '../../../molecules/UploadImage/UploadImage'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import ApiVehicleDetails from '../ApiVehicleDetails'
import { tVehicleSchema, vehicle_data, vehicle_form_errors } from './vehicle.schemas'
import { Input, Select, Text, Button, useToast } from '@chakra-ui/react'
import { isArray, isEmpty } from 'lodash'
import { useGetStationsQuery } from '../../../../redux/stationSlice'
import { addVehicle, selectAddVehicleFeedback } from '../../../../redux/vehiclesSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'

interface Props {
    onClose: () => void
}

function Create(props: Props) { 
  const { onClose } = props
  const toast = useToast({
      position: "top"
  })
  const  { data: stations, isLoading } = useGetStationsQuery(null)
  const dispatch = useAppDispatch()
  const feedback = useAppSelector(selectAddVehicleFeedback)
  const [{ data , errors }, setInputState] = useState<{
    data: Partial<vehicle_data> | null,
    errors: Partial<vehicle_form_errors> | null
  }>({
    data: {
        make: "", // initially undefined on purpose
        model: "",
        year: new Date().getFullYear(),
        color: undefined,
        seats: undefined,
        transmission: undefined,
        station_id: undefined,
        hourly_rate: undefined,
        plate: undefined,
        pictures: []
    },
    errors: null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof vehicle_data) => {
    setInputState((prev)=>{
        return {
            ...prev,
            data:{
                ...prev.data,
                [field]: ["seats", "hourly_rate"]?.includes(field) ? Number(e?.target?.value ?? 0) : (e.target.value ?? "")
            }
        }
    })

    const parsed = tVehicleSchema.safeParse(data)
    if(!parsed.success){
        setInputState((prev)=>{
            return {
                ...prev,
                errors:{
                    ...prev.errors,
                    [field]:parsed.error
                }
            }
        })
    }

    setInputState((prev)=>{
        return {
            ...prev,
            errors:{
                ...prev.errors,
                fieldErrors: {
                    ...prev.errors?.fieldErrors,
                    [field]: undefined
                }
            }
        }
    })
    return
  }


  const handleSelectVehicleDetails = (make: string, model: string, year: string) => {
    setInputState((prev)=>{
        return {
            ...prev,
            data:{
                ...prev.data,
                make,
                model,
                year: Number(year)
            }
        }
    })
    return
  }


  const handleImages = (images: string[]) => {
        setInputState((prev)=>{
            return {
                ...prev,
                data: {
                    ...prev.data,
                    pictures: images
                }
            }
        })
        return 
  }

  const handleCreateVehicle = async () => {
    try {
        const parsed = tVehicleSchema.required({
            color: true,
            hourly_rate: true,
            make: true,
            model: true,
            pictures: true,
            plate: true,
            seats: true,
            station_id: true,
            transmission: true,
            year: true
        }).safeParse(data)
        if(!parsed.success){
            console.log("Create errors::", parsed.error)
            setInputState((prev)=>{
                return {
                    ...prev,
                    errors: parsed?.error?.formErrors
                }
            })
            toast({
                title: "Vehicle creation failed",
                description: "Fill in all required fields, correctly",
                colorScheme: "red"
            })
            return
        }
        const vehicle = parsed.data
        await dispatch(addVehicle({
            ...vehicle,
            hourly_rate: Number(vehicle.hourly_rate),
        }))
        onClose()
    } 
    catch(e)
    {
        toast({
            title: "Vehicle creation failed",
            description: "Something went wrong",
            variant: "error",
            colorScheme: "red"
        })
    }
  }


  return (
    <div className="grid grid-cols-3 h-full w-full rounded-md items-center justify-center">
        <div className="grid col-span-1 h-full bg-slate-50 p-2">
            <UploadImage
                multiple
                onChange={(images)=>{
                    if(isArray(images)){
                        handleImages(images)
                    }
                }}
            />
        </div>
        <div className="flex flex-col items-center justify-between col-span-2 h-full p-2">
            <div className="flex flex-col w-full px-2 space-y-5 mb-5 ">
                <div className="flex w-full ">
                    <ApiVehicleDetails
                        updateFormFields={handleSelectVehicleDetails}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full h-full items-start justify-start">
                    <FormControl
                        className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.make)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Make</Text>
                        </FormLabel>
                        <Input
                            placeholder="Make"
                            value={data?.make}
                            onChange={(e)=>handleChange(e, "make")}
                        />
                        <FormHelperText>
                            <Text sx={{}} >What make is your vehicle?</Text>
                        </FormHelperText>
                    </FormControl>
                    <FormControl 
                        className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.model)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Model</Text>
                        </FormLabel>
                        <Input
                            placeholder="Model"
                            value={data?.model}
                            onChange={(e)=>handleChange(e, "model")}
                        />
                        <FormHelperText>
                            <Text sx={{}} >What model is your vehicle?</Text>
                        </FormHelperText>

                    </FormControl>
                    <FormControl className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.year)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Year</Text>
                        </FormLabel>
                        <Input
                            placeholder="Year"
                            value={data?.year}
                            onChange={(e)=>handleChange(e, "year")}

                        />
                        <FormHelperText>
                            <Text sx={{}} >What year was your vehicle manufactured?</Text>
                        </FormHelperText>
                    </FormControl>
                    <FormControl className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.color)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Color</Text>
                        </FormLabel>
                        <Input
                            value={data?.color} 
                            onChange={(e)=>handleChange(e, "color")}
                            placeholder="red"
                        />
                        <FormHelperText>
                            <Text sx={{}} >What color is your vehicle?</Text>
                        </FormHelperText>
                    </FormControl>
                    <FormControl className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.seats)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Seats</Text>
                        </FormLabel>
                        <Input
                            value={data?.seats}
                            onChange={(e)=>handleChange(e, "seats")}
                            placeholder="4"
                        />
                        <FormHelperText>
                            <Text sx={{}} >How many seats does your vehicle have?</Text>
                        </FormHelperText>
                    </FormControl>
                    <FormControl className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.transmission)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Transmission</Text>
                        </FormLabel>
                        <Input
                            value={data?.transmission}
                            onChange={(e)=>handleChange(e, "transmission")}
                            placeholder="Manual/Automatic etc"
                        />
                        <FormHelperText>
                            <Text sx={{}} >What type of transmission does your vehicle have?</Text>
                        </FormHelperText>
                    </FormControl>
                    <FormControl className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.station_id)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Station</Text>
                        </FormLabel>
                        <Select
                            value={data?.station_id}
                            onChange={(e)=>handleChange(e, "station_id")}
                            placeholder="Select a station"

                        >
                            {
                                stations?.map((station, i)=>{
                                    return (
                                        <option key={i} value={station?.id} >
                                            {
                                                station?.name
                                            }
                                        </option>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.hourly_rate)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }}>
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Hourly rate</Text>
                        </FormLabel>
                        <Input
                            value={data?.hourly_rate}
                            onChange={(e)=>handleChange(e, "hourly_rate")}
                            placeholder="Hourly rate"
                            type='number'
                        />
                        <FormHelperText>
                            <Text sx={{}} >What is your hourly rate? (in your local currency)</Text>
                        </FormHelperText>
                    </FormControl>
                    <FormControl className="h-fit"
                        isInvalid={!isEmpty(errors?.fieldErrors?.plate)}
                        isRequired
                    >
                        <FormLabel sx={{
                            margin: 0,
                            padding: 0,
                            display: "flex",
                        }} >
                            <Text sx={{
                                fontWeight: "semibold"
                            }} >Plate</Text>
                        </FormLabel>
                        <Input
                            value={data?.plate}
                            onChange={(e)=>handleChange(e, "plate")}
                            placeholder="Plate"
                        />
                        <FormHelperText>
                            <Text sx={{}} >
                                What&apos;s the license plate of your vehicle?
                            </Text>
                        </FormHelperText>
                    </FormControl>
                </div>
            </div>
            <div className="flex flex-row items-center w-full">
                <Button 
                    colorScheme="red"
                    isLoading={feedback?.loading}
                    onClick={handleCreateVehicle}
                >    
                    Create Vehicle
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Create