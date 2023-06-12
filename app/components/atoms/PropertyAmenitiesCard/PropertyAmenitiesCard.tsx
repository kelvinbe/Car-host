import { Box, Flex ,Card, CardHeader, CardBody, CardFooter, Text }  from '@chakra-ui/react'
import React, { ReactNode } from 'react'



interface IPropertyAmenitiesCard {
  features: string;
  icon: ReactNode;
  housingType: string
}


const  PropertyAmenitiesCard = (props: IPropertyAmenitiesCard) => {
  const {features, icon, housingType} = props
  return (
    <Flex data-testid="PropertyAmenitiesCard">
      <Card
      borderColor={'black'}
      border={'1px'}
      color='black.500'
      letterSpacing='wide'
      fontSize='md'
      textTransform='capitalize'
      w={200}
      ml={20}
      padding={3}>
        <CardBody>
        <Flex direction={'column'} justifyContent={'center'}>
        <Text display={'flex'} justifyContent={'center'} marginBottom={4}>
        {housingType}
        </Text>
        <Flex direction={'row'} gap='10px' display={'flex'} justifyContent={'center'}>
        <Box marginTop={1} >
        {icon}
        </Box>
        <Box>
        {features}
        </Box>
        </Flex>
          </Flex>
        </ CardBody>
      </Card>
    </Flex>
  )
}

export default PropertyAmenitiesCard