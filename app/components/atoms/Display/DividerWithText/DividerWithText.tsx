import { Grid, Text } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    children?: string
}

function DividerWithText(props: IProps) {
    const { children } = props
  return (
    <Grid w="full" templateColumns="1fr auto 1fr" alignItems="center" justifyContent="stretch" columnGap={2} >
        <Grid h="1px" bg="gray.300" />
        <Text textAlign="center" color="gray.500" fontSize="14px" fontWeight="500" >
            {
                children
            }
        </Text>
        <Grid h="1px" bg="gray.300" />
    </Grid>
  )
}

export default DividerWithText