/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '@chakra-ui/react'
import { Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { isUndefined } from 'lodash';
import React, { useEffect } from 'react'
import AntdProvider from '../../../providers/AntdProvider';
import { TableProps } from 'antd/es/table/Table'

export type PrimitiveTableProps<DataType = any> = Omit<Partial<TableProps<DataType>>, "columns" | "expandIcon" | "expandable">

interface IProps<dT> {
    columns: ColumnsType<dT>,
    data: dT[],
    dataFetchFunction?: (fetchStatus: "pending" | "error" | "success") => void,
    pagination?: TablePaginationConfig | false;
    handlePageChange?: (pagination: TablePaginationConfig) => void,
    primitiveProps?: PrimitiveTableProps
}

function BaseTable(props: IProps<any>) {
    const [tableData, setTableData] = React.useState<any[]>([])
    const { columns, data, dataFetchFunction, handlePageChange, primitiveProps } = props

    useEffect(() => {
        if (!isUndefined(data)) {
            setTableData(data)
            dataFetchFunction && dataFetchFunction("success")
        }
    }, [data])

    return (
        <AntdProvider>
            <Flex
                border="1px solid"
                borderColor="gray.300"
                w="full"
                h="full"
                maxW="82vw"
                rounded="sm"
                overflowX="scroll"
                // maxHeight='700px'
                data-cy={'base-table-container'}
                data-testid='base-table'
            >
                <Table
                    data-cy={'base-table'}
                    key={JSON.stringify(columns)}
                    columns={columns}
                    dataSource={tableData}
                    className="w-full h-full overflow-scroll"
                    pagination={props.pagination ? props.pagination : false}
                    onChange={handlePageChange}
                   {
                    ...primitiveProps
                   }
                />
            </Flex>
        </AntdProvider>

    )
}

export default BaseTable