import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import React, { useEffect, useReducer, useState } from 'react'
import { FlexColCenterStart, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd } from '../../../../utils/theme/FlexConfigs'
import { BsChevronDown } from 'react-icons/bs'
import DropdownButton from '../../../molecules/Buttons/DropdownButton/DropdownButton'
import { BiUser } from 'react-icons/bi'
import SortableDropdown from './SortableDropdown'
import { ColumnsType } from 'antd/es/table'
import { createSlice } from "@reduxjs/toolkit"
import BaseTable from '../BaseTable/BaseTable'

interface IProps {
    /**
     * @sortables 👉 an array with the column keys of the sortable columns
     */
    sortables: {
        columnKey: string,
        columnName: string
    }[],
    data?: any[],
    columns?: ColumnsType<any>,
    dataFetchFunction?: ( fetchStatus: "pending" | "error" | "success" ) => void,

}

interface IReducer {
    tableColumnDefinitions: ColumnsType<any> | null,
}

const initialState: IReducer = {
    tableColumnDefinitions: null
}   

const FilterableTableSlice = createSlice({
    name: "FilterableTable",
    initialState,
    reducers: {
        setTableColumnDefinitions: (state, action) => {
            state.tableColumnDefinitions = state.tableColumnDefinitions?.map((columnDefinition)=>{
                return {
                    ...columnDefinition,
                    sortOrder: action.payload.columnKey === columnDefinition.key ? action.payload.order : null
                }
            }) || null
        },
        initColumnDefinitions: (state, action) => {
            state.tableColumnDefinitions = action.payload
        }
    }
})


const { setTableColumnDefinitions, initColumnDefinitions } = FilterableTableSlice.actions

function FilterableTable(props: IProps) {
    const { sortables, data, columns, dataFetchFunction } = props
    const [ {
        tableColumnDefinitions
    }, dispatchActions] = useReducer(FilterableTableSlice.reducer, initialState)

    const onSort = (sort: any) => {
        console.log("New sort on::::;", sort)
        dispatchActions(setTableColumnDefinitions(sort))
    }

    useEffect(()=>{
        console.log("columns::::", columns	)
        columns && dispatchActions(initColumnDefinitions(columns))
    }, [columns])

  return (
    <Flex w="full" {...FlexColCenterStart} >
        <Flex {...FlexRowCenterBetween} w="full" >
            <div></div>
            <Flex {...FlexRowCenterCenter} marginBottom="20px" >
                <Text marginRight="20px" fontWeight={"semibold"}  >
                    Sort By:
                </Text>
                <Flex {...FlexRowCenterEnd}  >
                    {
                        sortables?.map((sortable, index)=>(
                            <SortableDropdown
                                key={index}
                                columnName={sortable.columnName}
                                columnKey={sortable.columnKey}
                                onSort={onSort}
                                sortOrder={tableColumnDefinitions?.find((columnDefinition)=>columnDefinition.key === sortable.columnKey)?.sortOrder}
                            />
                        ))
                    }
                    
                </Flex>
            </Flex>
        </Flex>
        <Flex w="full" {...FlexColCenterStart} >
            <BaseTable
                //@todo modify type definitions
                columns={tableColumnDefinitions as any}
                data={data || []}
                dataFetchFunction={dataFetchFunction}

            />
        </Flex>
    </Flex>
  )
}

export default FilterableTable