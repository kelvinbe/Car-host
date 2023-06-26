import React, { useEffect, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ReservationModal from "../../components/organism/Modals/ReservationModal";
import { useDisclosure } from "@chakra-ui/react";
import { fetchReservations, selectReservations, selectReservationsFeedback, selectReservationsPaginationState } from "../../redux/reservationSlice";
import useReservation from "../../hooks/useReservation";
import { insertTableActions } from "../../utils/tables/utils";
import { FlexRowCenterBetween } from "../../utils/theme/FlexConfigs";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { isEmpty, lowerCase } from "lodash";
import { ReservationColumns } from "../../utils/tables/TableTypes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import { AllReservationsTable } from "../../utils/tables/admin.table.schema";
export interface DataType {
  reservationId: string;
  vehiclePlate: string;
  vehicleName: string;
  startEndTime: string;
  startDateTime?: string;
  endDateTime?: string;
  totalCost: number;
  hostName: string;
  location: string;
  status: string;
}

function Reservations() {
  const feedback = useAppSelector(selectReservationsFeedback)
  const { current_page, current_size} = useAppSelector(selectReservationsPaginationState)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(fetchReservations({
      reset: true,
    }))
  }, [])


  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Flex w="full" h="full" data-testid="reservations-table">
        <FilterableTable
          viewSearchField={true}
          viewSortablesField={true}
          columns={AllReservationsTable}
          pagination={{
            position: ["bottomCenter"],
            onChange: (page, pageSize) => {
              dispatch(fetchReservations({ page, size: pageSize }))
            },
            total: ((current_page ?? 0) * (current_size ?? 0)) + (
              feedback?.data?.length < (current_size ?? 0) ? 0 : 1
            ),
            showSizeChanger: true, 
          }}
          data={feedback?.data ?? [] } 
          setSearch={(search)=>{
            dispatch(fetchReservations({
              search,
            }))
          }}
          sortables={[
            {
              columnKey: "payment",
              columnName: "Total cost",
            },
          ]}
          primitiveTableProps={{
            loading: feedback?.loading,
            scroll: {
              x: "max-content",
            }
          }}
        />
      </Flex>
    </ErrorBoundary>
  );
}

export default Reservations;

export function getServerSideProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
