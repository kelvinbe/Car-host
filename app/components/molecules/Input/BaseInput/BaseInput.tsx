import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    formLabel?: string,
    placeholder?: string,
    onChangeText?: (text: string) => void
}

function BaseInput(props: IProps) {
  return (
    <FormControl>
        <FormLabel 
            fontSize="16px"
            fontWeight="600"
            color="black"
        >
            {
                props.formLabel
            }
        </FormLabel>
        <Input
            placeholder={props.placeholder}
            _placeholderShown={{
                color: "black"
            }}
            rounded="full"
            w="full"
            borderColor="gray.300"
            color="black"
            onChange={(e)=>{
                props.onChangeText && props.onChangeText(e.target.value)
            }}
        />
    </FormControl>
  )
}

export default BaseInput