import { useState, useReducer, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    Flex,
    Select,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel
} from "@chakra-ui/react";
import { FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { IVehicleDetails } from "../../../globaltypes";
import useVehicles from "../../../hooks/useVehicles";
import { isArray, isEmpty, isString, isUndefined } from "lodash";
import ApiVehicleDetails from "./ApiVehicleDetails";
import UploadImage from "../../molecules/UploadImage/UploadImage";
import { isValidNumberString, isYearStringValid } from "../../../utils/utils";
import { z } from "zod";
import { useGetStationsQuery } from "../../../redux/stationSlice";

type IReducerState = Partial<IVehicleDetails> & {
    isplateError: boolean,
    isvehicle_picturesError: boolean,
    ismakeError: boolean,
    ismodelError: boolean,
    isyearError: boolean,
    ishourly_rateError: boolean
}

export const initialstate: IReducerState = {
    plate: "",
    make: "",
    model: "",
    transmission: "Manual",
    status: "inactive",
    isplateError: true,
    isvehicle_picturesError: true,
    ismakeError: true,
    ismodelError: true,
    isyearError: true,
    ishourly_rateError: true,
    pictures: [],
}

const tVehicleSchema = z.object({
    plate: z.string(),
    make: z.string(),
    model: z.string(),
    transmission: z.string(),
    pictures: z.array(z.string()),
    hourly_rate: z.number(),
    color: z.string(),
    year: z.number(),
    seats: z.number()
})

const validateField = (fieldName: string, fieldValue?: string | number | string[]): boolean => {
    if (isUndefined(fieldValue)) return false
    switch (fieldName) {
        case 'plate':
            if (!isString(fieldValue)) return false
            if (fieldValue.length < 6) return false
            return true
        case 'pictures':
            if (!isArray(fieldValue)) return false
            if (fieldValue.length === 0) return false
            return true
        case 'make':
            if (!isString(fieldValue)) return false
            if (fieldValue.length === 0) return false
            return true
        case 'model':
            if (!isString(fieldValue)) return false
            if (fieldValue.length <= 0) return false
            return true
        case 'year':
            return isYearStringValid(fieldValue as string)
        case 'hourly_rate':
            return isValidNumberString(fieldValue as string)
        default:
            return false
    }
}
const reducer = (state: IReducerState, action: { type: string, key: string, value: undefined | string | number | string[] }) => {
    switch (action.type) {
        case "create_vehicle":
            return {
                ...state,
                [action.key]: action.value,
                [`is${action.key}Error`]: validateField(action.key, action.value)
            }
        case "clear_vehicle":
            return {
                ...state,
                [action.key]: undefined
            }
        default:
            return state;
    }
}
interface Props {
    isOpen: boolean,
    onClose: () => void
}
export default function CreateVehicleModal(props: Props) {
    const { isOpen, onClose } = props
    const [vehicleImages, setVehicleImages] = useState<string[]>([])
    const [isError, setIsError] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialstate)
    const [station_id, set_station_id] = useState<string>()
    const { addVehicle } = useVehicles()
    const { data: stations, isLoading } = useGetStationsQuery(null)
    const [color, setColor] = useState<string>("")
    const [seats, setSeats] = useState<string>("")

    useEffect(() => {
        dispatch({
            type: 'create_vehicle',
            value: vehicleImages,
            key: "pictures"
        })
    }, [vehicleImages])

    const handleCreateVehicle = () => {
        const parsed = tVehicleSchema.safeParse({
            ...state,
            color,
            hourly_rate: Number(state.hourly_rate ?? 0),
            seats: Number( seats ?? 0 ),
            year: Number(state?.year ?? 0)
        })

        if (!parsed.success){
            setIsError(true)
        }else {
            const data = parsed.data
            addVehicle({
                ...data,
                station_id
            })
            onClose()
        }
    }

    const updateFormFields = (make: string, model: string, year: string) => {
        dispatch({
            type: 'create_vehicle',
            value: make,
            key: "make"
        })
        dispatch({
            type: 'create_vehicle',
            value: model,
            key: "model"
        })
        dispatch({
            type: 'create_vehicle',
            value: year,
            key: "year"
        })
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='6xl' isCentered motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent data-cy={'create-vehicle-modal'}>
                    <ModalHeader textAlign={'center'}>Create Vehicle</ModalHeader>
                    <ModalCloseButton data-cy={'close-modal-button'}/>
                    <ModalBody>
                        <FormControl isInvalid={isError}>
                            <FormErrorMessage fontSize={16} fontWeight={600}>Ensure all fields are filled</FormErrorMessage>
                            <Flex >
                                <Box w={1 / 3}>
                                    <UploadImage
                                        multiple
                                        onChange={(images) => setVehicleImages(images as string[])}
                                    />
                                </Box>
                                
                                <Flex w={2 / 3} flexDirection="column" gap="10px">
                                    <ApiVehicleDetails {...{ updateFormFields }} />
                                    <Flex flexWrap='wrap' flexDirection={"row"} justifyContent={'space-between'} h='100%'>
                                        <FormControl w={350} isRequired marginBottom={5} isInvalid={!state.isplateError}>
                                            <FormLabel htmlFor="id">Plate</FormLabel>
                                            <Input type='text' id='id' placeholder='ABC-123' w={350} value={state.plate} onChange={e =>
                                                dispatch({
                                                    type: 'create_vehicle',
                                                    value: e.target.value,
                                                    key: "plate"
                                                })}
                                            />
                                            <FormErrorMessage>Vehicle plate is required(At least 6 characters)</FormErrorMessage>
                                        </FormControl>
                                        <FormControl w={350} isRequired isInvalid={!state.ismakeError} flexDirection={'column'} marginBottom={5}>
                                            <FormLabel htmlFor="make">Make</FormLabel>
                                            <Input type='text' id='make' placeholder='Toyota' w={350} value={state.make} onChange={e =>
                                                dispatch({
                                                    type: 'create_vehicle',
                                                    value: e.target.value,
                                                    key: "make"
                                                })}
                                            />
                                            <FormErrorMessage>Vehicle make is required</FormErrorMessage>
                                        </FormControl>
                                        <FormControl w={350} isRequired isInvalid={isEmpty(station_id)}  >
                                            <FormLabel>
                                                Station
                                            </FormLabel>
                                            <Select 
                                                placeholder="Select a station"
                                                value={station_id}
                                                onChange={(e)=>{
                                                    set_station_id(e.target.value)
                                                }}
                                            >
                                                {
                                                    stations?.map((station, i)=> {
                                                        return (
                                                            <option key={i} value={station?.id} >
                                                                {
                                                                    station?.name
                                                                }
                                                            </option>
                                                        )
                                                    })
                                                }
                                                <option key={3} >
                                                </option>
                                            </Select>
                                        </FormControl>
                                        <FormControl w={350} isRequired isInvalid={!state.ismodelError} marginBottom={5}>
                                            <FormLabel htmlFor="model">Model</FormLabel>
                                            <Input type='text' id='model' placeholder='Camry' w={350} value={state.model} onChange={e => dispatch({
                                                type: 'create_vehicle',
                                                value: e.target.value,
                                                key: "model"
                                            })}
                                            />
                                            <FormErrorMessage>Vehicle model is required</FormErrorMessage>
                                        </FormControl>
                                        <FormControl w={350} isRequired isInvalid={isEmpty(color)} marginBottom={5}>
                                            <FormLabel htmlFor="model">Color</FormLabel>
                                            <Input type='text' id='model' placeholder='red' w={350} value={color} onChange={(e)=>{
                                                setColor(e.target.value)
                                            }}
                                            />
                                            <FormErrorMessage>Color is required</FormErrorMessage>
                                        </FormControl>
                                        <FormControl w={350} isRequired isInvalid={isEmpty(seats)} marginBottom={5}>
                                            <FormLabel htmlFor="model">Seats</FormLabel>
                                            <Input type='number' id='model' placeholder='e.g 4' w={350} value={seats} onChange={(e)=>{
                                                setSeats(e.target.value)
                                            }}
                                            />
                                            <FormErrorMessage>Number of seats is required</FormErrorMessage>
                                        </FormControl>
                                        <FormControl w={350} isRequired isInvalid={!state.isyearError} marginBottom={5}>
                                            <FormLabel htmlFor="year">Year</FormLabel>
                                            <Input type='number' id='year' placeholder='2018' max={4} w={350} value={state.year} onChange={e => dispatch({
                                                type: 'create_vehicle',
                                                value: e.target.value,
                                                key: "year"
                                            })} />
                                            <FormErrorMessage>Vehicle year of make is required(4 characters)</FormErrorMessage>
                                        </FormControl>
                                        <FormControl w={350} marginBottom={5} isRequired>
                                            <FormLabel htmlFor="transmission">Transmission</FormLabel>
                                            <Select data-testid="transmission-select" w={350} value={state.transmission} onChange={e => dispatch({
                                                type: 'create_vehicle',
                                                value: e.target.value,
                                                key: "transmission"
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
                                        <FormControl w={350} marginBottom={5} isRequired isInvalid={!state.ishourly_rateError}>
                                            <FormLabel htmlFor="rate">Rate</FormLabel>
                                            <Input type='number' id='rate' placeholder='$' w={350} value={state.hourly_rate} onChange={e => dispatch({
                                                type: 'create_vehicle',
                                                value: e.target.value,
                                                key: "hourly_rate"
                                            })} />
                                            <FormErrorMessage>Vehicle hourly rate is required</FormErrorMessage>
                                        </FormControl>

                                        <Flex w='100%' {...FlexRowCenterCenter} marginBottom={5}>
                                            <Rounded variant='solid' setWidth={350} rounded='full' onClick={handleCreateVehicle}>Create</Rounded>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );

}