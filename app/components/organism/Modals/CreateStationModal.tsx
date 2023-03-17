import ModalTemplate from "./ModalTemplate";
import { Flex, FormControl, FormLabel, Input, FormErrorMessage, Select, Textarea } from "@chakra-ui/react";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { FlexColCenterBetween, FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";
import { useReducer, useState, useEffect, ChangeEvent } from "react";
import { isUndefined } from "lodash";
import useAddNewData from "../../../hooks/useAddNewData";
import { STATIONS_DOMAIN } from "../../../hooks/constants";
import UploadImage from "../../molecules/UploadImage/UploadImage";
import { useFetchData } from "../../../hooks";
import { getStations } from "../../../redux/stationSlice";

type IReducerState = {
    station_name:string,
    description:string,
    sub_market_name:string,
    station_images:string[],
    status:string,
    isstation_nameError:boolean,
    isdescriptionError:boolean,
    issub_market_nameError:boolean,
    isstation_imageError:boolean,
    isError:string,
    isStatusError:string,
    isImageError:string
}

const initialState = {
    station_name:"",
    description:"",
    sub_market_name:"",
    station_images:[],
    status:"",
    isstation_nameError:true,
    isdescriptionError:true,
    issub_market_nameError:true,
    isstation_imageError:true,
    isError:"",
    isStatusError:"",
    isImageError:""
}
const checkErrorOnChange = (key:string, value:string|string[]) => {
    if(isUndefined(value)) return false
    switch (key) {
        case 'station_name':
            if(value.length < 4)return false
            return true
        case 'description':
            if(value.length < 3)return false
            return true   
        case 'sub_market_name':
            if(value.length < 3)return false
            return true   
        default:
            return false
    }
}
const reducer = (state:IReducerState, action:{type:string, value:string|string[], key:string}) => {
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
export default function CreateStationModal({isOpen, onClose}:Props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {fetchData} = useFetchData(STATIONS_DOMAIN, getStations)
    const {addData} = useAddNewData(STATIONS_DOMAIN, 'Success','Created station successfully', 'An error occurred', 'Could not create a station',fetchData )
    const [images, setImages] = useState<string[]>([])

    const handleSelectImages = (e:ChangeEvent) => {
        const fileList = (e.target as HTMLInputElement).files
        const fileListArray = fileList && Array.from(fileList)

        let imagesArray = fileListArray?.map(file => {
            return URL.createObjectURL(file)
        })
        imagesArray && setImages(imagesArray)
    }

    useEffect(() => {
        dispatch({
            type:'create_values',
            value:images,
            key:"station_images"
        })
    },[images])

    const handleCreateStation = () => {
        if(state.station_name === ""|| state.sub_market_name === "" ||  state.description=== "" || state.status === '', state.station_images.length === 0) {
            dispatch({
                type:'error_state',
                key:"isError",
                value:'Error'
            })
            if(state.status === ''){
                dispatch({
                    type:'error_state',
                    key:"isStatusError",
                    value:'Error'
                })
            }
            if(state.station_images.length === 0){
                dispatch({
                    type:'error_state',
                    key:"isImageError",
                    value:'Error'
                })
            }
            return 
        }
        
        if(state.station_images.length !== 0){
            dispatch({
                type:'error_state',
                key:"isImageError",
                value:''
            })
        }
        if(state.status !== ''){
            dispatch({
                type:'error_state',
                key:"isStatusError",
                value:''
            })
        }
        addData({
            station_name:state.station_name,
            sub_market_name:state.sub_market_name,
            status: state.status,
            description:state.description,
            station_images:state.station_images
        })
        onClose()
        dispatch({
            type:'clear_fields',
            key:"station_name",
            value:""
        })
        dispatch({
            type:'clear_fields',
            key:"sub_market_name",
            value:""
        })
        dispatch({
            type:'clear_fields',
            key:"status",
            value:""
        })
        dispatch({
            type:'clear_fields',
            key:"description",
            value:""
        })
        dispatch({
            type:'clear_fields',
            key:"station_image",
            value:""
        })

    }
    return (
        <>
            <ModalTemplate headerTitle="Create Station" isOpen={isOpen} onClose={onClose}>
                <FormControl isInvalid={state.isError === 'Error'}>
                    <FormErrorMessage fontSize={16} fontWeight={600} paddingLeft={6} marginBottom={5}>Ensure all fields are filled</FormErrorMessage>
                    <Flex {...FlexColCenterBetween}>
                        <FormControl w={350} isRequired isInvalid={!state.isstation_nameError} flexDirection={'column'} marginBottom={5}>
                            <FormLabel htmlFor="station_name">Station name</FormLabel>
                            <Input type='text' id='station_name' placeholder='North Royalton Station' w={350} value={state.station_name} onChange={e => 
                                dispatch({
                                    type:'create_values',
                                    value:e.target.value,
                                    key:"station_name"
                                })}
                            />
                            <FormErrorMessage>A station name is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={350} isRequired isInvalid={!state.isdescriptionError} flexDirection={'column'} marginBottom={5}>
                            <FormLabel htmlFor="description">Station description</FormLabel>
                            <Textarea id='description' placeholder='19307 Bennett Rd, North Royalton, Ohio(OH), 44133' w={350} value={state.description} onChange={e => 
                                dispatch({
                                    type:'create_values',
                                    value:e.target.value,
                                    key:"description"
                                })}
                            />
                            <FormErrorMessage>A station description is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={350} isRequired isInvalid={!state.issub_market_nameError} flexDirection={'column'} marginBottom={5}>
                            <FormLabel htmlFor="sub_market_name">Sub Market Name</FormLabel>
                            <Input type='text' id='sub_market_name' placeholder='RoyalTon' w={350} value={state.sub_market_name} onChange={e => 
                                dispatch({
                                    type:'create_values',
                                    value:e.target.value,
                                    key:"sub_market_name"
                                })}
                            />
                            <FormErrorMessage>A sub-market name is required</FormErrorMessage>
                        </FormControl>
                        <FormControl w={350} marginBottom={5} isRequired isInvalid={state.isStatusError === 'Error'}>
                            <FormLabel htmlFor="vehicle">Status</FormLabel>
                            <FormErrorMessage fontSize={16} fontWeight={600} marginBottom={3}>Select a location status</FormErrorMessage>
                            <Select w={350} value={state.status} onChange={e => dispatch({
                                type:'create_values',
                                value:e.target.value,
                                key:'status'
                            })}>
                                <option value=''>Select status</option>
                                <option value='active'>Active</option>
                                <option value="inactive">Inactive</option>
                            </Select>
                        </FormControl>
                        <UploadImage isError={state.isImageError === 'Error'} handleSelectImages={handleSelectImages} images={images} setter={setImages}/>
                        <Flex w='100%' {...FlexRowCenterCenter} marginBottom={5}>
                            <Rounded variant='solid' setWidth={240} rounded='full' onClick={handleCreateStation}>Create</Rounded>
                        </Flex>
                    </Flex>
                </FormControl>
                
            </ModalTemplate>
        </>
    )
}    