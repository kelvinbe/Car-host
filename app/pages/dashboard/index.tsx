import { useState, useEffect } from "react";
import Link from "next/link";
import { Grid, GridItem, Box, Flex, Text } from "@chakra-ui/react";
import BaseTable from "../../components/organism/Table/BaseTable/BaseTable";
import {
  PayoutsTableColumns,
  ReservationTableColumns,
} from "../../utils/tables/TableTypes";
import PreviewTableContainer from "../../components/organism/Table/TableContainer/TableContainer";
import LiveMapComponent from "../../components/organism/Maps/LiveMapComponent/LiveMapComponent";
import VehiclePic from "../../components/atoms/images/VehiclePic";
import Rounded from "../../components/molecules/Buttons/General/Rounded";
import useVehicles from "../../hooks/useVehicles";
import useReservation from "../../hooks/useReservation";
import { selectFetchedPayouts } from "../../redux/paySlice";
import { useAppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/store";
import { fetchPayouts } from "../../redux/paySlice";
import { first, orderBy } from "lodash";
import Image from "next/image";
import noData from '../../public/images/no_available_data.png'
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import { GetServerSideProps } from "next";
import apiClient from "../../utils/apiClient";
import { VEHICLES_DOMAIN } from "../../hooks/constants";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase/firebaseApp";
import { fetchUserDashboard, selectDashboardFeedback } from "../../redux/userSlice";
import { DashboardReservations, DashboardWithdrawals } from "../../utils/tables/dashboard.table.schema";
import VehiclePreview from "../../components/molecules/vehicle-preview";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector(selectDashboardFeedback)
  const [viewButton, setViewButton] = useState<string | number>("");

  useEffect(()=>{
    dispatch(fetchUserDashboard())
  },[])

  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Grid
        w="full"
        templateColumns={"1fr 1fr"}
        gridTemplateRows={"1fr 1fr"}
        rowGap="30px"
        columnGap="30px"
        data-cy="dashboard"
      >
        <GridItem h="full">
          <PreviewTableContainer
            title="Upcoming Reservations"
            link="/reservations"
          >
            <BaseTable
              columns={DashboardReservations}
              data={feedback?.data?.reservations ?? []}
              primitiveProps={{
                loading: feedback?.loading
              }}
            />
          </PreviewTableContainer>
        </GridItem>
        <GridItem>
          <PreviewTableContainer title="New Vehicles" link="/vehicle-management">
            <Flex
              w="full"
              h="full"
              align="center"
              justifyContent={"space-around"}
              wrap="wrap"
              rounded={"20px"}
              border="1px solid"
              bg="white"
              borderColor="gray.300"
            >
              <VehiclePreview
                vehicles={feedback?.data?.vehicles} 
                loading={feedback?.loading}
              />
            </Flex>
          </PreviewTableContainer>
        </GridItem>
        <GridItem>
          <LiveMapComponent loading={feedback?.loading} marketId="someId" vehicles={feedback?.data?.map_vehicles} />
        </GridItem>
        <GridItem>
          <PreviewTableContainer title="Recent Withdrawals" link="/payouts">
            <BaseTable
              columns={DashboardWithdrawals}
              data={feedback?.data?.withdrawal_requests ?? []}
              primitiveProps={{
                loading: feedback?.loading
              }}
            />
          </PreviewTableContainer>
        </GridItem>
      </Grid>
    </ErrorBoundary>
  );
}

export const getServerSideProps: GetServerSideProps<{
  adminonly: boolean,
  dashboard: boolean,
  authonly: boolean
}> = async () => {
  return {
    props: {
      adminonly: false,
      dashboard: true,
      authonly: true,
    },
  };
}
