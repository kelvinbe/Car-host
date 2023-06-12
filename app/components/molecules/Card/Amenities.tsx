import { Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IFilterData } from '../PropertySearch/PropertySearch';

interface IProps{
    amenities: string[];
    filterSearchResults: ()=>void;
    onClose: ()=>void;
    filterData: Partial<IFilterData>;
    setFilterData: (filterData: Partial<IFilterData>) => void;
}

const Amenities = (props: IProps) => {
  const {amenities, filterSearchResults, onClose, setFilterData, filterData} = props
  const [selectedAmenities, setSelectedAmenities] = useState<(string | number)[]>([])
  const toast = useToast()
  useEffect(()=>{
    setFilterData({...filterData, amenities: selectedAmenities})
  },[selectedAmenities])
  const handleClearAll = ()=>{
    setSelectedAmenities([]);
  }

  const applyFiltersClick=()=>{
    if(selectedAmenities.length === 0){
        toast({
          title: 'Amentities',  
          description: "Please select at least one amenity.",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position:'top',
        })
        return 
    }
    filterSearchResults();
    onClose();
  }

  return (
    <Card width={['400px', '450px', '600px']} p={4} bg={'white'}>
        <CardHeader fontWeight={'600'} pb={2}>Amenities</CardHeader>
      <CardBody>
        <CheckboxGroup colorScheme='green' value={selectedAmenities} onChange={setSelectedAmenities}>
            <Flex gap={[1, 3]} direction={'column'} h={'60'} flexWrap={'wrap'}>
                {amenities && amenities.map((amenity, index)=>(
                    <Checkbox key={index} value={amenity} colorScheme='red' size='lg' borderColor={'gray.500'}>{amenity}</Checkbox>
                ))}
            </Flex>
        </CheckboxGroup>
        <Flex>
        <Flex justify={'space-between'} py={'0'}  align={'center'} w={'full'}>
            <Button bg={'transparent'} textDecoration={'underline'} p={'0'} onClick={handleClearAll}>Clear All</Button>
            <Button color={'white'} bg={'#BC2B3D'} w={'100px'} justifyContent={'center'} borderRadius={'30px'} onClick={applyFiltersClick} _hover={{bg: 'red.700'}}>Apply</Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Amenities