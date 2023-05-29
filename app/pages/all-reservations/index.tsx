import { Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import { lowerCase } from "lodash";
import React, { useEffect, useState } from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import useReservation from "../../hooks/useReservation";
import { AllReservationColumns } from "../../utils/tables/TableTypes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
export interface DataType {
  reservationId: string;
  hostId: string;
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
function AllReservations() {
  const [reservationData, setReservationData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { fetchReservations, reservations } = useReservation(undefined, 10, currentPage);

  useEffect(() => {
    fetchReservations();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setReservationData(() =>
      reservations.map((reservation) => ({
        reservationId: reservation?.id,
        hostId: reservation?.vehicle?.host?.id,
        vehiclePlate: reservation?.vehicle?.plate,
        vehicleName: `${reservation?.vehicle?.make} ${reservation?.vehicle?.model}`,
        startEndTime: `${dayjs(reservation?.start_date_time).format(
          "DD/MM/YYYY h:mm A"
        )} ${dayjs(reservation?.end_date_time).format("DD/MM/YYYY h:mm A")}`,
        totalCost: reservation?.payment?.amount,
        hostName: reservation?.vehicle?.host?.handle,
        location: `${reservation?.vehicle?.station?.name}`,
        status: lowerCase(reservation?.status),
      }))
    );
  }, [reservations]);

  if (!reservations) return null;
  return (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Flex w="full" h="full" data-testid="all-reservations-table">
        <FilterableTable
          viewSearchField={true}
          viewSortablesField={true}
          columns={AllReservationColumns}
          data={reservationData}
          sortables={[
            {
              columnKey: "totalCost",
              columnName: "Total Cost",
            },
          ]}
          pagination={{
            position: ["bottomCenter"],
            onChange: handlePageChange
          }}
        />      
    </Flex>
  </ErrorBoundary>
  );
}

export default AllReservations;