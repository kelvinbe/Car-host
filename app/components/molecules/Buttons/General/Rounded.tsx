import { Button, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface IProps {
    children?: string | ReactNode,
    loading?: boolean,
    onClick?: () => void,
    disabled?: boolean,
    customLoading?: ReactNode,
    variant?: "solid" | "outline",
    fullWidth?: boolean
    rounded:'full' | 'md',
    setWidth?:number | string
}

function Rounded(props: IProps) {
    const { children, loading, onClick, disabled, variant, fullWidth, rounded, setWidth} = props;
  return (
    <Button
    w={fullWidth ? "full" : setWidth}
    _hover={{
        backgroundColor: variant === "solid" ? "primary.900" : "transparent",
    }}
    _active={{
        backgroundColor: variant === "solid" ? "primary.1000" : "transparent",
    }}  
    variant={variant} 
    borderColor={variant === "solid" ? undefined : "primary.1000"} 
    isLoading={loading}
    disabled={disabled} 
    onClick={onClick}  
    rounded={rounded} 
    backgroundColor={variant === "solid" ? "primary.1000" : undefined} 
    alignItems="center"
    justifyContent="center"  >
        <Text fontSize="18px" fontWeight="700" color={ variant === "outline" ? "primary.1000" :"white"} textAlign="center" >
            {
                children
            }
        </Text>
    </Button>
  )
}
export default Rounded