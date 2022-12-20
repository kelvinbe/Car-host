import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'

interface IProps {
    children?: ReactNode,
    link?: string,
    linkText?: string,
    onClick?: () => void,
}

function HelperLinkText(props: IProps) {
    const { children, link, linkText, onClick } = props;
  return (
    <Flex
        {...FlexRowCenterCenter}
    >
        <Text fontSize="20px" marginRight="10px" color="gray.400" fontWeight="400" > 
            {
                children
            }
        </Text>
        {onClick ? (
            <Text color="link" onClick={onClick} borderColor={"link"} borderBottom="1px solid" borderBottomColor={"link"}  cursor="pointer"  >
                {
                    linkText
                }
            </Text>
        ) : !link ? null : <Link href={link}   >
            <Text color="link" borderColor={"link"} borderBottom="1px solid" borderBottomColor={"link"}  cursor="pointer"  >
                {
                    linkText
                }
            </Text>
        </Link>}
    </Flex>
  )
}

export default HelperLinkText