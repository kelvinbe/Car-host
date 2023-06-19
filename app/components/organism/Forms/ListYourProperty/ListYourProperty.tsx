import {
  Flex,
  Select,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Text,
  Textarea,
  FormHelperText,
  Button,
  useToast,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  Image,
  Spinner,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { FlexColCenterCenter } from "../../../../utils/theme/FlexConfigs";
import dynamic from "next/dynamic";
import { IProperty, createProperty, selectPictures, selectProperty, setPictures } from "../../../../redux/propertySlice";
import { uploadToFirebase } from "../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { isEmpty } from "lodash";
const ChooseLocation = dynamic(()=>import("../../Maps/ChooseLocation/ChooseLocation"),{
  ssr: false
})

interface IProps{
  handleBackClick: ()=>void;
  handleContinueClick: ()=> void;
  current: number;
}
const ListYourProperty = (props: IProps) => {
  const {handleBackClick, handleContinueClick, current}=props
  const [property, setProperty] = useState<IProperty>({
    propertyType: '',
    propertyName: '',
    country: '',
    latitude: 0,
    longitude: 0,
    city: '',
    state: '',
    zipCode: 0,
    isManaged: false,
    numberOfRooms: 0,
    rateType: '',
    rate: 0,
    moveInLeadTime: 0,
    description: '',
    pictures: [],
  });
  const [isManaged, setIsManaged] = useState('');
  const [rateType, setRateType] = useState('');
  const [pin, setPin] = useState({lat: 0, lng: 0});
  const [zipCode, setZipCode] = useState<number>(0);
  const [numberOfRooms, setNumberOfRooms] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [isPropertyTypeError, setIsPropertyTypeError]=useState<boolean>(false);
  const [isCountryError, setIsCountryError] = useState<boolean>(false);
  const [isPinError, setIsPinError] = useState<boolean>(false);
  const [isCityError, setIsCityError] = useState<boolean>(false);
  const [isStateError, setIsStateError] = useState<boolean>(false);
  const [isZipCodeError, setIsZipCodeError] = useState<boolean>(false);
  const [isPropertyNameError, setIsPropertyNameError] = useState<boolean>(false);
  const [isManagedError, setIsManagedError] = useState<boolean>(false);
  const [isNumberOfRoomsError, setIsNumberOfRoomsError] = useState<boolean>(false);
  const [isRateTypeError, setIsRateTypeError] = useState<boolean>(false);
  const [isRateError, setIsRateError] = useState<boolean>(false);
  const [isMoveInError, setIsMoveInError] = useState<boolean>(false);
  const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false);
  const [isImagesError, setIsImagesError] = useState<boolean>(false);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const pictures = useAppSelector(selectPictures);
  const propertyData = useAppSelector(selectProperty)
  const uploadingPictures = useRef(false)
  const handleChange = (e: ChangeEvent)=>{
    let name = (e.target as HTMLInputElement | HTMLSelectElement).name;
    let value = (e.target as HTMLInputElement | HTMLSelectElement).value;
    setProperty({...property, [name]: value});
  }

  const onMapPinChange = (location: {latitude: number, longitude: number})=>{
    setPin({lat: location.latitude, lng: location.longitude})
  }

  const alertError = (message: string)=>{
    toast({
      title: 'Empty Field',
      description: message,
      status: 'error',
      duration: 3000,
      position: 'top',
      isClosable: true,
    })
  }
  const onContinueClick = ()=>{
    if(property.propertyType===''){
      setIsPropertyTypeError(true)
      alertError('Select a property type');
      return 
    }
    if(property.country===''){
      setIsCountryError(true)
      alertError('Select A country');
      return 
    }
    if(property.city===''){
      setIsCityError(true)
      alertError('Fill in City name');
      return 
    }
    if(property.state===''){
      setIsStateError(true)
      alertError('Select a state');
      return 
    }
    if(zipCode===0 ){
      setIsZipCodeError(true)
      alertError('Fill in Zip Code');
      return 
    }
    if(pin.lat===0 || pin.lng===0){
      setIsPinError(true);
      alertError('Pin property location on map')
      return
    }
    if(property.propertyName===''){
      setIsPropertyNameError(true)
      alertError('Fill in property name');
      return 
    }
    if(isManaged==='' ){
      setIsManagedError(true)
      alertError('Choose whether managed or not');
      return 
    }
    if(numberOfRooms===0 ){
      setIsNumberOfRoomsError(true)
      alertError('Fill in the number of rooms available');
      return 
    }
    if(rateType==='' ){
      setIsRateTypeError(true)
      alertError('Choose a rate type');
      return 
    }
    if(rate===0 ){
      setIsRateError(true)
      alertError('Fill in rate amount');
      return 
    }
    if(property.moveInLeadTime===0){
      setIsMoveInError(true);
      alertError('Select a Move In - lead time')
      return
    }
    if(property.description===''){
      setIsDescriptionError(true);
      alertError('Fill in a property description');
      return;
    }
    if(property.pictures.length<5){
      setIsImagesError(true);
      alertError('At least 5 images are required')
      return
    }
    dispatch(createProperty(property))
    handleContinueClick()
  }

  const onImagesUpload = (acceptedFiles: any[]) => {
    if (acceptedFiles.length<5){
      setIsImagesError(true);
      alertError('upload at least 5 images')
      return
    }
    acceptedFiles.forEach((file)=>{
      const blob_url = URL.createObjectURL(file);
      uploadingPictures.current=true;
      uploadToFirebase(blob_url, file.name, file.type).then((url)=>dispatch(setPictures(url)))
      .then(()=>{
        uploadingPictures.current=false;
      })
      .catch((error)=>{
        toast({
          title: 'Error',
          description: 'An error occured while uploading your images',
          status: 'error',
          duration: 5000,
          position: 'top'
        })
      })
    })
  }

  useEffect(()=>{
    setProperty({...property, isManaged: isManaged==='yes', rateType: rateType, longitude: pin.lng, latitude: pin.lat,})
  },[isManaged, rateType, pin, pictures])

  useEffect(()=>{
    pictures && setProperty({...property, pictures: pictures})
  }, [pictures])

  return (
    <Flex width={"full"} justify={"center"} direction={"column"} gap={"4"}>
      <Flex w={"70%"}>
      </Flex>
        <Flex gap={'6'} direction={'column'}>
          <FormControl isRequired isInvalid={isPropertyTypeError}>
            <FormLabel color={"black"} fontWeight={'700'}>Type Of Property</FormLabel>
            {isPropertyTypeError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <Select borderColor={"gray.400"} name="propertyType" onChange={handleChange} placeholder="Select Property Type">
              <option value={'hotel'}>hotel</option>
              <option value={'hotel'}>hostel</option>
            </Select>
          </FormControl>
          <FormControl isRequired isInvalid={isCountryError}>
            <FormLabel color={"black"} fontWeight={'700'}>Country</FormLabel>
            {isCountryError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <Select borderColor={"gray.400"} name="country" onChange={handleChange} placeholder="Select A Country">
              <option value={'kenya'}>kenya</option>
            </Select>
          </FormControl>
          <Flex width={"full"} gap={"4"}>
            <Flex direction={"column"} width={"full"}>
              <FormControl isRequired isInvalid={isCityError}>
                <FormLabel color={"black"} fontWeight={'700'}>City</FormLabel>
                {isCityError && <FormErrorMessage>This field is required</FormErrorMessage>}
                <Input type="text" borderColor={"gray.400"} name="city" onChange={handleChange}/>
              </FormControl>
            </Flex>
            <Flex direction={"column"} width={"full"}>
              <FormControl isRequired isInvalid={isStateError}>
                <FormLabel color={"black"} fontWeight={'700'}>State</FormLabel>
                {isStateError && <FormErrorMessage>This field is required</FormErrorMessage>}
                <Select borderColor={"gray.400"} name="state" onChange={handleChange} placeholder="Select A State">
                  <option value={'Kanairo'}>Kanairo</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex direction={"column"} width={"full"}>
              <FormControl isRequired isInvalid={isZipCodeError}>
                <FormLabel color={"black"} fontWeight={'700'} >Zip Code</FormLabel>
                {isZipCodeError && <FormErrorMessage>This field is required</FormErrorMessage>}
                <NumberInput borderColor={"gray.400"} onChange={(valueString)=>setZipCode(Number(valueString))}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </Flex>
          </Flex>
          <Flex direction={'column'} height={'600px'} pb={12}>
            <FormControl isRequired height={'full'} isInvalid={isPinError}>
              <FormLabel color={"black"} fontWeight={'700'}>Pin the location of your property</FormLabel>
              {isPinError && <FormErrorMessage>This field is required</FormErrorMessage>}
              <FormHelperText>[This is the location we&apos;ll show to guests on our site. Drag the map so the pin matches the exact location of your place]</FormHelperText>
              <ChooseLocation onChange={onMapPinChange} pin={pin}/>
            </FormControl>
          </Flex>
          <FormControl isRequired isInvalid={isPropertyNameError}>
            <FormLabel color={"black"} fontWeight={'700'}>Property Name</FormLabel>
            {isPropertyNameError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <Input type="text" borderColor={"gray.400"} name="propertyName" onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired isInvalid={isManagedError}>
            <FormLabel color={"black"} fontWeight={'700'}>
              Does this property work with a Property manager?
            </FormLabel>
            {isManagedError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <RadioGroup name="isManaged" onChange={setIsManaged}>
              <Stack>
                <Radio value="yes" colorScheme="red" borderColor={'red'} border={'1px'}>Yes</Radio>
                <Radio value="no" colorScheme="red" borderColor={'red'} border={'1px'}>No</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired isInvalid={isNumberOfRoomsError}>
            <FormLabel color={"black"} fontWeight={'700'}>Number Of Rooms/Units</FormLabel>
            {isNumberOfRoomsError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <NumberInput borderColor={"gray.400"} onChange={(valueString)=>setNumberOfRooms(Number(valueString))}>
                  <NumberInputField />
                </NumberInput>
          </FormControl>
          <FormControl isRequired isInvalid={isRateTypeError}>
            <FormLabel fontWeight={'700'}>Rate Type</FormLabel>
            {isRateTypeError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <RadioGroup name="rateType" onChange={setRateType}>
              <Stack>
                <Radio value="Nightly" colorScheme="red" borderColor={'red'} border={'1px'}>Nightly</Radio>
                <Radio value="Monthly" colorScheme="red" borderColor={'red'} border={'1px'}>Monthly</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired isInvalid={isRateError}>
            <FormLabel color={"black"} fontWeight={'700'}>How Much Do You Want To Charge Per {rateType}</FormLabel>
            {isRateError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <Flex border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} align={'center'} gap={'4'} h={'10'}>
              <Text pl={'4'} as={'b'}>KES</Text>
              <Flex h={'8'} w={'1px'} bg={'gray.400'}></Flex>
              <NumberInput borderColor={"gray.400"} onChange={(valueString)=>setRate(Number(valueString))} variant={'unstyled'} width={'full'}>
                <NumberInputField placeholder='Including Taxes, Commission and Charges' _placeholder={{color: '#6C757D', fontSize:'xs'}}/>
              </NumberInput>
            </Flex>
          </FormControl>
          <FormControl isRequired isInvalid={isMoveInError}>
            <FormLabel color={"black"} fontWeight={'700'}>Move In - Lead Time</FormLabel>
            {isMoveInError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <Select borderColor={"gray.400"} name="moveInLeadTime" placeholder="Minimum number of days in advance that a member can book the home for move-in." _placeholder={{fontSize: 'xs'}} onChange={handleChange}>
                <option value={'1232'}>2324</option>
            </Select>
          </FormControl>
          <FormControl isRequired isInvalid={isDescriptionError}>
            <FormLabel color={"black"} fontWeight={'700'}>Describe Your Property</FormLabel>
            {isDescriptionError && <FormErrorMessage>This field is required</FormErrorMessage>}
            <Textarea borderColor={'gray.400'} name="description" onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired isInvalid={isImagesError}>
            <FormLabel color={"black"} fontWeight={'700'}>Upload Photos Of Your Property And Amenities</FormLabel>
            {isImagesError && <FormErrorMessage>Images cannot be empty or less than select. Please select multiple</FormErrorMessage>}
            <FormHelperText>[Upload at least 5 photos of your property.]</FormHelperText>
            <Dropzone onDrop={onImagesUpload}>
              {({getRootProps, getInputProps}) => (
                <Flex >
                  <Flex 
                    border={'1px dashed'} 
                    borderColor={'gray.400'} 
                    borderRadius={'8px'} 
                    p={'14'} 
                    {...getRootProps({className: "dropzone",})} 
                    w={'full'} 
                    textAlign={'center'} 
                    {...FlexColCenterCenter}
                  >
                    <Input {...getInputProps({accept: "image/*"})} name="propertyImages"/>
                    <Text as='b'>Drop files here or <span style={{color: 'red'}}>browse</span></Text>
                  </Flex>
                </Flex>
              )}
            </Dropzone>
            <Flex gap={'4'}>
            {!isEmpty(pictures) && pictures?.map((picture:string, index: number)=>{
              return <Flex key={index}>{uploadingPictures.current? <Spinner/>:<Image src={picture} alt="property image" width={'200px'} height={'200px'} borderRadius={'16px'}/>}</Flex>
            })}
            </Flex>
          </FormControl>
            <Flex width={'full'} justify={'space-between'} mt={'6'}>
              <Button bg={'gray.300'} borderRadius={'30px'} width={'200px'} onClick={handleBackClick} disabled={current===0}>Back</Button>
              <Button type="submit" bg={'#BC2B3D'} color={'white'} borderRadius={'30px'} width={'200px'} _hover={{bg: 'red.800', color: 'white'}} onClick={onContinueClick}>Continue</Button>
            </Flex>
      </Flex>
    </Flex>
  );
};

export default ListYourProperty;
