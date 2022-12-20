import { theme } from '../../utils/theme/index';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'

function chakraDecorators(Story: any) {
  return (
    <ChakraProvider  theme={theme}  >
      <Story/>
    </ChakraProvider>
  )
}

export default chakraDecorators