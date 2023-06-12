import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Button, Card, CardBody, CardHeader, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { SlLocationPin } from "react-icons/sl";

interface IProps{
    locations: string[];
    setLocation: (location: string)=>void;
    setIsLocationsVisible: (isLocationVisible: boolean) =>void;
}
const PropertyLocations = (props: IProps) => {
  const {locations, setLocation, setIsLocationsVisible} = props
  const handleLocationSelect = (location: string) => {
    setLocation(location);
    setIsLocationsVisible(false);
  };

  return (
    <Card width={['400px', '450px', '800px']} p={4} bg={'white'}>
        <CardHeader fontWeight={'600'}>Featured Cities</CardHeader>
      <CardBody>
        <Flex direction={'column'} maxHeight={[96]} overflowY={'scroll'} flexWrap={['nowrap','nowrap','wrap']}>
          {locations.map((location, index)=>(
            <Flex key={index} gap={'3'} p={'2'} align={'center'} borderRadius={'12px'} onClick={()=>handleLocationSelect(location)} _hover={{
                bg: 'red.300',
                color: 'white',
                cursor: 'pointer',
            }}>
                <SlLocationPin/>
                <Text pt={1.5}>{location}</Text>
            </Flex>
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PropertyLocations;
