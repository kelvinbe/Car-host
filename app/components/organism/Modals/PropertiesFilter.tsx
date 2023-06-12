import React, { useEffect, useState } from 'react'
import ModalTemplate from './ModalTemplate'
import { Button, Checkbox, CheckboxGroup, Divider, Flex, Heading, IconButton, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from '@chakra-ui/react';
import { BsDashLg } from 'react-icons/bs';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IFilterData } from '../../molecules/PropertySearch/PropertySearch';

interface IProps {
    isOpen: boolean;
    onClose: ()=> void;
    amenities?: string[];
    filterData: Partial<IFilterData>;
    setFilterData: (filterData: Partial<IFilterData>) => void;
    filterResultsNumber?: number;
    filterSearchResults: ()=>void;
}
const PropertiesFilter = (props: IProps) => {
  const {isOpen, onClose, amenities, filterData, setFilterData, filterResultsNumber, filterSearchResults} = props;
  const [rateType, setRateType] = useState<string>("nightly");
  /**
   * @todo Update the default price range to be seacrh results min and max prices/rates once redux propertySlice is in place
   */
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]); 
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [beds, setBeds] = useState<number>(1);
  const [baths, setBaths] = useState<number>(1);
  const [amenitiesAndFeatures, setAmenitiesAndFeatures] = useState<(string | number)[]>([]);

  const handleClearAll = ()=>{
    setPriceRange([0, 0])
    setAmenitiesAndFeatures([]);
    setBaths(1)
    setBeds(1)
    setBedrooms(1)
  }

  useEffect(()=>{
    setFilterData({...filterData, rateType: rateType, priceRange: priceRange, bedrooms: bedrooms, baths: baths, beds: beds, amenities: amenitiesAndFeatures}
    )
  },[baths, bedrooms, amenitiesAndFeatures, beds, rateType, priceRange]);
  return (
    <ModalTemplate isOpen={isOpen} onClose={onClose} modalSize='4xl'>
        <Flex direction={'column'} px={4} gap={'4'}>
          <Flex h={'10'}  align={'center'}>
            <Heading size={'md'}>Filters</Heading>
          </Flex> 
          <Divider orientation='horizontal' borderColor="gray.500"/>
          <Flex>
            <Stack w={'full'}>
                <Text fontWeight={'bold'}>Price</Text>
                <RadioGroup value={rateType} onChange={setRateType} pt={'6'} pb={'6'}>
                    <Stack fontWeight={'semibold'}>
                    <Radio value="nightly" colorScheme={'red'} borderColor={'red.200'}>Nightly Price </Radio>
                    <Radio value="monthly" colorScheme={'red'} borderColor={'red.200'}>Monthly Price </Radio>
                    <Radio value="total" colorScheme={'red'} borderColor={'red.200'}>Total Price </Radio>
                    </Stack>
                </RadioGroup>
                <Flex gap={'6'} justify={'space-between'}>
                    <Flex direction={'column'} border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} width={'60'} px={'3'} py={'1'} >
                        <Text>Min</Text>
                        <Text>$ {priceRange[0]}</Text>
                    </Flex>
                    <Flex align={'center'} justify={'center'}><BsDashLg size={20}/></Flex>
                    <Flex direction={'column'} border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} width={'60'} px={'3'} py={'1'} >
                        <Text>Max</Text>
                        <Text>$ {priceRange[1]}</Text>
                    </Flex>
                </Flex>
                <Flex>
                    <RangeSlider
                        // eslint-disable-next-line jsx-a11y/aria-proptypes
                        aria-label={['min', 'max']}
                        defaultValue={priceRange}
                        minH='16'
                        onChange={setPriceRange}
                    >
                      <RangeSliderTrack bg='red.100' >
                        <RangeSliderFilledTrack bg={'red.500'}/>
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} border={'1px'} borderColor={'red.500'}/>
                      <RangeSliderThumb index={1} border={'1px'} borderColor={'red.500'}/>
                    </RangeSlider>
                </Flex>
            </Stack>
          </Flex>
          <Divider orientation='horizontal' borderColor="gray.800"/>
          <Flex direction={'column'} gap={'3'}>
            <Text fontWeight={'bold'}>Rooms & Spaces</Text>
            <Flex justify={'space-between'}>
                <Flex align={'center'}><Text>Any Bedrooms</Text></Flex>
                <Flex border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} gap={3} align={'center'} justify={'space-between'} width={'48'}>
                  <IconButton aria-label='bedrooms' icon={<MinusIcon />} bg={'transparent'} onClick={()=>setBedrooms(bedrooms=> bedrooms - 1)} disabled={bedrooms===1}/>
                  <Text pt={'2'}>{bedrooms}</Text>
                  <IconButton aria-label='bedrooms' icon={<AddIcon />} bg={'transparent'} onClick={()=>setBedrooms(bedrooms=> bedrooms + 1)}/>
                </Flex>
            </Flex>
            <Flex justify={'space-between'}>
                <Flex align={'center'}><Text>Any Baths</Text></Flex>
                <Flex border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} gap={3} align={'center'} justify={'space-between'} width={'48'}>
                  <IconButton aria-label='bedrooms' icon={<MinusIcon />} bg={'transparent'} onClick={()=>setBaths(baths=> baths - 1)} disabled={baths===1}/>
                  <Text pt={'2'}>{baths}</Text>
                  <IconButton aria-label='bedrooms' icon={<AddIcon />} bg={'transparent'} onClick={()=>setBaths(baths=> baths + 1)}/>
                </Flex>
            </Flex>
            <Flex justify={'space-between'}>
                <Flex align={'center'}><Text>Any Beds</Text></Flex>
                <Flex border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} gap={3} align={'center'} justify={'space-between'} width={'48'}>
                  <IconButton aria-label='bedrooms' icon={<MinusIcon />} bg={'transparent'} onClick={()=>setBeds(beds=> beds - 1)} disabled={beds===1}/>
                  <Text pt={'2'}>{beds}</Text>
                  <IconButton aria-label='bedrooms' icon={<AddIcon />} bg={'transparent'} onClick={()=>setBeds(beds=> beds + 1)}/>
                </Flex>
            </Flex>
          </Flex>
          <Divider orientation='horizontal' borderColor="gray.900"/>
          <Flex direction={'column'} gap={'3'}>
            <Text fontWeight={'bold'}>Features and Amenities</Text>
            <CheckboxGroup colorScheme='green' value={amenitiesAndFeatures} onChange={setAmenitiesAndFeatures}>
              <Flex gap={[1, 3]} direction={'column'} h={'40'} flexWrap={'wrap'}>
                {amenities && amenities.map((amenity, index)=>(
                    <Checkbox key={index} value={amenity} colorScheme='red' size='lg' borderColor={'gray.500'}>{amenity}</Checkbox>
                ))}
              </Flex>
            </CheckboxGroup>
          </Flex>
          <Divider orientation='horizontal' borderColor="gray.500"/>
          <Flex justify={'space-between'} py={'5'}  align={'center'}>
            <Button bg={'transparent'} textDecoration={'underline'} p={'0'} onClick={handleClearAll}>Clear All</Button>
            <Button 
              color={'white'} 
              bg={'#BC2B3D'} 
              width={'300px'} 
              justifyContent={'center'} 
              borderRadius={'30px'} 
              onClick={filterSearchResults}
              _hover={{bg: 'red.700'}}
              >
                Show {filterResultsNumber ? filterResultsNumber: 0} places
              </Button>
          </Flex>    
        </Flex>
    </ModalTemplate>
  )
}

export default PropertiesFilter