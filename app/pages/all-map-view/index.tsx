import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import { FlexColCenterStart } from "../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchVehicles, selectFetchVehiclesFeedback, selectVehiclesPaginationState } from "../../redux/vehiclesSlice";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { AllVehiclesTable } from "../../utils/tables/admin.table.schema";
import { IVehicle } from "../../globaltypes";

function AllMapView() {
  const dispatch = useAppDispatch()
  const feedback = useAppSelector(selectFetchVehiclesFeedback)
  const { current_page, current_size } = useAppSelector(selectVehiclesPaginationState)

  useEffect(()=>{
    dispatch(fetchVehicles({
      reset: true,
    }))
  }, [])


  return (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Flex {...FlexColCenterStart} w="full" h="full" >
      <FilterableTable
        viewSearchField
        data={feedback?.data ?? []}
        columns={AllVehiclesTable}
        primitiveTableProps={{
          scroll: {
            x: 'max-content'
          },
          loading: feedback?.loading,
        }}
        sortables={[
          {
            columnKey: 'created_at',
            columnName: "Created"
          },
          {
            columnKey: "hourly_rate",
            columnName: "Hourly Rate"
          }
        ]}
        viewSortablesField
        pagination={{
          position: ["bottomCenter"],
          onChange: (page, pageSize) => {
            dispatch(fetchVehicles({ page, size: pageSize }))
          },
          total: ((current_page ?? 0) * (current_size ?? 0)) + (
            feedback?.data?.length < (current_size ?? 0) ? 0 : 1
          ),
          showSizeChanger: true, 
        }}
        onSort={(sort)=>{
          const order = sort?.order == "descend" ? "desc" : "asc"
          const sort_by = sort?.columnKey as keyof IVehicle

          dispatch(fetchVehicles({
            sort: order,
            sort_by
          }))
        }}
        setSearch={(search)=>{
          dispatch(fetchVehicles({
            search
          }))
        }}
      />
    </Flex>
  </ErrorBoundary>
  );
}

export default AllMapView;

export function getServerSideProps() {
  return {
    props: {
      adminonly: true,
      authonly: true,
      dashboard: true,
    },
  };
}
