import React, { ReactNode, useEffect, useState } from "react";
import Analytics from "../../components/organism/Analytics/Analytics";
import { Flex, Heading } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { AnalyticsTableColums } from "../../utils/tables/TableTypes";
import useVehicles from "../../hooks/useVehicles";
import { TablePaginationConfig } from "antd";
import useReservation from "../../hooks/useReservation";
import { DataType } from "../reservations";
import dayjs from "dayjs";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";

function Reports() {
  const { reservations, fetchReservations } = useReservation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [reservationData, setReservationData] = useState<DataType[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchReservations();
  }, [pageNumber]);

  useEffect(() => {
    setReservationData(() =>
      reservations.map((reservation) => ({
        reservationId: reservation?.id,
        vehiclePlate: reservation?.vehicle?.plate,
        vehicleName: `${reservation?.vehicle?.make} ${reservation?.vehicle?.model}`,
        startEndTime: `${dayjs(reservation?.start_date_time).format(
          "DD/MM/YYYY h:mm A"
        )} ${dayjs(reservation?.end_date_time).format("DD/MM/YYYY h:mm A")}`,
        totalCost: reservation?.payment?.amount,
        hostName: `${reservation?.vehicle?.host?.fname} ${reservation?.vehicle?.host?.lname}`,
        location: reservation?.vehicle?.station?.name,
        status: reservation?.status.toLowerCase(),
      }))
    );
  }, [reservations]);

  const filteredReservationData = reservationData.filter(
    (reservation) =>
      dayjs(reservation.startDateTime)
        .format("DD MMM, YYYY")
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      reservation.status.toLowerCase().includes(search.toLocaleLowerCase())
  );
  const handlePageChange = (pagination: TablePaginationConfig) => {
    pagination.current && setPageNumber(pagination.current);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Grid width={"full"} gap={8}>
        <Analytics />
        <Heading size={"md"}>Tracking History</Heading>
        <Flex width={"full"}>
          <FilterableTable
            viewSearchField={true}
            viewSortablesField={true}
            columns={AnalyticsTableColums}
            sortables={[
              {
                columnKey: "start_date_time",
                columnName: "Date",
              },
            ]}
            data={filteredReservationData}
            pagination={{ position: ["bottomCenter"] }}
            handlePageChange={handlePageChange}
            setSearch={setSearch}
          ></FilterableTable>
        </Flex>
      </Grid>
    </ErrorBoundary>
  );
}

export default Reports;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
