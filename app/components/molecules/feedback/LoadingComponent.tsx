import { Spinner, Text } from '@chakra-ui/react'
import React from 'react'

function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full w-full ">
        <Spinner
          size="lg"
          color="primary.1000"
        />
        <Text fontSize="18px" fontWeight="700" color="primary.1000" >
            Loading...
        </Text>
    </div>
  )
}

export default LoadingComponent