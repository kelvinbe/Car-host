import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { Card, CardHeader, CardBody, Flex, Text, IconButton, Button } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { IFilterData } from "../PropertySearch/PropertySearch";

interface IProps{
    onClose: ()=> void;
    updateFilterData: (filterData: Partial<IFilterData>) => void;
    setGuests: (guests: number)=>void;
}
const GuestCount = (props: IProps) => {
  const {onClose, updateFilterData, setGuests} = props
  const [adults, setAdults] = useState<number>(1);
  const [kids, setKids] = useState<number>(0);
  const [pets, setPets] = useState<number>(0);

  useEffect(()=>{

  },[adults, kids, pets]); 

  const applyGuestsCount=()=>{
    updateFilterData({adults, kids, pets});
    setGuests(adults+kids+pets)
    onClose()
  }

  return (
    <Card width={"400px"} p={4} bg={"white"}>
      <CardHeader fontWeight={"600"}>Guests & Pets</CardHeader>
      <CardBody>
        <Flex direction={"column"} gap={'3'}>
          <Flex justify={'space-between'}>
                <Flex align={'center'}><Text>Adults</Text></Flex>
                <Flex gap={3} align={'center'} justify={'space-between'} width={'40'}>
                  <IconButton aria-label='bedrooms' icon={<MinusIcon />} bg={'gray.200'} onClick={()=>setAdults(adults=> adults-1)} disabled={adults===1}/>
                  <Text pt={'2'}>{adults}</Text>
                  <IconButton aria-label='bedrooms' icon={<AddIcon />} bg={'gray.200'} onClick={()=>setAdults(adults=> adults+1)}/>
                </Flex>
            </Flex>
            <Flex justify={'space-between'}>
                <Flex align={'center'}><Text>Kids</Text></Flex>
                <Flex gap={3} align={'center'} justify={'space-between'} width={'40'}>
                  <IconButton aria-label='bedrooms' icon={<MinusIcon />} bg={'gray.200'} onClick={()=>setKids(kids=> kids-1)} disabled={kids===0}/>
                  <Text pt={'2'}>{kids}</Text>
                  <IconButton aria-label='bedrooms' icon={<AddIcon />} bg={'gray.200'} onClick={()=>setKids(kids=> kids+1)}/>
                </Flex>
            </Flex>
            <Flex justify={'space-between'}>
                <Flex align={'center'}><Text>Pets</Text></Flex>
                <Flex gap={3} align={'center'} justify={'space-between'} width={'40'}>
                  <IconButton aria-label='bedrooms' icon={<MinusIcon />} bg={'gray.200'} onClick={()=>setPets(pets=> pets-1)} disabled={pets===0}/>
                  <Text pt={'2'}>{pets}</Text>
                  <IconButton aria-label='bedrooms' icon={<AddIcon />} bg={'gray.200'} onClick={()=>setPets(pets=> pets+1)}/>
                </Flex>
            </Flex>
        </Flex>
        <Button color={'white'} bg={'#BC2B3D'} w={'full'} justifyContent={'center'} mt={'10'} borderRadius={'30px'} onClick={applyGuestsCount} _hover={{bg: 'red.700'}}>Apply</Button>
      </CardBody>
    </Card>
  );
};

export default GuestCount;
