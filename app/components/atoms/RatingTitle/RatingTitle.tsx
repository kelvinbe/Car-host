import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import {IoStarSharp} from 'react-icons/io5'


interface IRatingTitle {
    ratings: number;
    title: string;

}


const RatingTitle = (props: IRatingTitle) => {

    const {ratings, title} = props
    return (
    <Flex flexDirection={'column'} data-testid='RatingTitle'>
        
        <Heading marginBottom={'6px'} fontSize={'2xl'}>
        {title}
        </Heading>
        <Flex marginBottom={'10px'}>
        <Box display='flex' mt='2' alignItems='center'>
{Array(5)
            .fill('')
            .map((_, i) => (
        <IoStarSharp
                style={{marginRight: '10px'}}
                size={'18px'}
                key={i}
                color={i < ratings ? '#BC2B3D' : 'gray.300'}
    />
            ))}
        </Box>
        </Flex>
        <Flex>
            {ratings} / 10 Excellent
        </Flex>
        
    </Flex>
)
}

export default RatingTitle