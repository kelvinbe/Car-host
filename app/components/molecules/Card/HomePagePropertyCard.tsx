import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'

interface IProps{
    property: {
        title: string;
        image: string;
        description: string;
    }
}
const HomePagePropertyCard = (props: IProps) => {
  const {property}=props
  return (
    <Flex width={['470px', '470px', '470px', '330px']} borderRadius={'10px'} direction={'column'} gap={'4'} m={'6'}>
        <Image src={property.image} alt={property.title}/>
        <Heading size={'md'}>{property.title}</Heading>
        <Text>{property.description}</Text>
    </Flex>
  )
}

export default HomePagePropertyCard