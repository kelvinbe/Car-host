import { useState, useRef, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import Link from "next/link";
import { Grid, GridItem, Box, Flex, Text } from "@chakra-ui/react";
import BaseTable from "../../components/organism/Table/BaseTable/BaseTable";
import { app } from "../../firebase/firebaseApp";
import {
  PayoutsTableColumns,
  ReservationTableColumns,
} from "../../utils/tables/TableTypes";
import PreviewTableContainer from "../../components/organism/Table/TableContainer/TableContainer";
import LiveMapComponent from "../../components/organism/Maps/LiveMapComponent/LiveMapComponent";
import { NextFetchEvent } from "next/server";
import VehiclePic from "../../components/atoms/images/VehiclePic";
import Rounded from "../../components/molecules/Buttons/General/Rounded";
import useVehicles from "../../hooks/useVehicles";
import useReservation from "../../hooks/useReservation";
import { selectFetchedPayouts } from "../../redux/paySlice";
import { useAppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/store";
import { fetchPayouts } from "../../redux/paySlice";
import { orderBy, sortBy } from "lodash";


export default function Dashboard() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [viewButton, setViewButton] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { allVehicles, fetchVehicles } = useVehicles();
  const { reservations, fetchReservations } = useReservation(undefined, 10, currentPage, 'UPCOMING');

  const dispatch = useAppDispatch();
  const {
    payouts,
    loading: payoutsLoading,
    error,
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

    dispatch(fetchVehicles)
    dispatch(fetchReservations)
  }, [currentPage]);

  const sortedPayouts=orderBy(payouts, (payout) => new Date(payout.date), 'desc').slice(0, 10)
  
  const handlePageChange=(page:number)=>{
    setCurrentPage(page)
  }
  return (
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
            pagination={{position: ["bottomCenter"], onChange: handlePageChange}}
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
                  <VehiclePic image={vehicleInfo.pictures[0]} size="mid" />
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
  );
}

export function getStaticProps(context: NextPageContext) {
  return {
    props: {
      adminonly: false,
      dashboard: true,
      authonly: true,
    },
  };
}
