import { Spinner, Text } from '@chakra-ui/react'
import React from 'react'

function TextLoading() {
  return (
    <div className="flex flex-row items-center justify-center px-3 py-1 gap-x-2">
        <Spinner
            size={"xs"}
            colorScheme='red'
        />
        <Text
            className='text-sm font-bold'
            colorScheme='red'
        >
            Loading...
        </Text>
    </div>
  )
}

export default TextLoading