import React, { ReactNode, useEffect, useState } from "react";
import Analytics from "../../components/organism/Analytics/Analytics";
import { Flex, Heading } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { AnalyticsTableColums } from "../../utils/tables/TableTypes";
import { HiLink } from "react-icons/hi";
import useVehicles from "../../hooks/useVehicles";
import Link from "next/link";
import { TablePaginationConfig } from "antd";
import useReservation from "../../hooks/useReservation";
import { DataType } from "../reservations";
import dayjs from "dayjs";
import { IVehicleDetails } from "../../globaltypes";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchReservations, selectReservationsFeedback, selectReservationsPaginationState } from "../../redux/reservationSlice";

function Reports() { 
  const feedback = useAppSelector(selectReservationsFeedback)
  const { current_page, current_size } = useAppSelector(selectReservationsPaginationState)
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(fetchReservations({
      reset: true
    }))
  }, [])


  


  return (
    <Grid width={"full"}  gap={8}>
      <Analytics/>
      <Heading size={'md'}>Reservation History</Heading>
      <Flex width={"full"}>
        <FilterableTable
          viewSearchField={false}
          columns={AnalyticsTableColums}
          data={feedback?.data ?? []}
          primitiveTableProps={{
            loading: feedback.loading
          }}
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
        />
      </Flex>
    </Grid>
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
