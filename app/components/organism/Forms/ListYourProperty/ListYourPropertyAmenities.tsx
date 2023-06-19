import { CheckboxGroup, Checkbox, Flex, Text, FormControl, FormLabel, Radio, RadioGroup, Stack, Select, Button, Input, Divider, useToast, FormErrorMessage } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { IAmenities, createPropertyAmenities, selectAmenities } from "../../../../redux/propertyAmenitiesSlice";

interface IProps{
  handleBackClick: ()=>void;
  handleContinueClick: ()=> void;
}
const availableAmeties: string[] = [
      "Swimming Pool",
      "Gym",
      "Air Conditioning",
      "Breakfast Included",
      "Parking",
      "Spa",
      "Restaurant",
      "Room Service",
      "Laundry Service",
      "Pet-friendly",
      "Beach Access",
      "Tennis Court",
      "BBQ Facilities",
      "Bicycle Rental",
      "Concierge Service",
      "Kids Club",
      "Conference Facilities",
      "Airport Shuttle",
      "24-hour Front Desk",]

const ListYourPropertyAmenities = (props: IProps) => {
  const {handleBackClick, handleContinueClick} = props
  const [amenities, setAmenities] = useState<IAmenities>({
    amenities: [],
    parkingAvailable: false,
    parkingRateType: '',
    parkingReservationNeed: false,
    parkingRate: 0,
    petsAvailable: false,
    petsAccepted: false,
    smokingAllowed: true,
    parkingType: '',
  })
  const [amenitiesAndFeatures, setAmenitiesAndFeatures] = useState<(string|number)[]>([]);
  const [parkingType, setparkingType] = useState<string>('');
  const [parkingReservationNeed, setParkingReservationNeeded] = useState<string>('no');
  const [petsAvailable, setPetsAvailable] = useState<string>('no');
  const [acceptPets, setAcceptPets] = useState<string>('no');
  const [smokingAllowed, setSmokingAllowed] = useState<string>('yes');
  const [isAmenitiesError, setIsAmenitiesError] = useState<boolean>(false);
  const [isParkingAvailable, setIsParkingAvailable] = useState<string>('');
  const [isParkingAvailableError, setIsParkingAvailableError] = useState<boolean>(false);  
  const [isParkingTypeError, setIsParkingTypeError] = useState<boolean>(false);
  const [parkingRateError, setIsParkingRateError] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const propertyAmenities = useAppSelector(selectAmenities)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    let name = e.target.name;
    let value = e.target.value;
    setAmenities({...amenities, [name]: value});
  }
  const errorAlert = (message: string)=>{
    toast({
      title: 'Empty Field',
      description:message,
      position: 'top',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }
  const onContinueClick = ()=>{
    if(isParkingAvailable===''){
      setIsParkingAvailableError(true);
      setIsError(true)
      errorAlert('Please select if parking is available or not');
      return 
    } 
    if(amenitiesAndFeatures.length===0){
      setIsAmenitiesError(true);
      setIsError(true)
      errorAlert('Please select at least one amenity')
      return 
    } 
    if( (isParkingAvailable==='paid' || isParkingAvailable==='free') && parkingType===''){
      setIsParkingTypeError(true);
      setIsError(true)
      errorAlert('Please select parking type')
      return 
    } 
    if(isParkingAvailable==='paid' && ((amenities?.parkingRate===0) )){
      setIsParkingRateError(true);
      setIsError(true)
      errorAlert('Please fill in amount and select rate')
      return 
    } 
    dispatch(createPropertyAmenities(amenities))
    handleContinueClick()
  };

  useEffect(()=>{
    setAmenities({
      ...amenities, 
      amenities: amenitiesAndFeatures, 
      parkingAvailable: isParkingAvailable==='yes', 
      parkingReservationNeed: parkingReservationNeed==='yes', 
      parkingType, 
      petsAvailable: petsAvailable==='yes', 
      petsAccepted: acceptPets==='yes',
      smokingAllowed: smokingAllowed==='yes'
    })
  },[amenitiesAndFeatures, isParkingAvailable, parkingReservationNeed, parkingType, petsAvailable, acceptPets, smokingAllowed]);

  return (
    <Flex direction={'column'}>
      <FormControl isRequired isInvalid={isAmenitiesError}>
        <FormLabel fontWeight={'700'}>Property Amenities</FormLabel>
        {isAmenitiesError && <FormErrorMessage>Select at least one amenity</FormErrorMessage>}
        <CheckboxGroup colorScheme='green' value={amenitiesAndFeatures} onChange={setAmenitiesAndFeatures}>
            <Flex gap={[1, 3]} direction={'column'} h={'80'} flexWrap={['nowrap','nowrap','wrap']} overflow={'scroll'}>
                {availableAmeties && availableAmeties.map((amenity, index)=>(
                    <Checkbox key={index} value={amenity} colorScheme='red' size='lg' borderColor={'gray.500'}>{amenity}</Checkbox>
                ))}
            </Flex>
        </CheckboxGroup>
      </FormControl>
      <FormControl isRequired isInvalid={isParkingAvailableError}>
        <FormLabel fontWeight={'700'}>Is Parking Available To Your Guests?</FormLabel>
        {isParkingAvailableError && <FormErrorMessage>This field is required</FormErrorMessage>}
        <RadioGroup mb={'6'} name="isParkingAvailbale" onChange={setIsParkingAvailable} value={isParkingAvailable}>
          <Stack>
            <Radio value="free" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Yes, free</Radio>
            <Radio value="paid" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Yes, paid</Radio>
            <Radio value="no" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>No</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {isParkingAvailable==='free' || isParkingAvailable==='paid' ? (
        <FormControl isRequired isInvalid={isParkingTypeError}>
        <FormLabel fontWeight={'700'}>What Type Of Parking Is Available?</FormLabel>
        <RadioGroup mb={'6'} name="parkingType" onChange={setparkingType} value={parkingType}>
          <Stack>
            <Radio value="open" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Open Parking</Radio>
            <Radio value="reserved" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Reserved Slot</Radio>
          </Stack>
        </RadioGroup>
        {isParkingTypeError && <FormErrorMessage>This field is required</FormErrorMessage>}
      </FormControl>
      ): null}

      {isParkingAvailable==='paid' ? (
        <FormControl isInvalid={parkingRateError} isRequired>
          {parkingRateError && <FormErrorMessage>This field is required</FormErrorMessage>}
          <FormLabel fontWeight={'700'}>How much does parking cost?</FormLabel>
        <Flex border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} align={'center'} gap={'4'} width={'400px'}>
            <Text pl={'4'}>KES</Text>
            <Flex h={'8'} w={'1px'} bg={'gray.400'}></Flex>
            <Input variant={'unstyled'} type="number" name="parkingRate" onChange={handleChange} />
            <Divider orientation='vertical' h={'10'} bgColor={'gray.400'} colorScheme="red" width={'4px'} fontWeight={'400px'}/>
            <Select variant={'unstyled'} name="parkingRateType" onChange={handleChange} placeholder="Select Parking Rate">
                <option value={'hourly'} >Per Hour</option>
                <option value={'daily'}>Per Day</option>
                <option value={'weekly'}>Per Week</option>
                <option value={'monthly'}>Per Month</option>
            </Select>
        </Flex>
        </FormControl>
      ):null}

      {(isParkingAvailable==='free' || isParkingAvailable==='paid') && parkingType==='reserved' ? (
        <FormControl>
        <FormLabel fontWeight={'700'}>Do They Need To Reserve A Parking Spot?</FormLabel>
        <RadioGroup mb={'6'} name="parkingReservationNeed" onChange={setParkingReservationNeeded} value={parkingReservationNeed}>
          <Stack>
            <Radio value="yes" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Reservation Needed</Radio>
            <Radio value="no" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>No Reservation Needed</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      ): null}

      <FormControl>
        <FormLabel fontWeight={'700'}>Do You Have Pets?</FormLabel>
        <RadioGroup mb={'6'} name="petsAvailable" onChange={setPetsAvailable} value={petsAvailable}>
          <Stack>
            <Radio value="yes" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Yes</Radio>
            <Radio value="no" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>No</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight={'700'}>Do You Accept Pets?</FormLabel>
        <RadioGroup mb={'6'} name="acceptPets" onChange={setAcceptPets} value={acceptPets}>
          <Stack>
            <Radio value="yes" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Yes</Radio>
            <Radio value="no" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>No</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight={'700'}>Do You Allow Smoking?</FormLabel>
        <RadioGroup mb={'6'} name="smokingAllowed" onChange={setSmokingAllowed} value={smokingAllowed}>
          <Stack>
            <Radio value="yes" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Yes</Radio>
            <Radio value="no" colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>No</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Flex width={'full'} justify={'space-between'} mt={'6'}>
        <Button bg={'gray.300'} borderRadius={'30px'} width={'200px'} onClick={handleBackClick}>Back</Button>
        <Button type="submit" bg={'#BC2B3D'} color={'white'} borderRadius={'30px'} width={'200px'} _hover={{bg: 'red.800', color: 'white'}} onClick={onContinueClick}>Continue</Button>
      </Flex>
    </Flex>
  );
};

export default ListYourPropertyAmenities;
