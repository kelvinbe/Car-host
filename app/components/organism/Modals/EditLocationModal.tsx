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
import useEditData from "../../../hooks/useEditData";

type IReducerState = {
    address:string,
    market_name:string,
    isaddressError:boolean,
    ismarket_nameError:boolean,
    isError:string
}

interface Props {
    isOpen:boolean,
    onClose:() => void,
    location:{
        address:string,
        market_name:string,
        location_id:number
    }
}
export default function EditLocationModal({isOpen, onClose, location}:Props) {
const initialState = {
    address:location.address,
    market_name:location.market_name,
    isaddressError:true,
    ismarket_nameError:true,
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
        case 'edit_values':
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
            
        default:
            return state;
    }
}
    const [state, dispatch] = useReducer(reducer, initialState)
        const {updateData} = useEditData(LOCATIONS_DOMAIN, location.location_id)

    const handleEditLocation = () => {
        if(state.address === ""||state.market_name === "" ) {
            dispatch({
                type:'error_state',
                key:"isError",
                value:'Error'
            })
            return
        } 
        else{
            updateData({
                address:state.address,
                market_name:state.market_name,
            })
            onClose()
        }
    }
    return (
        <>
            <ModalTemplate headerTitle="Edit Location" isOpen={isOpen} onClose={onClose}>
                <FormControl isInvalid={state.isError === 'Error'}>
                    <FormErrorMessage fontSize={16} fontWeight={600} paddingLeft={6} marginBottom={5}>Ensure all fields are filled</FormErrorMessage>
                    <Flex {...FlexColCenterBetween}>
                        <FormControl w={350} isRequired isInvalid={!state.isaddressError} flexDirection={'column'} marginBottom={5}>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <Input type='text' id='address' placeholder='19307 Bennett Rd, North Royalton, Ohio(OH), 44133' w={350} value={state.address} onChange={e => 
                                dispatch({
                                    type:'edit_values',
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
                                    type:'edit_values',
                                    value:e.target.value,
                                    key:"market_name"
                                })}
                            />
                            <FormErrorMessage>A market name is required</FormErrorMessage>
                        </FormControl>
                        
                        <Flex w='100%' {...FlexRowCenterCenter} marginBottom={5}>
                            <Rounded variant='outline' setWidth={240} rounded='full' onClick={handleEditLocation}>Edit</Rounded>
                        </Flex>
                    </Flex>
                </FormControl>
                
            </ModalTemplate>
        </>
    )
}    