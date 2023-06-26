import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import {
  FlexColCenterStart,
  FlexRowCenterBetween,
  FlexRowCenterCenter,
  FlexRowCenterEnd,
} from "../../../../utils/theme/FlexConfigs";
import SortableDropdown from "./SortableDropdown";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { createSlice } from "@reduxjs/toolkit";
import BaseTable, { PrimitiveTableProps } from "../BaseTable/BaseTable";
import { SearchIcon } from "@chakra-ui/icons";
import Rounded from "../../../molecules/Buttons/General/Rounded";
import { Input } from "@chakra-ui/react";
import { SortOrder } from "antd/es/table/interface";
import { isEmpty } from "lodash";
import { WiRefresh } from "react-icons/wi";
interface IProps {
  /**
   * @sortables 👉 an array with the column keys of the sortable columns
   */
  sortables?: {
    columnKey?: string;
    columnName?: string;
  }[];
  data?: unknown[];
  columns?: ColumnsType<any>;
  dataFetchFunction?: (fetchStatus: "pending" | "error" | "success") => void;
  addValue?:() =>void;
  buttonName?: string;
  viewSearchField: boolean;
  viewAddFieldButton?: boolean;
  viewSortablesField?: boolean;
  openCreateModal?:() => void
  modalComponent?: React.ReactNode;
  pagination?: TablePaginationConfig | false;
  setSearch?: (search: string)=>void
  handlePageChange?: (pagination: TablePaginationConfig)=>void,
  primitiveTableProps?: PrimitiveTableProps,
  onSort?: (sort: {
    columnKey: string,
    order: SortOrder,
  }) => void,
  refetch?: () => void
}

interface IReducer {
  tableColumnDefinitions: ColumnsType<unknown> | null;
}

const initialState: IReducer = {
  tableColumnDefinitions: null,
};

const FilterableTableSlice = createSlice({
  name: "FilterableTable",
  initialState,
  reducers: {
    setTableColumnDefinitions: (state, action) => {
      state.tableColumnDefinitions =
        state.tableColumnDefinitions?.map((columnDefinition) => {
          return {
            ...columnDefinition,
            sortOrder:
              action.payload.columnKey === columnDefinition.key
                ? action.payload.order
                : null,
          };
        }) || null;
    },
    initColumnDefinitions: (state, action) => {
      state.tableColumnDefinitions = action.payload;
    },
  },
});

const { setTableColumnDefinitions, initColumnDefinitions } =
  FilterableTableSlice.actions;

function FilterableTable(props: IProps) {
  const {
    sortables,
    data,
    columns,
    dataFetchFunction,
    buttonName,
    viewSearchField,
    viewAddFieldButton,
    viewSortablesField,
    openCreateModal,
    setSearch: propsSetSearch,
    handlePageChange,
    primitiveTableProps,
    onSort: propSort,
    refetch
  } = props;
  const [{ tableColumnDefinitions }, dispatchActions] = useReducer(
    FilterableTableSlice.reducer,
    initialState
  );
  const [search, setSearch] = useState("")

  const onSort = (sort: {
    columnKey: string,
    order: SortOrder,
  }) => {
    if(propSort) return propSort(sort)
    dispatchActions(setTableColumnDefinitions(sort));
  };

  const onSearch = () =>{
    propsSetSearch?.(isEmpty(search) ? "__empty__" : search)
  }

  useEffect(() => {
    columns && dispatchActions(initColumnDefinitions(columns));
  }, [columns]);

  return (
    <Flex w="full" h="full" {...FlexColCenterStart} sx={{
      overflowX: "scroll"
    }}>
      <Flex {...FlexRowCenterBetween} w="full" marginBottom="10px">
        <Flex {...FlexRowCenterBetween}>
          {viewSearchField && (
            <Flex
              {...FlexRowCenterBetween}
              w="350px"
              marginRight={"10px"}
              data-cy={'search-field'}
            >
              <Input type="text" placeholder="Search" size="md" onChange={(e)=>setSearch(e?.target?.value?.trim())}/>
              <IconButton aria-label="search" onClick={onSearch} >
                <SearchIcon />
              </IconButton>
            </Flex>
          )}
          {viewAddFieldButton && (
            <Rounded variant="solid" fullWidth={false} rounded="md" onClick = {openCreateModal}>
              <Text cursor="pointer">{buttonName}</Text>
            </Rounded>
          )}
        </Flex>
        <Flex {...FlexRowCenterBetween} className="gap-x-5" >
          {viewSortablesField && (
            <Flex {...FlexRowCenterCenter} data-cy={'sort-by'}>
              <Text marginRight="20px" fontWeight={"semibold"}>
                Sort By:
              </Text>
              <Flex {...FlexRowCenterEnd}>
                {sortables?.map((sortable, index) => (
                  <SortableDropdown
                    key={index}
                    columnName={sortable.columnName}
                    columnKey={sortable.columnKey}
                    onSort={onSort}
                    sortOrder={
                      tableColumnDefinitions?.find(
                        (columnDefinition) =>
                          columnDefinition.key === sortable.columnKey
                      )?.sortOrder
                    }
                  />
                ))}
              </Flex>
            </Flex>
          )}
          {refetch && <IconButton cursor="pointer" onClick={refetch} disabled={primitiveTableProps?.loading as boolean ?? false} aria-label="refetch" as={WiRefresh} />  }
        </Flex>
      </Flex>
      <Flex w="full" h="full" {...FlexColCenterStart}>
        <BaseTable
          columns={tableColumnDefinitions ?? []}
          data={data || []}
          dataFetchFunction={dataFetchFunction}
          pagination={props.pagination ? props.pagination : false}
          handlePageChange={handlePageChange}
          primitiveProps={primitiveTableProps}
        />
      </Flex>
    </Flex>
  );
}

export default FilterableTable;
