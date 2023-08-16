/* eslint-disable react-hooks/exhaustive-deps */
import ModalTemplate from "./ModalTemplate";
import { Flex, FormControl, FormLabel, Input, FormErrorMessage, Select, Textarea, useToast, Modal, ModalBody, ModalHeader, ModalContent, ModalOverlay, Text, ModalCloseButton } from "@chakra-ui/react";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { FlexColCenterBetween, FlexColCenterStart, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterStart } from "../../../utils/theme/FlexConfigs";
import { useReducer, useState, useEffect, ChangeEvent } from "react";
import { isEmpty, isUndefined } from "lodash"
import UploadImage from "../../molecules/UploadImage/UploadImage";
import { useAddStationMutation, useGetStationsQuery, useUpdateStationMutation } from "../../../redux/stationSlice";
import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";
import dynamic from "next/dynamic";
import useLocation from "../../../hooks/useLocation";
import { IStation } from "../../../globaltypes";
import { selectUser } from "../../../redux/userSlice";
import { useAppSelector } from "../../../redux/store";
const ChooseLocation = dynamic(() => import("../Maps/ChooseLocation/ChooseLocation"), {
    ssr: false
})



type IReducerState = {
    name: string,
    sub_market_id: string,
    image: string,
    isNameValid: boolean,
    isSubMarketValid: boolean,
    isImageValid: boolean,
    description: string,
    isDescriptionValid: boolean
}

const initialState: IReducerState = {
    name: '',
    sub_market_id: '',
    image: '',
    isNameValid: true,
    isSubMarketValid: true,
    isImageValid: false,
    description: '',
    isDescriptionValid: true
}

const slice = createSlice({
    name: 'createStation',
    initialState,
    reducers: {
        add_name: (state, action) => {
            state.name = action.payload
            state.isNameValid = z.string().min(3).max(50).safeParse(action.payload).success
        },
        add_sub_market_id: (state, action) => {
            state.sub_market_id = action.payload
            state.isSubMarketValid = z.string().uuid({
                message: "Invalid sub market id"
            }).safeParse(action.payload).success
        },
        // add_coordinates: (state, action) => {
        //     state.latitude = action.payload.latitude
        //     state.longitude = action.payload.longitude
        //     state.isLatitudeValid = z.number().min(-90).max(90).safeParse(action.payload.latitude).success
        //     state.isLongitudeValid = z.number().min(-180).max(180).safeParse(action.payload.longitude).success
        // },
        add_image: (state, action) => {
            state.image = action.payload
            state.isImageValid = z.string().url().safeParse(action.payload).success
        },
        add_description: (state, action) => {
            state.description = action.payload
            state.isDescriptionValid = action.payload?.length == 0 ? true : z.string().min(3).max(200).safeParse(action.payload).success
        },
    }
})

const reducer = slice.reducer
const { add_image, add_name, add_sub_market_id, add_description } = slice.actions

