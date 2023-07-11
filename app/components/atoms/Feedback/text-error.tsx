import { Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'

function TextError() {
  return (
    <div className="flex flex-row items-center justify-center px-3 py-1 gap-x-2">
        <Icon
          as={MdOutlineErrorOutline}
          color={'red'}
          size={16}
        />
        <Text
            className='text-sm font-bold'
            colorScheme='red'
        >
            An error occured
        </Text>
    </div>
  )
}

export default TextError