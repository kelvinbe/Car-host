import ModalTemplate from "./ModalTemplate";
import { Flex, FormControl, FormLabel, Input, FormErrorMessage, Select } from "@chakra-ui/react";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { FlexColCenterBetween, FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";
import { useEffect, useReducer } from "react";
import { selectVehicles } from "../../../redux/vehiclesSlice";
import { useAppSelector } from "../../../redux/store";
import useVehicles from "../../../hooks/useVehicles";
import { isUndefined } from "lodash";
import useAddNewData from "../../../hooks/useAddNewData";
import { LOCATIONS_DOMAIN } from "../../../hooks/constants";

type IReducerState = {
    vehicle:string,
    address:string,
    market_name:string,
    isaddressError:boolean,
    ismarket_nameError:boolean,
    isVehicleError:string,
    isError:string
}

const initialState = {
    vehicle:"",
    address:"",
    market_name:"",
    isaddressError:true,
    ismarket_nameError:true,
    isVehicleError:"",
    isError:""
}
const checkErrorOnChange = (key:string, value:string) => {
    if(isUndefined(value)) return false
    switch (key) {
        case 'address':
            if(value.length < 4)return false
            return true
        case 'market_name':
            if(value.length < 3)return false
            return true        
        default:
            return false
    }
}
const reducer = (state:IReducerState, action:{type:string, value:string, key:string}) => {
    switch (action.type) {
        case 'create_values':
            return {
                ...state,
                [action.key]:action.value,
                [`is${action.key}Error`]:checkErrorOnChange(action.key, action.value)
            }
        case 'error_state':
            return {
                ...state,
                [action.key]:action.value
            }  
            
        case 'clear_fields':
            return {
                ...state,
                [action.key]:action.value,
            }
        default:
            return state;
    }
}

interface Props {
    isOpen:boolean,
    onClose:() => void
}
export default function CreateLocationModal({isOpen, onClose}:Props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {fetchVehicles} = useVehicles()
    const {addData} = useAddNewData(LOCATIONS_DOMAIN)

    useEffect(() => {
        fetchVehicles()
    },[])
    const vehicles = useAppSelector(selectVehicles)
    const handleCreateLocation = () => {
        if( state.vehicle === ""){
            dispatch({
                type:'error_state',
                key:"isVehicleError",
                value:"Error"
            })
            return
        }
        if(state.address === ""||state.market_name === "" ) {
            dispatch({
                type:'error_state',
                key:"isError",
                value:'Error'
            })
            return
        } 
        else{
            let selectedVehicle = vehicles.find(vehicle => `${vehicle.make} ${vehicle.model} (${vehicle.plate})` === state.vehicle)
            addData({
                address:state.address,
                market_name:state.market_name,
                status: selectedVehicle?.status,
                vehicle: {
                    vehicle_id: selectedVehicle?.vehicle_id,
                    vehicle_pictures: selectedVehicle?.vehicle_pictures,
                    vehicle_name:state.vehicle
                }
            })
            onClose()
            dispatch({
                type:'clear_fields',
                key:"vehicle",
                value:""
            })
            dispatch({
                type:'clear_fields',
                key:"market_name",
                value:""
            })
            dispatch({
                type:'clear_fields',
                key:"address",
                value:""
            })
            dispatch({
                type:'clear_fields',
                key:"isVehicleError",
                value:""
            })
        }
    }
    return (
        <>
            <ModalTemplate headerTitle="Create Location" isOpen={isOpen} onClose={onClose}>
                <FormControl isInvalid={state.isError === 'Error'}>
                    <FormErrorMessage fontSize={16} fontWeight={600} paddingLeft={6} marginBottom={5}>Ensure all fields are filled</FormErrorMessage>
                    <Flex {...FlexColCenterBetween}>
                        <FormControl w={350} marginBottom={5} isRequired isInvalid={state.isVehicleError === 'Error'}>
                            <FormLabel htmlFor="vehicle">Vehicle</FormLabel>
                            <FormErrorMessage fontSize={16} fontWeight={600} marginBottom={3}>Select a vehicle</FormErrorMessage>
                            <Select w={350} value={state.vehicle} onChange={e => dispatch({
                                type:'create_values',
                                value:e.target.value,
                                key:'vehicle'
                            })}>
                                <option value=''>Select vehicle</option>
                                {vehicles && vehicles.map(vehicle => (
                                    <option key={vehicle.vehicle_id} value={`${vehicle.make} ${vehicle.model} (${vehicle.plate})`}>{`${vehicle.make} ${vehicle.model} (${vehicle.plate})`}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl w={350} isRequired isInvalid={!state.isaddressError} flexDirection={'column'} marginBottom={5}>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <Input type='text' id='address' placeholder='19307 Bennett Rd, North Royalton, Ohio(OH), 44133' w={350} value={state.address} onChange={e => 
                                dispatch({
                                    type:'create_values',
                                    value:e.target.value,
                                    key:"address"
                                })}
                            />
                            <FormErrorMessage>An address is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={350} isRequired isInvalid={!state.ismarket_nameError} flexDirection={'column'} marginBottom={5}>
                            <FormLabel htmlFor="market_name">Market Name</FormLabel>
                            <Input type='text' id='market_name' placeholder='RoyalTon' w={350} value={state.market_name} onChange={e => 
                                dispatch({
                                    type:'create_values',
                                    value:e.target.value,
                                    key:"market_name"
                                })}
                            />
                            <FormErrorMessage>A market name is required</FormErrorMessage>
                        </FormControl>
                        
                        <Flex w='100%' {...FlexRowCenterCenter} marginBottom={5}>
                            <Rounded variant='solid' setWidth={240} rounded='full' onClick={handleCreateLocation}>Create</Rounded>
                        </Flex>
                    </Flex>
                </FormControl>
                
            </ModalTemplate>
        </>
    )
}    