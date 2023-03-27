import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { FlexColCenterCenter } from '../../../utils/theme/FlexConfigs'
import ComingSoonVector from '../../atoms/images/ComingSoonVector'


const ComingSoon = () => {
  return (
    <Flex w={'100%'} h={'70vh'} {...FlexColCenterCenter}>
        <ComingSoonVector/>
        <Text fontWeight={'bold'} fontSize={18}>This page is coming soon. Stay tuned!!!</Text>
    </Flex>
  )
}

export default ComingSoon