import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {FaRegImages} from 'react-icons/fa'


interface IImageButton {
    count: number
}

const ImageButton = (props: IImageButton) => {

    const {count} = props


  return (
    <Box data-testid='ImageButton' rounded={'lg'} borderColor={'#F2F3F5'} backgroundColor={'#f2f3f58c'} display={'flex'} justifyContent={'center'} alignItems={'center'} width={'153px'} height={'59px'}>
        
        <Box>
            <Flex justifyContent={'center'} alignItems={'center'}>
            <FaRegImages size={25} />
            <Text marginLeft={'10px'} fontWeight={'bold'} fontSize={'18px'}>{count}+ photos</Text>
            </Flex>
        </Box>
    </Box>
  )
}

export default ImageButton