import { FormControl, FormHelperText, FormLabel, Input, Flex, SystemStyleObject, InputRightElement, InputGroup } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { FlexColStartStart, FlexRowCenterBetween } from '../../../../utils/theme/FlexConfigs';

interface IProps {
    formLabel?: string,
    placeholder?: string,
    onChangeText?: (text: string) => void,
    helperTextTop?: string | ReactNode,
    helperTextBottom?: string | ReactNode,
    errorMessage?: string  | ReactNode,
    customStyle?: SystemStyleObject,
    customTopHelperStyle?: SystemStyleObject,
    onClickHelperText?: () => void,
    rightIcon?: ReactNode | null,
    customBottomHelperStyle?: SystemStyleObject,
    type?: string,
    value?: string,
}

function WithHelperText(props: IProps) {
    const {
        formLabel,
        placeholder,
        helperTextTop,
        helperTextBottom,
        onChangeText,
        customStyle,
        customTopHelperStyle,
        onClickHelperText,
        rightIcon,
        type,
        value
    } = props;
  return (
    <FormControl
        sx={customStyle}
        marginBottom="10px"
    >
        <Flex mb="8px" w="full" {...FlexRowCenterBetween} >
            <FormLabel
                sx={{
                    margin: 0
                }}
            >
                {
                    formLabel
                }
            </FormLabel>
            <FormHelperText onClick={onClickHelperText} sx={{
                color: "link",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                ...(customTopHelperStyle || null)
            }} margin="0px" >
                {helperTextTop}
            </FormHelperText>
        </Flex>
        <InputGroup>
            <Input
                value={value}
                placeholder={placeholder}
                _placeholderShown={{
                    color: "black"
                }}
                type={type}
                rounded="full"
                w="full"
                borderColor="gray.300"
                color="black"
                onChange={(e)=>{
                    onChangeText && onChangeText(e.target.value)
                }}
            />
            {
                rightIcon ? (
                    <InputRightElement>
                        {rightIcon}
                    </InputRightElement>
                ) : null
            }
        </InputGroup>
        {
            helperTextBottom ? (
                <FormHelperText >
                    <Flex {...FlexColStartStart} w="full" >
                        {helperTextBottom}
                    </Flex>
                </FormHelperText>
            ) : null
        }
    </FormControl>
  )
}

export default WithHelperText