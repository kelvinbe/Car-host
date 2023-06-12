import React, { ReactNode, useState } from 'react'
import PropertyAmenitiesCard from '../../atoms/PropertyAmenitiesCard/PropertyAmenitiesCard'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import PropertyAmenitiesList from '../../molecules/PropertyAmenitiesList/PropertyAmenitiesList'

interface IBookingProperty {
    bookingProperty: {
        propertyHousingDetails: {features: string, housingType: string, icons: ReactNode}[],
        propertyInfo: string,
        propertyAmenities: {icon: ReactNode, amenity: string}[]
    }
}


const PropertyAmenities = (props: IBookingProperty) => {
    const [viewAllAmenities, setViewAllAmenities] = useState(false)
    const {bookingProperty} = props

    return (
    <Flex marginTop={['10']} data-testid='PropertyAmenities'>
        <Flex>
            <Flex direction={'column'}>
                <Box display={'flex'} marginLeft={'-79px'}>
        {bookingProperty?.propertyHousingDetails.map((property, index) => {
            return <PropertyAmenitiesCard key={index}   features={property.features} housingType={property.housingType} icon={property.icons} />
        })}
        </Box>
        <Flex marginTop={7}>
            <Text w={'3xl'} fontSize={'md'} fontWeight={'light'}>
            {bookingProperty?.propertyInfo}
            </Text>
        </Flex>
        <Flex>
            <PropertyAmenitiesList viewAllAmenities={viewAllAmenities} propertyAmenities={bookingProperty.propertyAmenities}   />
        </Flex>
        <Flex>
        <Button borderColor={'#2F68B1'} fontSize={10} marginBottom={10} colorScheme='#2F68B1' size='sm' variant='outline' onClick={() => setViewAllAmenities(true)}>
          View All Amenities
          </Button>
        </Flex>
        </Flex>
</Flex>
</Flex>
)}

export default PropertyAmenities