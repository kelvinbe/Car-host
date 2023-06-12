import React, { ReactNode } from 'react'
import { Flex, Box, Text, VStack, SimpleGrid, Button } from '@chakra-ui/react'


interface IPropertyAmenitiesList {
  propertyAmenities: {icon: ReactNode; amenity: string}[];
  viewAllAmenities: boolean
}


const PropertyAmenitiesList = (props: IPropertyAmenitiesList) => {

    const {propertyAmenities, viewAllAmenities} = props

  return (
    <Flex direction={'column'} data-testid='PropertyAmenitiesList'>
        <Text fontSize='2xl' fontWeight={'semibold'}>Property Amenities</Text>
        <Flex marginTop={5}>
        <SimpleGrid columns={[2, null, 3]} marginLeft={'-54px'}>
      {propertyAmenities.map((property, index) => {
        return <VStack key={index} marginBottom={5} spacing='150px' width={'300px'}>
          <Flex width={'190px'} alignItems={'center'}  justifyContent={'space-between'}>
          <Box>
      {property.icon}
        </Box>
        <Box width={'149px'} paddingRight={8}>
        {property.amenity}
        </Box>
        </Flex>
        </VStack>
      })}
        </SimpleGrid>

        </Flex>
    </Flex>
  )
}

export default PropertyAmenitiesList