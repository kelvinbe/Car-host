import React from 'react'
import ComingSoonVectorIcon from '../../../public/images/coming_soon.svg'
import {  Flex } from "@chakra-ui/react"
import { FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'
import Image from 'next/image'

function ComingSoonVector() {
  return (
    <Flex {...FlexRowCenterCenter} marginY={10}>
        <Image src={ComingSoonVectorIcon} width={500} height={500} alt="coming soon" />
    </Flex>
  )
}

export default ComingSoonVector