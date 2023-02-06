import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FlexColStartStart, FlexRowCenterStart } from '../../../../utils/theme/FlexConfigs'

interface IProps {
    title?: string,
    children: React.ReactNode,
    link?: string
}

function PreviewTableContainer(props: IProps) {
    const { link, children, title } = props
  return (
    <Flex {...FlexColStartStart} w="full" >
        <Flex w="full" {...FlexRowCenterStart} marginBottom="10px" >
            <Text fontSize="20px" marginRight="20px" fontWeight="700"  >
                { title }
            </Text>
            { link && <Link legacyBehavior href={link} >
                <Text  cursor="pointer" borderBottom="1px solid" borderBottomColor={"link"} >
                    Manage
                </Text>
            </Link>}
        </Flex>
        <Flex w="full" h="full">
            {children}
        </Flex>
    </Flex>
  )
}

export default PreviewTableContainer