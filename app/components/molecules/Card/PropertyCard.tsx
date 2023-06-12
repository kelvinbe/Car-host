import { Flex, Text, Image, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoBedOutline } from 'react-icons/io5';
import {GiShower} from 'react-icons/gi';
import {BiCube} from 'react-icons/bi';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export interface IPropertyProps {
    property: {
        propertyName: string,
        location: {
            state: string,
            city: string,
            latitude?: number,
            longitude?: number
        },
        beds: number,
        baths: number,
        size: number,
        rate: number,
        booking: {
            availableDate: Date | string,
            checkIn: Date | string,
            checkout: Date | string,
        },
        images: string[],
        summary: string,
        
    }
}
const PropertyCard = (props: IPropertyProps) => { 
  const {property} = props
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0)

  const prevClick = ()=>{
    if(currentImgIndex == 0){
        setCurrentImgIndex(property.images.length-1)
    }else{
        setCurrentImgIndex(currentImgIndex-1)
    }
  } 

  const nextClick = ()=>{
    if(currentImgIndex > property.images.length-2){
        setCurrentImgIndex(0)
    }else{
        setCurrentImgIndex(currentImgIndex+1)
    }
  }
  return (
    <Flex direction={'column'} w={'full'} gap={'4'}>
        <Flex w={'full'} align={'center'} position={'relative'}>
            <IconButton aria-label='previous' icon={<ChevronLeftIcon  color={'black'} boxSize={'6'}/>} opacity={'0.7'} position={'absolute'} left={'2'} onClick={prevClick}/>
            <Image src={property.images[currentImgIndex]} alt=''/>
            <IconButton aria-label='previous' icon={<ChevronRightIcon color={'black'} boxSize={'6'}/>} opacity={'0.8'} position={'absolute'} right={'2'} onClick={nextClick}/>
        </Flex>
        <Flex direction={'column'} w={'full'}>
            <Flex>
                <Text size={'sm'}>{property.location.state}  &bull; {property.location.city}</Text>
            </Flex>
            <Flex>
                <Text size={'20px'} fontWeight={'bold'}>{property.summary}</Text>
            </Flex>
            <Flex gap={'4'}>
                <Flex  gap={'2'}><IoBedOutline/>2 Bed</Flex>
                <Flex gap={'2'}> <GiShower/>2 Baths</Flex>
                <Flex gap={'2'}><BiCube />2323 ft</Flex>
            </Flex>
            <Flex justify={'space-between'}>
                <Text>Available on 16th Aug</Text>
                <Text as={'b'} size={'lg'}>$106/night</Text>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default PropertyCard