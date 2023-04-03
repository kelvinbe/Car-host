/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Spinner, Text, useToast } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { selectFName, selectHandle, selectLName, selectProfilePicUrl, setFName, setHandle, setLName, setProfilePic } from "../../../redux/onboardingSlice"
import { IUserProfile } from "../../../globaltypes"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import { useDropzone } from "react-dropzone"
import { FlexColCenterBetween, FlexColCenterCenter, FlexRowCenterEnd, FlexRowCenterStart } from "../../../utils/theme/FlexConfigs"
import { isEmpty, isUndefined } from "lodash"
import Image from "next/image"
import { uploadToFirebase } from "../../../utils/utils"


interface StepProps {
    onCompleted: (data?: Partial<IUserProfile>) => void,
    onBack: () => void,
}

const OnBoardingProfileInfo = (props: StepProps) => {
    const { onBack, onCompleted } = props
    const toast = useToast()
    const dispatch = useAppDispatch()
    const fname = useAppSelector(selectFName)
    const lname = useAppSelector(selectLName)
    const handle = useAppSelector(selectHandle)
    const profile_pic_url = useAppSelector(selectProfilePicUrl)
    const uploading_pic = useRef(false)
    const [errors, setErrors] = useState<{
        fname: boolean,
        lname: boolean,
        profile_pic_url: boolean,
        handle: boolean
    }>({
        fname: false,
        lname: false,
        profile_pic_url: false,
        handle: false
    })

    useEffect(() => {
        setErrors(() => {
            return {
                fname: !z.string().nonempty().safeParse(fname).success,
                lname: !z.string().nonempty().safeParse(lname).success,
                profile_pic_url: !z.string().nonempty().safeParse(profile_pic_url).success,
                handle: !z.string().min(3).safeParse(handle.handle).success,
            }
        })
    }, [lname, fname, profile_pic_url, handle.handle])

    const updateFName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setFName(e.target.value))
    const updateLName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setLName(e.target.value))
    const updateHandle = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setHandle(e.target.value))
    const updateProfilePicUrl = (url: string) => dispatch(setProfilePic(url))

    const { getInputProps, getRootProps, acceptedFiles } = useDropzone()

    useEffect(() => {
        const file = acceptedFiles[0]
        if (file) {
            const blob_url = URL.createObjectURL(file)
            uploading_pic.current = true
            uploadToFirebase(blob_url, file.name, file.type).then(updateProfilePicUrl).then(() => {
                uploading_pic.current = false
            }).catch(() => {
                toast({
                    title: "Error Uploading Image",
                    description: "Please try again",
                    status: "error",
                })
            })
        }
    }, [acceptedFiles.length])

    const handleContinue = () => {
        onCompleted({
            fname,
            lname,
            handle: handle.handle,
            profile_pic_url,
        })
    }

    return (
        <Flex  {...FlexColCenterBetween} h="full" w="full" >
            <Grid w="80%" justifyItems={"center"} templateRows="40px 200px 40px 40px" >
                <GridItem colSpan={1} rowSpan={1} >
                    <Text>
                        Your Profile is Incomplete
                    </Text>
                </GridItem>
                <GridItem w="full" >
                    <Text>
                        Upload Your Profile Pic
                    </Text>
                    <Flex w="full" h="full" >
                        <Flex
                            {...getRootProps({
                                className: "dropzone",
                            })}
                            w="400px"
                            height="100px"
                            border="1px dashed"
                            borderColor="gray.300"
                            borderRadius="10px"
                            {...FlexColCenterCenter}

                        >
                            <FormControl
                                isRequired
                                isInvalid={
                                    errors.profile_pic_url
                                }
                            >
                                <Input
                                    {...getInputProps({
                                        accept: "image/*",
                                    })}
                                />
                                <FormErrorMessage>
                                    Please upload a profile pic
                                </FormErrorMessage>
                            </FormControl>
                            {uploading_pic.current ? <Spinner

                            /> : <>{
                                !errors.profile_pic_url ? <p>
                                    Drag and drop your profile pic here
                                </p> : ''}</>}
                        </Flex>
                        {
                            !isUndefined(profile_pic_url) && !isEmpty(profile_pic_url) && !uploading_pic.current && <Flex ml="20px" width="full" height={100} overflow="hidden" >
                                <Image
                                    src={profile_pic_url}
                                    width={100}
                                    height={100}
                                    alt="Profile Pic"
                                />
                            </Flex>
                        }
                    </Flex>

                </GridItem>
                <Grid
                    templateColumns={"1fr 1fr"}
                    w="full"
                    columnGap={40}
                    rowGap={10}
                >
                    <GridItem colSpan={1} >
                        <FormControl
                            isRequired
                            isInvalid={
                                errors.fname
                            }
                        >
                            <FormLabel>
                                First Name
                            </FormLabel>
                            <Input
                                placeholder='First Name'
                                onChange={updateFName}
                                value={fname}
                            />
                            <FormHelperText>
                                Your first name e.g John
                            </FormHelperText>
                            <FormErrorMessage>
                                Your first name is required
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1} >
                        <FormControl
                            isRequired
                            isInvalid={
                                errors.lname
                            }
                        >
                            <FormLabel>
                                Last Name
                            </FormLabel>
                            <Input
                                placeholder='Last Name'
                                onChange={updateLName}
                                value={lname}
                            />
                            <FormHelperText>
                                Your last name e.g Smith
                            </FormHelperText>
                            <FormErrorMessage>
                                Your last name is required
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1} >
                        <Flex w="full" {...FlexRowCenterStart} alignItems="center" justifyContent={"flex-start"} >

                            <FormControl
                                isRequired
                                isInvalid={
                                    handle.isHandleTaken || errors.handle
                                }
                            >
                                <FormLabel>
                                    Choose a handle
                                </FormLabel>
                                <Input
                                    placeholder='Choose a handle'
                                    onChange={updateHandle}
                                    value={handle.handle}
                                />
                                <FormHelperText>
                                    Your handle will be used to identify you on the platform
                                </FormHelperText>
                                <FormErrorMessage>
                                    Handle is already taken
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>
                    </GridItem>
                </Grid>
            </Grid>
            <Flex w="full" {...FlexRowCenterEnd} >
                <Button
                    disabled={
                        errors.fname || errors.lname || errors.profile_pic_url || handle.isHandleTaken
                    }
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </Flex>
        </Flex>
    )
}

export default OnBoardingProfileInfo