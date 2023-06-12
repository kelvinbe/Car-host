/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useReducer, useEffect } from "react";
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
    FormLabel,
    Box
  } from "@chakra-ui/react";
  import { IVehicle } from "../../../globaltypes";
  import useVehicles from "../../../hooks/useVehicles";
  import Rounded from "../../molecules/Buttons/General/Rounded";
  import { FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchVehicle, selectFetchVehicleFeedback } from "../../../redux/vehiclesSlice";
import { isArraySame } from "../../../utils/utils";
import { isEmpty, isNull } from "lodash";
import LoadingComponent from "../../molecules/feedback/LoadingComponent";
import UploadImage from "../../molecules/UploadImage/UploadImage";


  interface Props{
    isOpen:boolean,
    onClose:() => void,
    vehicle_id?: string,
    vehicles?:Partial<IVehicle>[]
}

const reducer = (state:Partial<IVehicle> | null, action:{type:string, key?:string, value:null|string|number|string[]|object}) => {
    switch (action.type) {
        case "update_vehicle":
            return {
                ...state,
                [action.key??'vehicle-prop']:action.value
            }
        case "init": {
            return isNull(action.value) ? null : {
                ...(action.value as object ?? null)
            }
        }
        default:
            return state;
    }
}
  
  export default function EditVehicleModal(props:Props) { 
      const reduxDispatch = useAppDispatch()
      const { data: selectedVehicle, loading } = useAppSelector(selectFetchVehicleFeedback)
      const [state, dispatch] = useReducer(reducer, selectedVehicle)
      const { isOpen, onClose, vehicle_id } = props
      const {updateVehicle} = useVehicles(vehicle_id)
      const [vehicleImages, setVehicleImages] = useState<string[]>([])

    


      useEffect(() => {
        dispatch({
            type: 'init',
            value: null
        })
        reduxDispatch(fetchVehicle({
            vehicle_id
        })).unwrap().then((data)=>{
            dispatch({
                type: 'init',
                value: data
            })
        })
      }, [vehicle_id])


    const [isPlateError, setIsPlateError] = useState(false)
    const [isMakeError, setIsMakeError] = useState(false)
    const [isModelError, setIsModelError] = useState(false)
    const [isYearError, setIsYearError] = useState(false)
    const [isRateError, setIsRateError] = useState(false)
    
    const handleEdit = () => {
        state?.plate === '' && setIsPlateError(true)
        state?.make === '' && setIsMakeError(true)
        state?.model === '' && setIsModelError(true) 
        !state?.year && setIsYearError(true)
        !state?.hourly_rate && setIsRateError(true)

        if (state?.plate === '' || state?.pictures?.length === 0 || state?.make === "" || state?.model === "" || !state?.year || !state?.hourly_rate) {
            return;
        }else{
            updateVehicle({
                plate: selectedVehicle?.plate === state.plate ? undefined : state.plate,
                make: selectedVehicle?.make === state.make ? undefined : state.make,
                model: selectedVehicle?.model === state.model ? undefined : state.model,
                year: selectedVehicle?.year === state.year ? undefined : state.year,
                transmission: selectedVehicle?.transmission === state.transmission ? undefined : state.transmission,
                hourly_rate: selectedVehicle?.hourly_rate === state.hourly_rate ? undefined : Number(state.hourly_rate ?? 0),
                status: selectedVehicle?.status === state.status ? undefined : state.status,
                pictures: isArraySame(selectedVehicle?.pictures, vehicleImages) ? undefined : vehicleImages,
            })
            onClose()
        }
    }

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='6xl' isCentered motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent data-cy={'edit-vehicle-modal'} data-testid="edit-vehicle-modal">
                    <ModalHeader textAlign={'center'}>Edit Vehicle</ModalHeader>
                    <ModalCloseButton data-cy={'close-modal-button'} data-testid="close-modal-button"/>
                    <ModalBody>
                        {
                    loading ? <LoadingComponent/> : (
                        <Flex >
                            <Box w={1 / 3}>
                                    <UploadImage
                                        multiple
                                        onChange={(images) => setVehicleImages(images as string[])}
                                    />
                                </Box>
                            <Flex w={2 / 3} flexWrap='wrap' flexDirection={"row"} justifyContent={'space-between'} h='100%'>
                                <FormControl w={350} isRequired marginBottom={5} isInvalid={isPlateError}>
                                    <FormLabel htmlFor="plate">Plate</FormLabel>
                                    <Input type='text' id='plate' placeholder='ABC-123' w={240} value={state?.plate} onChange={e =>
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
                                    <Input type='text' id='make' placeholder='Toyota' w={240} value={state?.make} onChange={e => 
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
                                    <Input type='text' id='model' placeholder='Camry' w={240} value={state?.model} onChange={e =>       dispatch({
                                            type:'update_vehicle',
                                            value:e.target.value,
                                            key:"model"
                                        })}
                                    />
                                    <FormErrorMessage>Vehicle model is required</FormErrorMessage>
                                </FormControl>
                                <FormControl w={240} isRequired isInvalid={isYearError} marginBottom={5}>
                                    <FormLabel htmlFor="year">Year</FormLabel>
                                    <Input type='number' id='year' placeholder='2018' max={4} w={240} value={state?.year} onChange={e => dispatch({
                                        type:'update_vehicle',
                                        value:e.target.value,
                                        key:"year"
                                    })}/>
                                    <FormErrorMessage>Vehicle year of make is required</FormErrorMessage>
                                </FormControl>
                                <FormControl w={240} marginBottom={5} isRequired>
                                    <FormLabel htmlFor="transmission">Transmission</FormLabel>
                                    <Select w={240} value={state?.transmission} onChange={e => dispatch({
                                        type:'update_vehicle',
                                        value:e.target.value,
                                        key:"transmission"
                                    })}>
                                        <option value='Manual'>Manual</option>
                                        <option value='auto'>Automatic</option>
                                        <option value='cvt'>CVT</option>
                                        <option value="semi-auto">Semi Automatic</option>
                                        <option value="dual-clutch">Dual Clutch</option>
                                        <option value="tiptronic">Tiptronic</option>
                                        <option value="auto-manual">Auto Manual</option>
                                        <option value="auto-clutch">Auto Clutch</option>
                                        <option value="electric">Electric</option>
                                    </Select>
                                </FormControl>
                                <FormControl w={240} marginBottom={5} isRequired>
                                    <FormLabel htmlFor="status">Status</FormLabel>
                                    <Select w={240} value={state?.status} onChange={e => dispatch({
                                        type:'update_vehicle',
                                        value:e.target.value,
                                        key:"status"
                                    })}>
                                        <option value='ACTIVE'>Active</option>
                                        <option value='available'>Available</option>
                                        <option value='unavailable'>Unavailable</option>
                                    </Select>
                                </FormControl>
                                <FormControl w={240} marginBottom={5} isRequired isInvalid={isRateError}>
                                    <FormLabel htmlFor="rate">Rate</FormLabel>
                                    <Input type='number' id='rate' placeholder='$' w={240} value={state?.hourly_rate} onChange={e => dispatch({
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
                    )
                }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
    
  }