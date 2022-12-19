import React from 'react'
import { Button, Icon, Text } from "@chakra-ui/react"
import { IconType } from 'react-icons'

interface IProps {
    icon: IconType | string,
    children?: string | React.ReactNode,
    isActive?: boolean,
    toggleDropdown?: () => void,
    onClick?: (id?: string | number)=>void,
    id?: string | number
}

function DropdownButton(props: IProps) {
  return (
    <Button onClick={()=>{
        props.toggleDropdown && props.toggleDropdown?.()
        props.onClick && props.onClick?.(props.id)
    }} w="full" bg="transparent" display="flex" flexDir={"row"} alignItems="center" justifyContent={"flex-start"} >
        <Icon
            name={typeof props.icon === "string" ? props.icon : undefined}
            as={ !(typeof props.icon === "string") ?  props.icon : undefined}
            w={6}
            h={6}
            color={
                props.isActive ? "primary.1000" : "black"
            }
            marginRight="10px"
        />
        <Text fontWeight={"500"} fontSize="20" color={props?.isActive ? "primary.1000" : "black"}  >
            {
                props.children
            }
        </Text>
    </Button>
  )
}

export default DropdownButton