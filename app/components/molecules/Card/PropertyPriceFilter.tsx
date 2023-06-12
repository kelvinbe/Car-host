import {
  Flex,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  RadioGroup,
  Radio,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { IFilterData } from "../PropertySearch/PropertySearch";

interface IProps {
  updateFilterData: (filterData: Partial<IFilterData>) => void;
  onClose: ()=>void;
};

const PropertyPriceFilter = (props: IProps) => {
  const {updateFilterData, onClose} = props
  const [rateType, setRateType] = useState<string>("nightly");
  /**
   * @todo Update the default price range to be seacrh results min and max prices/rates once redux propertySlice is in place
   */
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]); 
  
  const applyPriceFilter = ()=>{
    updateFilterData({priceRange: priceRange, rateType: rateType});
    onClose()
  }

  return (
    <Card px={'6'}>
      <CardHeader>
        <Heading size="md">Price</Heading>
      </CardHeader>
      <CardBody pt={'0'}>
        <Stack>
          <Text fontWeight={'bold'}>Filter By: </Text>
          <RadioGroup value={rateType} onChange={setRateType} pt={'6'} pb={'6'}>
            <Stack fontWeight={'semibold'}>
              <Radio value="nightly" colorScheme={'red'} borderColor={'red.200'}>Nightly Price </Radio>
              <Radio value="monthly" colorScheme={'red'} borderColor={'red.200'}>Monthly Price </Radio>
              <Radio value="total" colorScheme={'red'} borderColor={'red.200'}>Total Price </Radio>
            </Stack>
          </RadioGroup>
          <Flex gap={'6'}>
            <Flex direction={'column'} border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} width={'40'} px={'3'} py={'1'} >
                <Text>Min</Text>
                <Text>$ {priceRange[0]}</Text>
            </Flex>
            <Flex align={'center'}><BsDashLg size={20}/></Flex>
            <Flex direction={'column'} border={'1px'} borderColor={'gray.400'} borderRadius={'8px'} width={'40'} px={'3'} py={'1'} >
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
          <Flex width={'full'}>
            <Button width={'full'} bg={'#BC2B3D'} color={'white'} fontWeight={'normal'} borderRadius={'3xl'} onClick={applyPriceFilter}>Done</Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PropertyPriceFilter;
