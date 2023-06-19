import { CheckboxGroup, Flex, FormControl, FormLabel, RadioGroup, Checkbox, Radio, Stack, Button, FormHelperText, useToast, FormErrorMessage } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import BadgeSelect from '../../../molecules/BadgeSelect/BadgeSelect';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { IPServices, createPropertyServices, selectPropertyServices } from '../../../../redux/propertyServicesSlice';

interface IProps{
  handleBackClick: ()=>void;
  handleContinueClick: ()=> void;
}
const languages = ['English', 'Swahili', 'French', 'German', 'Spanish', 'Igbo', 'Banyala', 'Swazi', 'English', 'Swahili', 'French', 'German', 'Spanish', 'Igbo', 'Banyala', 'Swazi'];
const mealss = [
  {
    name: 'Pepperoni',
    selected: false,
  },
  {
    name: 'Margherita',
    selected: false,
  },
  {
    name: 'BBQ',
    selected: false,
  },
  {
    name: 'Hawaiian',
    selected: false,
  },
  {
    name: 'Vegetarian',
    selected: false,
  },
  {
    name: 'Mushroom',
    selected: false,
  },
  {
    name: 'Supreme',
    selected: false,
  },
  {
    name: 'Cheese',
    selected: false,
  },
  {
    name: 'Spinach',
    selected: false,
  },
  {
    name: 'Buffalo Chicken',
    selected: false,
  },
];
const ListYourPropertyServices = (props: IProps) => {
  const {handleBackClick, handleContinueClick} = props;
  const {push}=useRouter()
  const [propertyServices, setPropertyServices] = useState<IPServices>({
      mealsAvailable: false,
      mealsIncludedInPricePaid: false,
      mealsOffered: [],
      languages: [],
  });
  const [isMealsServed, setIsMealsServed] = useState<string>('no');
  const [isPriceIncludeMeals, setIsPriceIncludeMeals] = useState('no');
  const [servedMeals, setServedMeals] = useState<{name: string, selected: boolean}[]>([])
  const [mealsOfferedError, setMealsOfferedError]=useState(false);
  const [langaugesUsed, setLanguagesUsed] = useState<(string | number)[]>([]);
  const [languageError, setLanguageError] = useState(false);
  const [meals, setMeals] = useState<{name: string, selected: boolean}[]>(mealss);
  
  const toast = useToast();
  const services = useAppSelector(selectPropertyServices)
  const dispatch = useAppDispatch()
  const onContinueClick = ()=>{
    if(isMealsServed==='yes' && isPriceIncludeMeals=='yes' && servedMeals.length===0){
     setMealsOfferedError(true);
     toast({
      title: 'Empty Field',
      description:'Please select meals',
      position: 'top',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
      return 
    }

    if(langaugesUsed.length===0){
      setLanguageError(true);
      toast({
       title: 'Empty Field',
       description:'Please select at least a language',
       position: 'top',
       status: 'error',
       duration: 3000,
       isClosable: true,
     })
       return
    }
    dispatch(createPropertyServices(propertyServices))
    handleContinueClick();
    push('/properties/home-page')
  }

  useEffect(()=>{
    const mealsOffered = servedMeals.map(meal=>meal.name)
    setPropertyServices({...propertyServices, mealsAvailable: isMealsServed==='yes', mealsIncludedInPricePaid: isPriceIncludeMeals==='yes', mealsOffered, languages: langaugesUsed});
  },[servedMeals, isMealsServed, isPriceIncludeMeals, langaugesUsed]);

  console.log(services)
  return (
    <Flex direction={'column'} gap={'6'}>
        <FormControl>
            <FormLabel fontWeight={'700'}>Do You Serve Guests Meals?</FormLabel>
            <RadioGroup onChange={setIsMealsServed}>
                <Stack>
                  <Radio value={'yes'} colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Yes</Radio>
                  <Radio value={'no'} colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>No</Radio>
                </Stack>
            </RadioGroup>
        </FormControl>
        {isMealsServed==='yes'&& 
        <FormControl>
            <FormLabel fontWeight={'700'}>Are Meals Included In The Price Guests Pay?</FormLabel>
            <RadioGroup onChange={setIsPriceIncludeMeals}>
                <Stack>
                  <Radio value={'yes'} colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>Yes, they&apos;re Included</Radio>
                  <Radio value={'no'} colorScheme="red" borderColor={'red'} border={'1px'} size={'lg'}>No,they&apos;re Not</Radio>
                </Stack>
            </RadioGroup>
        </FormControl>}
        {isMealsServed==='yes' && 
        <FormControl isRequired isInvalid={mealsOfferedError}>
            <FormLabel fontWeight={'700'}>What type of meals do you offer?</FormLabel>
            <FormHelperText>Select all that apply</FormHelperText>
            <BadgeSelect data={meals} selectedData={servedMeals} setSelectedData={setServedMeals} setData={setMeals}/>
            {mealsOfferedError && <FormErrorMessage>Select at least one meal.</FormErrorMessage>}
        </FormControl> }
        <FormControl isInvalid={languageError}>
            <FormLabel fontWeight={'700'}>What Language Do You Or Your Staffs Speak?</FormLabel>
            <CheckboxGroup colorScheme='green' value={langaugesUsed} onChange={setLanguagesUsed}>
              <Flex gap={[1, 3]} direction={'column'} h={'40'} flexWrap={['nowrap','nowrap','wrap']} overflow={'scroll'}>
                  {languages && languages.map((language, index)=>(
                      <Checkbox key={index} value={language} colorScheme='red' size='lg' borderColor={'gray.500'}>{language}</Checkbox>
                  ))}
              </Flex>
            </CheckboxGroup>
            {languageError && <FormErrorMessage>Select at least one language.</FormErrorMessage>}
        </FormControl>
        <Flex width={'full'} justify={'space-between'} mt={'6'}>
        <Button bg={'gray.300'} borderRadius={'30px'} width={'200px'} onClick={handleBackClick}>Back</Button>
        <Button type="submit" bg={'#BC2B3D'} color={'white'} borderRadius={'30px'} width={'200px'} _hover={{bg: 'red.800', color: 'white'}} onClick={onContinueClick}>Continue</Button>
      </Flex>
    </Flex>
  )
}

export default ListYourPropertyServices