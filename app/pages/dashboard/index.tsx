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

export default function Dashboard() {
  const [viewButton, setViewButton] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { allVehicles, fetchVehicles } = useVehicles();
  const { reservations, fetchReservations } = useReservation(undefined, 10, currentPage, 'UPCOMING');

  const dispatch = useAppDispatch();
  const {
    payouts,
  } = useAppSelector(selectFetchedPayouts);

  useEffect(() => {
    dispatch(
      fetchPayouts({
        pagination: {
          page: 1,
          size: 10,
        },
        sort: 'desc'
      })
    );

    fetchVehicles()
    fetchReservations()
  }, [currentPage]);

  const sortedPayouts = orderBy(payouts, (payout) => new Date(payout.date), 'desc').slice(0, 10)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
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
              columns={ReservationTableColumns}
              data={reservations}
              dataFetchFunction={(fetchStatus) => {
                fetchStatus;
              }}
              pagination={{ position: ["bottomCenter"], onChange: handlePageChange }}
            />
          </PreviewTableContainer>
        </GridItem>
        <GridItem>
          <PreviewTableContainer title="Your Vehicles" link="/vehicle-management">
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
              {allVehicles.length < 1 && <Flex marginY={'8'}><Image src={noData} alt="no data" width={100} height={100} /></Flex>}
              {allVehicles.map((vehicleInfo) => (
                <Flex
                  w="40%"
                  padding="18px 0px"
                  align="center"
                  justify={"center"}
                  rounded={"5px"}
                  m="22px 0px"
                  border="1px solid"
                  borderColor="gray.300"
                  _hover={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    cursor: "pointer",
                  }}
                  key={vehicleInfo.id}
                  onMouseEnter={() => {
                    vehicleInfo.id && setViewButton(vehicleInfo.id);
                  }}
                  onMouseLeave={() => {
                    setViewButton("");
                  }}
                >
                  <Flex
                    w="full"
                    h="full"
                    align="center"
                    justify="center"
                    key={vehicleInfo.id}
                    data-testid={"vehicle-image-container"}
                  >
                    <VehiclePic image={first(vehicleInfo?.pictures) ?? ""} size="mid" />
                    {viewButton === vehicleInfo.id && (
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      >
                        <Rounded variant="solid" rounded="full">
                          <Link href={"/vehicle-management"}>
                            <Text
                              cursor="pointer"
                              data-cy={"redirect-vehicle-mgmt"}
                            >
                              Manage
                            </Text>
                          </Link>
                        </Rounded>
                      </Box>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </PreviewTableContainer>
        </GridItem>
        <GridItem>
          <LiveMapComponent marketId="someId" vehicles={allVehicles} />
        </GridItem>
        <GridItem>
          <PreviewTableContainer title="Last 10 Payouts" link="/payouts">
            <BaseTable
              columns={PayoutsTableColumns}
              data={sortedPayouts}
              dataFetchFunction={(fetchStatus) => {
                fetchStatus;
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
