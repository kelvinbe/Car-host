import { Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import PropertyCard, { IPropertyProps } from '../../molecules/Card/PropertyCard'
import PropertyListMap from '../Maps/PropertyListMap/PropertyListMap'
import property1 from '../../../public/images/propertyImage1.png';
import property2 from '../../../public/images/propertyImage2.png';
import property3 from '../../../public/images/propertyImage3.png';
import property4 from '../../../public/images/propertyImage4.png';
import property5 from '../../../public/images/propertyImage5.png';
import property6 from '../../../public/images/propertyImage6.png';
import property7 from '../../../public/images/propertyImage7.png';
import property8 from '../../../public/images/propertyImage8.png';
import property9 from '../../../public/images/propertyImage9.png';
import property10 from '../../../public/images/propertyImage10.png';

const properties = [
  {
    propertyName: 'Broiston Apartments',
    location: {
        state: 'Cleverland',
        city: 'Washington',
        latitude: 3,
        longitude: 5
    },
    beds: 3,
    baths: 4,
    size: 1234,
    rate: 130,
    booking: {
        availableDate: new Date(),
        checkIn: new Date(),
        checkout: new Date(),
    },
    images: [
      property1.src, 
      property2.src,
      property3.src,
      property4.src,
    ],
    summary: '1 BR In Bristol With Tons Of Amenities',
    
},
{
  propertyName: 'Broiston Apartments',
  location: {
      state: 'Cleverland',
      city: 'Washington',
      latitude: 3,
      longitude: 5
  },
  beds: 3,
  baths: 4,
  size: 1234,
  rate: 130,
  booking: {
      availableDate: new Date(),
      checkIn: new Date(),
      checkout: new Date(),
  },
  images: [
    property2.src, 
    property3.src,
    property1.src,
    property4.src,
  ],
  summary: '1 BR In Bristol With Tons Of Amenities',
  
},
{
  propertyName: 'Broiston Apartments',
  location: {
      state: 'Cleverland',
      city: 'Washington',
      latitude: 3,
      longitude: 5
  },
  beds: 3,
  baths: 4,
  size: 1234,
  rate: 130,
  booking: {
      availableDate: new Date(),
      checkIn: new Date(),
      checkout: new Date(),
  },
  images: [
    property3.src, 
    property7.src,
    property8.src,
    property2.src,
  ],
  summary: '1 BR In Bristol With Tons Of Amenities',
  
},
{
  propertyName: 'Broiston Apartments',
  location: {
      state: 'Cleverland',
      city: 'Washington',
      latitude: 3,
      longitude: 5
  },
  beds: 3,
  baths: 4,
  size: 1234,
  rate: 130,
  booking: {
      availableDate: new Date(),
      checkIn: new Date(),
      checkout: new Date(),
  },
  images: [
    property4.src, 
    property5.src,
    property9.src,
    property7.src,
  ],
  summary: '1 BR In Bristol With Tons Of Amenities',
  
},
{
  propertyName: 'Broiston Apartments',
  location: {
      state: 'Cleverland',
      city: 'Washington',
      latitude: 3,
      longitude: 5
  },
  beds: 3,
  baths: 4,
  size: 1234,
  rate: 130,
  booking: {
      availableDate: new Date(),
      checkIn: new Date(),
      checkout: new Date(),
  },
  images: [
    property5.src, 
    property2.src,
    property3.src,
    property4.src,
  ],
  summary: '1 BR In Bristol With Tons Of Amenities',
  
},
{
propertyName: 'Broiston Apartments',
location: {
    state: 'Cleverland',
    city: 'Washington',
    latitude: 3,
    longitude: 5
},
beds: 3,
baths: 4,
size: 1234,
rate: 130,
booking: {
    availableDate: new Date(),
    checkIn: new Date(),
    checkout: new Date(),
},
images: [
  property6.src, 
  property3.src,
  property1.src,
  property4.src,
],
summary: '1 BR In Bristol With Tons Of Amenities',

},
{
propertyName: 'Broiston Apartments',
location: {
    state: 'Cleverland',
    city: 'Washington',
    latitude: 3,
    longitude: 5
},
beds: 3,
baths: 4,
size: 1234,
rate: 130,
booking: {
    availableDate: new Date(),
    checkIn: new Date(),
    checkout: new Date(),
},
images: [
  property7.src, 
  property3.src,
  property8.src,
  property2.src,
],
summary: '1 BR In Bristol With Tons Of Amenities',

},
{
propertyName: 'Broiston Apartments',
location: {
    state: 'Cleverland',
    city: 'Washington',
    latitude: 3,
    longitude: 5
},
beds: 3,
baths: 4,
size: 1234,
rate: 130,
booking: {
    availableDate: new Date(),
    checkIn: new Date(),
    checkout: new Date(),
},
images: [
  property8.src, 
  property5.src,
  property9.src,
  property7.src,
],
summary: '1 BR In Bristol With Tons Of Amenities',

}
,
{
propertyName: 'Broiston Apartments',
location: {
    state: 'Cleverland',
    city: 'Washington',
    latitude: 3,
    longitude: 5
},
beds: 3,
baths: 4,
size: 1234,
rate: 130,
booking: {
    availableDate: new Date(),
    checkIn: new Date(),
    checkout: new Date(),
},
images: [
  property9.src, 
  property7.src,
  property8.src,
  property2.src,
],
summary: '1 BR In Bristol With Tons Of Amenities',

},
{
propertyName: 'Broiston Apartments',
location: {
    state: 'Cleverland',
    city: 'Washington',
    latitude: 3,
    longitude: 5
},
beds: 3,
baths: 4,
size: 1234,
rate: 130,
booking: {
    availableDate: new Date(),
    checkIn: new Date(),
    checkout: new Date(),
},
images: [
  property10.src, 
  property5.src,
  property9.src,
  property7.src,
],
summary: '1 BR In Bristol With Tons Of Amenities',

}
]

const Properties = () => {
  return (
    <Flex w={'full'} paddingTop={'8'} direction={{sm:'column', md: 'column', lg: 'row', xl: 'row'}} gap={'6'}>
        <Flex gap={'0'} width={{sm: 'full', md: 'full', lg:'55%', xl:'55%'}}  align={{sm: 'center', md: 'center', lg: 'left', xl:'left'}} justify={'center'} flexWrap={'wrap'}>
          <Grid gridTemplateColumns={['auto','auto','auto auto']} gap={'8'}>
          {properties.map((property, index)=>{
            return <PropertyCard key={index} property={property}/>
          })}
          </Grid>
        </Flex>
        <Flex width={{sm: 'full', md: 'full', lg:'45%', xl:'45%'}} justify={'left'}>
          <PropertyListMap />
        </Flex>
        
    </Flex>
  )
}

export default Properties
