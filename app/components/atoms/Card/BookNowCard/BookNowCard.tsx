import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Stack, Text, } from '@chakra-ui/react'
import React from 'react'
import {TbCircleCheck} from 'react-icons/tb'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { StarIcon } from '@chakra-ui/icons';

interface IBookNowCard {
  price: string;
  ratings: number;
  dates: string;
  total: number;
  reviews: number;
  amenities: string;
  onClick?: () => void
}

const BookNowCard = (props: IBookNowCard) => {

  const {price, ratings, dates, total, reviews, amenities, onClick} = props


  return (
    <Flex marginBottom={'10px'} flexDirection={'column'} data-testid='BookNowCard'>
      <Card maxW='lg' padding={3} boxShadow={'lg'}>
  <CardBody>
      <Flex marginBottom={'25px'} justifyContent={'space-between'} alignItems={'center'}>
      <Heading size='md'>$ {price} /night</Heading>
      <Text>
      <Box display='flex' alignItems='center'>
              <StarIcon
                color={'#BC2B3D'}
              />
        <Text marginLeft={'6px'}  marginTop={'2px'}>
        {ratings}
        </Text>
        <Text marginBottom={'8px'} marginLeft={'2px'}>.</Text> {' '}
        <Text color={'#ADB5BD'} marginLeft={'6px'}>
        {reviews}  reviews
        </Text>
        </Box>
      </Text>
      </Flex>
      <Flex marginBottom={'16px'} alignItems={'center'}>
      <TbCircleCheck color='#38B000' />  
      <Text marginLeft={'6px'}>Your dates are available</Text>
      </Flex>

      
      <Flex>
        <Box padding={'5px'} paddingLeft={'0px'} paddingRight={'0px'} border={'1px'} w={'451px'} rounded={'lg'}>
          <Flex w={'451px'} border={'1px'} borderTop={'0px'} borderLeft={'0px'} borderRight={'0px'} justifyContent={'center'}>
          <Box padding={'10px'} marginTop={'-6px'} justifyContent={'space-evenly'} border={'1px'} borderBottom={'0px'} borderLeft={'0px'} w={'319px'} display={'flex'}  borderTop={'0px'}>
            <Box marginTop={'6px'} fontSize={'12px'}>Check In</Box>
            <Box marginTop={'6px'} fontSize={'12px'}>{dates}</Box>
          </Box>
          <Box padding={'10px'} justifyContent={'space-evenly'} border={'1px'} borderBottom={'0px'} borderLeft={'0px'} borderRight={'0px'} w={'319px'} display={'flex'}  borderTop={'0px'}>
            <Box fontSize={'12px'}>Check Out</Box>
            <Box fontSize={'12px'}>{dates}</Box>
          </Box>
          </Flex>
          <Flex>
          <Box padding={'10px'} w={'319px'} justifyContent={'center'} border={'1px'} borderBottom={'0px'} borderLeft={'0px'} borderRight={'0px'} borderTop={'0px'} display={'flex'}>
            <Box marginRight={'44px'} fontSize={'12px'}>{amenities}</Box>
          </Box>
          <Box padding={'10px'} w={'319px'} justifyContent={'end'} border={'1px'} borderBottom={'0px'} borderLeft={'0px'} borderRight={'0px'} borderTop={'0px'} display={'flex'}>
            <Box fontSize={'12px'}>
            <RiArrowDropDownLine size={20} />
            </Box>
          </Box>
          </Flex>

        </Box>
      </Flex>
    <Flex marginTop={'10px'} justifyContent={'space-between'}>
      <Text color={'#495057'} fontWeight={'bold'} fontSize={'sm'}>
        Total
        <Text fontWeight={'light'} color={'black'} fontSize={'sm'}>
          Total includes fees, not tax
        </Text>
      </Text>
      <Text fontWeight={'bold'}>
        ${total}
      </Text>
    </Flex>

  </CardBody>
  <CardFooter justifyContent={'center'}>
      <Button rounded={'lg'} variant='solid' backgroundColor='#BC2B3D' color={'white'} width={300} onClick={onClick}>
        Book Now
      </Button>
  </CardFooter>
</Card>



    </Flex>
  )
}

export default BookNowCard