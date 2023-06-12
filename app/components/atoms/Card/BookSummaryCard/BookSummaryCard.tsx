import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Stack, Text, } from '@chakra-ui/react'
import React from 'react'
import {TbCircleCheck} from 'react-icons/tb'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { StarIcon } from '@chakra-ui/icons';

interface IBookSummaryCard {
  hostFee: string;
  serviceFee: number;
  dates: string;
  total: number;
  taxFee: number;
  amenities: string;
  onClick?: () => void
}

const BookSummaryCard = (props: IBookSummaryCard) => {

  const {hostFee, serviceFee, dates, total, taxFee, amenities, onClick} = props


  return (
    <Flex  flexDirection={'column'} data-testid='BookSummaryCard'>
      <Card rounded={'lg'} maxW='lg' padding={6} boxShadow={'lg'}>
  <CardBody>
      <Flex marginBottom={'25px'} justifyContent={'center'} alignItems={'center'}>
      <Heading size='md'>Booking Summary</Heading>
      </Flex>
      <Flex marginBottom={'16px'} alignItems={'center'}>
      <TbCircleCheck color='#38B000' />  
      <Text marginLeft={'6px'}>Your dates are available</Text>
      </Flex>
      <Flex>
        <Box padding={'5px'} paddingLeft={'0px'} paddingRight={'0px'} border={'1px'} w={'451px'} rounded={'lg'}>
          <Flex w={'390px'} border={'1px'} borderTop={'0px'} borderLeft={'0px'} borderRight={'0px'} justifyContent={'center'}>
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
          </Flex>

        </Box>
      </Flex>

      <Flex flexDirection={'column'} marginTop={'30px'}>
        <Flex marginBottom={'10px'} justifyContent={'space-between'}>
        <Text fontWeight={'bold'}>$179.00 x 3 nights</Text>   
        <Box>{hostFee}</Box>
        </Flex>
        <Flex marginBottom={'10px'} justifyContent={'space-between'}>
        <Text fontWeight={'bold'}>Host Fee</Text>   
        <Box>{hostFee}</Box>
        </Flex>
        <Flex marginBottom={'10px'} justifyContent={'space-between'}>
        <Text fontWeight={'bold'}>Service Fee</Text>   
        <Box>{serviceFee}</Box>
        </Flex>
        <Flex marginBottom={'10px'} justifyContent={'space-between'}>
        <Text fontWeight={'bold'}>Tax Fee</Text>   
        <Box>{taxFee}</Box>
        </Flex>

        <Flex>
            <Box width={'450px'} height={'1px'} backgroundColor={'#495057'}></Box>
        </Flex>
      </Flex>
    <Flex marginTop={'10px'} justifyContent={'space-between'}>
      <Text color={'#495057'} fontWeight={'bold'} fontSize={'sm'}>
        Total
      </Text>
      <Text fontWeight={'bold'}>
        ${total}
      </Text>
    </Flex>

  </CardBody>
  <CardFooter justifyContent={'center'}>
      <Button rounded={'lg'} variant='solid' backgroundColor='#BC2B3D' color={'white'} width={300} onClick={onClick}>
        Continue Booking
      </Button>
  </CardFooter>
</Card>



    </Flex>
)
}

export default BookSummaryCard