interface Props {
    isOpen: boolean,
    onClose: () => void,
    station?: Partial<IStation> | null
}
export default function StationActionModal({ isOpen, onClose, station }: Props) {
    const user = useAppSelector(selectUser)
    const [submissions, setSubmissions] = useState(0)
    const [{
        image,
        name,
        sub_market_id,
        isNameValid,
        isSubMarketValid,
        isImageValid,
        description,
        isDescriptionValid
    }, dispatchAction] = useReducer(reducer, initialState)

    const toast = useToast({
        position: "top",
        duration: 3000,
    })

    const updateImage = (image: string | string[]) => dispatchAction(add_image(image as string))
    const updateName = (e: ChangeEvent<HTMLInputElement>) => dispatchAction(add_name(e.target.value))
    const updateSubMarket = (e: ChangeEvent<HTMLSelectElement>) => dispatchAction(add_sub_market_id(e.target.value))
    const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) => dispatchAction(add_description(e.target.value))
    // const updateCoordinates = (coordinates: { latitude: number, longitude: number }) => dispatchAction(add_coordinates(coordinates))

    const { fetchSubmarkets, submarkets } = useLocation()

    const [postStation, { isLoading }] = useAddStationMutation({})
    const [updateStation, { isLoading: updateLoading }] = useUpdateStationMutation({})
    const { refetch } = useGetStationsQuery(null)

    useEffect(() => {
        if (!isUndefined(station) && !isEmpty(station)) {
            console.log("Updating station  with", station)
            updateImage(station?.image ?? "")
            updateName({ target: { value: station.name } } as ChangeEvent<HTMLInputElement>)
            updateSubMarket({ target: { value: station.sub_market_id } } as ChangeEvent<HTMLSelectElement>)
            updateDescription({ target: { value: station.description } } as ChangeEvent<HTMLTextAreaElement>)
            // updateCoordinates({ latitude: station?.latitude ?? 0, longitude: station?.longitude ?? 0 })
        }
    }, [station?.id])



    useEffect(() => {
       fetchSubmarkets(user?.market_id ?? "")
    }, [user?.market_id])

    const stationAction = () => {
        if (!isUndefined(station) && !isEmpty(station)) {
            updateStation({
                name: station?.name === name ? undefined : name,
                sub_market_id: station?.sub_market_id === sub_market_id ? undefined : sub_market_id,
                // longitude: station?.longitude === longitude ? undefined : longitude,
                // latitude: station?.latitude === latitude ? undefined : latitude,
                image: station?.image === image ? undefined : image,
                description: station?.description === description ? undefined : description,
                station_id: station?.id
            }).unwrap().then(() => {
                toast({
                    title: "Success",
                    description: "Station updated successfully",
                    status: "success",
                    isClosable: true,
                })
                refetch()
                onClose()
            }).catch((e) => {
                toast({
                    title: "Error",
                    description: "An error occured while updating station",
                    status: "error",
                    isClosable: true,
                })
            })
        } else {
            postStation({
                name,
                sub_market_id,
                // longitude,
                // latitude,
                image,
                description
            }).unwrap().then(() => {
                refetch()
                toast({
                    title: "Success",
                    description: "Station created successfully",
                    status: "success",
                    isClosable: true,
                })
                onClose()
            }).catch((e) => {
                toast({
                    title: "Error",
                    description: "An error occured while creating station",
                    status: "error",
                    isClosable: true,
                })
            })
        }
    }


    return (
        <Modal size="6xl" isOpen={isOpen} onClose={onClose} > 
            <ModalOverlay/> 
            <ModalContent>
                <ModalBody>
                    <ModalHeader>
                        <Text>
                            Create a station
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl data-cy="station-modal">
                            <FormErrorMessage fontSize={16} fontWeight={600} paddingLeft={6} marginBottom={5}>Ensure all fields are filled</FormErrorMessage>
                            <Flex {...FlexRowCenterBetween} w="full" experimental_spaceX={"10px"} >
                                <Flex {...FlexColCenterStart} w="50%" >
                                    <FormControl w="100%" isRequired isInvalid={!isNameValid} flexDirection={'column'} marginBottom={5}>
                                        <FormLabel htmlFor="station_name">Station name</FormLabel>
                                        <Input type='text' id='station_name' placeholder='North Royalton Station' value={name} onChange={updateName} />
                                        <FormErrorMessage>A station name is required</FormErrorMessage>
                                    </FormControl>
                                    <FormControl w={"100%"} isInvalid={!isDescriptionValid} flexDirection={'column'} marginBottom={5}>
                                        <FormLabel htmlFor="description">Station description</FormLabel>
                                        <Textarea id='description' placeholder='19307 Bennett Rd, North Royalton, Ohio(OH), 44133' value={description} onChange={updateDescription}
                                        />
                                        <FormErrorMessage>A station description is required</FormErrorMessage>
                                    </FormControl>
                                    <FormControl w="full" mt="10px" mb="20px" isRequired isInvalid={!isSubMarketValid}>
                                        <FormLabel htmlFor="vehicle">Choose a submarket</FormLabel>
                                        <FormErrorMessage fontSize={16} fontWeight={600} marginBottom={3}>Select a sub market</FormErrorMessage>
                                        <Select placeholder="Select a submarket" value={station ? sub_market_id : undefined} onChange={updateSubMarket} >
                                            {
                                                submarkets?.data?.map(({ id, name }, i) => (
                                                    <option value={id} key={i} >
                                                        {name}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <UploadImage onChange={updateImage} images={station ? [station?.image ?? ""] : undefined} />
                                    <Flex w='100%' {...FlexRowCenterStart} padding="10px">
                                        <Rounded variant='solid' rounded='full' setWidth="80%"
                                            disabled={
                                                !isNameValid ||
                                                !isSubMarketValid ||
                                                !isImageValid ||
                                                !isDescriptionValid ||
                                                // !isLatitudeValid ||
                                                // !isLongitudeValid ||
                                                isEmpty(name) ||
                                                isEmpty(sub_market_id) ||
                                                isEmpty(image)
                                                // isUndefined(latitude) ||
                                                // isUndefined(longitude)
                                            }
                                            onClick={stationAction}
                                            loading={isLoading || updateLoading}
                                        >{
                                                isUndefined(station) ? "Create Station" : "Update Station"
                                            }</Rounded>
                                    </Flex>
                                </Flex>
                                <Flex {...FlexColCenterStart} w="50%" h="400px" >

                                </Flex>
                            </Flex>
                            
                        </FormControl>
                    </ModalBody>
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}    