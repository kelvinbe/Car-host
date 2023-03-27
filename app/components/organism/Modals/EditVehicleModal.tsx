import { useState, useReducer } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    Input,
    Select, 
    FormControl,
    FormErrorMessage,
    FormLabel
  } from "@chakra-ui/react";
  import useVehicleFilter from "../../../hooks/useVehicleFilter"
  import { IVehicleDetails } from "../../../globaltypes";
  import useVehicles from "../../../hooks/useVehicles";
  import Rounded from "../../molecules/Buttons/General/Rounded";
  import { FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";

  interface Props{
    isOpen:boolean,
    onClose:() => void,
    vehicleId:number,
    vehicles:IVehicleDetails[]
}
  
  export default function EditVehicleModal(props:Props) { 
    const {isOpen, onClose, vehicleId, vehicles} = props
    const selectedVehicle = useVehicleFilter(vehicleId, vehicles)
    const {updateVehicle} = useVehicles(vehicleId)
    const [isPlateError, setIsPlateError] = useState(false)
    const [isMakeError, setIsMakeError] = useState(false)
    const [isModelError, setIsModelError] = useState(false)
    const [isYearError, setIsYearError] = useState(false)
    const [isRateError, setIsRateError] = useState(false)

    const initialstate:IVehicleDetails= {
        plate:selectedVehicle?.['plate'] as string,
        make:selectedVehicle?.['make'] as string,
        model:selectedVehicle?.['model'] as string,
        year:selectedVehicle?.['year'] as number,
        transmission:selectedVehicle?.['transmission'] as "Automatic" | "Semi-Automatic" | "Manual" | "CVT",
        hourly_rate:selectedVehicle?.['hourly_rate'] as number,
        status:selectedVehicle?.['status'] as "active" | "unavailable" | "available",
        vehicle_pictures: selectedVehicle?.['vehicle_pictures']
    }
    const reducer = (state:IVehicleDetails, action:{type:string, key:string, value:null|string|number|string[]}) => {
        switch (action.type) {
            case "update_vehicle":
                return {
                    ...state,
                    [action.key]:action.value
                }
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialstate)
    const handleEdit = () => {
        state.plate === '' && setIsPlateError(true)
        state.make === '' && setIsMakeError(true)
        state.model === '' && setIsModelError(true)
        !state.year && setIsYearError(true)
        !state.hourly_rate && setIsRateError(true)

        if(state.plate === '' || state.vehicle_pictures?.length === 0 || state.make === "" || state.model === "" || !state.year || !state.hourly_rate ){
            return;
        }else{
            updateVehicle({
                plate:state.plate,
                make:state.make,
                model:state.model,
                year:state.year,
                transmission:state.transmission,
                hourly_rate:state.hourly_rate,
                status:state.status,
                vehicle_pictures:state.vehicle_pictures
            })
            onClose()
        }
    }
    if(!selectedVehicle) return null
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' isCentered motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={'center'}>Edit vehicle details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex >
                    <Flex w={'100%'} flexWrap='wrap' flexDirection={"row"} justifyContent={'space-between'} h='100%'>
                        <FormControl w={350} isRequired marginBottom={5} isInvalid={isPlateError}>
                            <FormLabel htmlFor="plate">Plate</FormLabel>
                            <Input type='text' id='plate' placeholder='ABC-123' w={240} value={state.plate} onChange={e =>
                                dispatch({
                                type:'update_vehicle',
                                value:e.target.value,
                                key:"plate"
                            })}
                            />
                            <FormErrorMessage>Vehicle plate is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={240} isRequired isInvalid={isMakeError} flexDirection={'column'} marginBottom={5}>
                            <FormLabel htmlFor="make">Make</FormLabel>
                            <Input type='text' id='make' placeholder='Toyota' w={240} value={state.make} onChange={e => 
                                dispatch({
                                    type:'update_vehicle',
                                    value:e.target.value,
                                    key:"make"
                                })}
                            />
                            <FormErrorMessage>Vehicle make is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={240} isRequired isInvalid={isModelError} marginBottom={5}>
                            <FormLabel htmlFor="model">Model</FormLabel>
                            <Input type='text' id='model' placeholder='Camry' w={240} value={state.model} onChange={e =>       dispatch({
                                    type:'update_vehicle',
                                    value:e.target.value,
                                    key:"model"
                                })}
                            />
                            <FormErrorMessage>Vehicle model is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={240} isRequired isInvalid={isYearError} marginBottom={5}>
                            <FormLabel htmlFor="year">Year</FormLabel>
                            <Input type='number' id='year' placeholder='2018' max={4} w={240} value={state.year} onChange={e => dispatch({
                                type:'update_vehicle',
                                value:e.target.value,
                                key:"year"
                            })}/>
                            <FormErrorMessage>Vehicle year of make is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={240} marginBottom={5} isRequired>
                            <FormLabel htmlFor="transmission">Transmission</FormLabel>
                            <Select w={240} value={state.transmission} onChange={e => dispatch({
                                type:'update_vehicle',
                                value:e.target.value,
                                key:"transmission"
                            })}>
                                <option value='Manual'>Manual</option>
                                <option value='auto'>Automatic</option>
                                <option value='cvt'>CVT</option>
                                <option value="semi-auto">Semi Automatic</option>
                            </Select>
                        </FormControl>
                        <FormControl w={240} marginBottom={5} isRequired>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <Select w={240} value={state.status} onChange={e => dispatch({
                                type:'update_vehicle',
                                value:e.target.value,
                                key:"status"
                            })}>
                                <option value='active'>Active</option>
                                <option value='available'>Available</option>
                                <option value='unavailable'>Unavailable</option>
                            </Select>
                        </FormControl>
                        <FormControl w={240} marginBottom={5} isRequired isInvalid={isRateError}>
                            <FormLabel htmlFor="rate">Rate</FormLabel>
                            <Input type='number' id='rate' placeholder='$' w={240} value={state.hourly_rate} onChange={e => dispatch({
                                type:'update_vehicle',
                                value:e.target.value,
                                key:"hourly_rate"
                            })}/>
                            <FormErrorMessage>Vehicle hourly rate is required</FormErrorMessage>
                        </FormControl>
                        <Flex w='100%' {...FlexRowCenterCenter} marginBottom={5}>
                            <Rounded variant='outline' setWidth={350} rounded='full' onClick={handleEdit}>Edit</Rounded>
                        </Flex>
                    </Flex>
                </Flex>
                
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
    
  }