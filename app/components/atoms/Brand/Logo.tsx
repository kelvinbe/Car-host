import React from 'react'
import {  Flex } from "@chakra-ui/react"
import { FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'
import LogoIcon from "../../../public/images/divvlyLogo.png" 

import Image from 'next/image'

function Logo() {
  return (
    <Flex {...FlexRowCenterCenter} >
        <Image src={LogoIcon} width={75} height={19} alt="logo" />
    </Flex>
  )
}

export default Logo