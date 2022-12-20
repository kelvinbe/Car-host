import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FlexRowCenterStart } from '../../../../utils/theme/FlexConfigs'

interface IProps {
    isValid?: boolean,
    checkText?: string,
    isValidText?: string,
}

function ValidityCheck(props: IProps) {
    const { isValid, checkText, isValidText } = props;
  return (
    <Flex {...FlexRowCenterStart} >
        {
            isValid ? <CheckCircleIcon color="green.500" /> : <WarningIcon color="orange.500" />
        }
        {
            checkText && <Text
                ml="8px"
                fontSize="14px"
                fontWeight="500"
                color={isValid ? "green.500" : "orange.500"}
            >
                {
                    isValid ? (
                        isValidText ? isValidText || "Is valid" : checkText
                    ) : checkText
                }
            </Text>
        }
    </Flex>
  )
}

export default ValidityCheck