import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'

interface IProps {
    status: "active" | "cancelled" | "reserved" | "paid" | "pending" | "inactive",
    children: React.ReactNode | string
}

function StatusTag(props: IProps) {
  return (
    <Flex {...FlexRowCenterCenter} alignItems="center" borderRadius="22px" padding="4.5px 26px" justifyContent="center" border="1px solid" bgColor={`${props.status}.100`} borderColor={`${props.status}.1000`} >
        <Text fontSize="14px" fontWeight="700" textTransform={"capitalize"} color={`${props.status}.1000`} >
            {props.children}
        </Text>
    </Flex>
  )
}

export default StatusTag