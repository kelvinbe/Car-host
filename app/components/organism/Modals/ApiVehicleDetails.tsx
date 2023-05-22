import { Box, Flex, FormControl, Input, Button, Text, Select, Spinner } from '@chakra-ui/react'
import React, { useState, useReducer, useEffect } from 'react'
import {isString, isUndefined, isEmpty, isNull } from "lodash";
import useVehicles from '../../../hooks/useVehicles';
import { IapiResponseData } from '../../../globaltypes';
import { Search2Icon } from '@chakra-ui/icons'

type Props = {
    updateFormFields: (make: string, model: string, year: string) => void
}

const initialState = {
    make:"",
    model:"",
    year:"",
    makeError:false,
    modelError:false,
    yearError:false
}

type IvehicleApiInfo = typeof initialState
type IapiInfo = {
    make :string,
    model :string,
    transmission: string,
    year: string
}

type IstateApiData = IapiInfo[] 

const reducer = (state:IvehicleApiInfo, action:{type:string, payload:string, key:string}): IvehicleApiInfo=>{
    const { type, payload, key} = action
    switch(type){
        case "add_vehicle_info":
            return {
                ...state,
                [key]:payload,
                [`${key}Error`]: validateField(key, payload)
            }
        case "clear_vehicle_info":
            return {
                ...initialState
            }
        default:
            return state
    }
}


const validateField = (fieldname:string, fieldValue:string): boolean =>{
    if(isUndefined(fieldValue)) return true
    switch(fieldname){
        case 'make':
            if(!isString(fieldValue)) return true
            if(fieldValue.length < 4) return true
            return false
        case 'model':
            if(!isString(fieldValue)) return true
            if(fieldValue.length < 2) return true
            return false
        case 'year':
            // eslint-disable-next-line no-case-declarations
            const re = /(?:(?:19|20|21)[0-9]{2})/
            if(!re.test(fieldValue)) return true
            return false
        default:
            return true
    }
}

const ApiVehicleDetails = (props: Props) => {

    const { updateFormFields } = props
    const {fetchApiVehicles} = useVehicles()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(false)
    const [querystring, setQuerystring] = useState("")
    const [searchApi, setSearchApi] = useState(false)
    const [apiData, setApiData] = useState<IstateApiData>([])
    const [data, setData] = useState<IapiResponseData>(null)
    const [error, setError] = useState({
        errorPresent:false,
        errorMessage:""
    })

    const onSubmit = (e:React.FormEvent) =>{
        e.preventDefault()
        setError({errorPresent: false, errorMessage:""})
        const allFieldsValidated =[state.makeError, state.modelError, state.yearError].every(x => x === false)
        if(allFieldsValidated){
            setQuerystring(`${state.year}+${state.make}+${state.model}`)
            setSearchApi(prev => !prev)
        }else{
            setError({
                errorPresent: true,
                errorMessage:"The higlited fields are incorrect"
            })
        }
    }

    const fetchData  = async (query:string) =>{
        fetchApiVehicles({
            query,
            setApiData: setData,
            loading: setLoading
        })
    }

    useEffect(()=>{
        if(querystring){
            fetchData(querystring)
        }
        return () =>{
            setQuerystring("")
        }
    },[querystring, searchApi])

    useEffect(()=>{
        if(!isNull(data) && !isEmpty(data)){
            if(data && data.status === 200){
                data.data.records?.length !== 0 && setApiData(data.data.records?.map((x)=>{
                    const carInfo = {
                        make : x.fields.make,
                        model :x.fields.model,
                        transmission: x.fields.trany,
                        year: x.fields.year
                    }
                    setLoading(false)
                    return carInfo
                }))

                data.data.records?.length === 0 && setError(()=>{
                    setLoading(false)
                    setApiData([])
                    return {
                        errorPresent: true,
                        errorMessage:"No vehicles fit parameters"
                    }
                })
            }else{
                setError(()=>{
                    setLoading(false)
                    return {
                        errorPresent: true,
                        errorMessage:"Could not fetch from API"
                    }
                })
            }
        }

    },[data])


    const onVehicleSelect = (index:string) =>{
        const selected = apiData[Number(index)]
        updateFormFields(selected?.["make"], selected?.["model"], selected?.["year"])
    }

    return (
        <Box
            padding="10px"
            borderRadius="5px"
            border="2px solid"
            borderColor="whitesmoke"
            display="flex"
            flexDirection="column"
        >
            <form onSubmit={onSubmit} style={{display:"flex", gap:"10px"}}>
                <FormControl isRequired isInvalid = {state.yearError} flexDirection={'column'}>
                    <Input 
                        type="text"
                        placeholder='Year'
                        value={state.year}
                        onChange={(e)=>{
                            dispatch({
                                type:"add_vehicle_info",
                                payload: e.target.value,
                                key:"year"
                            })
                        }}
                    />
                </FormControl>
                <FormControl isRequired isInvalid = {state.makeError} flexDirection={'column'}>
                    <Input 
                        type="make"
                        placeholder='Make eg: Toyota'
                        value={state.make}
                        onChange={(e)=>{
                            dispatch({
                                type:"add_vehicle_info",
                                payload: e.target.value,
                                key:"make"
                            })
                        }}
                    />
                </FormControl>
                <FormControl isRequired isInvalid = {state.modelError} flexDirection={'column'}>
                    <Input 
                        type="text"
                        placeholder='Model eg: Prius'
                        value={state.model}
                        onChange={(e)=>{
                            dispatch({
                                type:"add_vehicle_info",
                                payload: e.target.value,
                                key:"model"
                            })
                        }}
                    />
                </FormControl>
                <Box>
                    <Button style={{padding:"10px"}} display="block" type='submit'>
                        <Search2Icon />
                    </Button>
                </Box>
            </form>
            {error.errorPresent && <Text color="red" marginBlock="10px">{error.errorMessage}</Text>}
            <Box 
                marginTop="5px"
            >
                {loading 
                    ? <Flex align="center" justifyContent="center" padding="10px"><Spinner /></Flex>
                    : apiData?.length !== 0
                    ? (<Box>
                        <Select placeholder='Select your vehicle from the list below' onChange={(e)=>onVehicleSelect(e.target.value)} data-cy='vehicle-select'>
                            {apiData?.map((vehicle, index)=>{
                                const { make, model, year, transmission } = vehicle
                                return(
                                    <option key={index} value={`${index}`}>{`${year} ${make} ${model} ${transmission}`}</option>
                                )
                            })}
                        </Select>
                    </Box>)
                    : <></>
                }
            </Box>
        </Box>
    )
}

export default ApiVehicleDetails