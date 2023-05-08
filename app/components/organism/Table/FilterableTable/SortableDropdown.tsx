import React, { useState, useEffect, useRef, MouseEvent } from 'react'
import { Flex, Button, Text, Icon } from "@chakra-ui/react"
import { FlexColStartStart, FlexRowCenterCenter } from '../../../../utils/theme/FlexConfigs'
import { BsChevronDown } from 'react-icons/bs'
import DropdownButton from '../../../molecules/Buttons/DropdownButton/DropdownButton'
import { HiSortAscending, HiSortDescending } from "react-icons/hi"
import { SortOrder } from 'antd/es/table/interface'

interface IProps {
    onSort?: (sortOrder: {
        columnKey: string,
        order: SortOrder,
    }) => void,
    columnKey?: string,
    columnName?: string,
    sortOrder?: SortOrder
}

function SortableDropdown( props: IProps ) {
    const { onSort, columnKey, columnName, sortOrder } = props
    const [open, setOpen] = useState<boolean>(false)
    const optionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      
    console.log("Setting Sortable for ::::: to:::::::",open)
      return () => {
        
      }
    }, [open])
    

    

    const setAscending = () => {
        onSort && onSort({
            columnKey: columnKey || "",
            order: "ascend"
        })
        handleClose()
    }

    const setDescending = () => {
        onSort && onSort({
            columnKey: columnKey || "",
            order: "descend"
        })
        handleClose()
    }

    const handleOpen = (e: MouseEvent) => {
        setOpen(true)
        document.addEventListener('click', handleClickOutside)
    }



    const handleClose = () => {
        setOpen(false)
        document.removeEventListener('click', handleClickOutside)

    }

    const handleClickOutside = (e: any) => {
        if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
            // handleClose()
        }
    }

    const toggleDropdown = (e: MouseEvent) => {
        if(open){
            handleClose()
        }else{
            handleOpen(e)
        }
    }
    
  return (
    <Flex ref={optionsRef} {...FlexRowCenterCenter} marginLeft="20px"  position="relative" >
        <Button onClick={toggleDropdown} justifyContent="space-between" display="flex" borderRadius="10px" alignItems="center" data-cy={'dropdown-button'}>
            <Text fontSize="14px" fontWeight={"500"}  >
                {columnName} {sortOrder &&
                    sortOrder === "ascend" ? (
                        "(Asc)"
                    ) : sortOrder === "descend" ? (
                        "(Desc)"
                    ) : null
                }
            </Text>
            <Icon marginLeft="20px" as={BsChevronDown} />
        </Button>
        {
            open ? (
                <Flex  position="absolute" zIndex={"tooltip"} bottom="-120px" right="0px" padding="20px" {...FlexColStartStart} borderRadius={20} background="whiteAlpha.300" backdropFilter="auto" boxShadow={"0px 8px 18px rgba(0, 0, 0, 0.1)"} backdropBlur="15px"  data-cy={'dropdown'} >
                    <DropdownButton onClick={setAscending} icon={HiSortAscending} >
                        {columnName}(Ascending)
                    </DropdownButton>
                    <DropdownButton onClick={setDescending} icon={HiSortDescending} >
                        {columnName}(Descending)
                    </DropdownButton>
                </Flex>
            ) : null
        }
    </Flex>
  )
}

export default SortableDropdown