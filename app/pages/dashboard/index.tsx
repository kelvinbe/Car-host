import { useState, useRef } from "react";
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
import { IVehicle } from "../../globaltypes";
import { exampleVehicleManagementData } from "../vehicle-management";
import { NextFetchEvent } from "next/server";
import VehiclePic from "../../components/atoms/images/VehiclePic";
import Rounded from "../../components/molecules/Buttons/General/Rounded";

export const data = [
  {
    reservationId: "1",
    hostId: "1",
    startDateTime: "2023-02-24T00:00:00",
    endDateTime: "2023-02-24T10:00:00",
    vehicleId: "1",
    vehicleModel: "X5",
    vehicleMake: "BMW",
    vehiclePicUrl:
      "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    locationAddress: "1.3721, 103.8496",
    marketName: "Singapore",
    total: "100",
    status: "active",
  },
  {
    reservationId: "2",
    hostId: "1",
    startDateTime: "2023-02-24T08:00:00",
    endDateTime: "2023-02-24T11:00:00",
    vehicleId: "1",
    vehicleModel: "X5",
    vehicleMake: "BMW",
    vehiclePicUrl:
      "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    locationAddress: "1.3721, 103.8496",
    marketName: "Singapore",
    total: "100",
    status: "active",
  },
  {
    reservationId: "3",
    hostId: "1",
    startDateTime: "2023-02-24T09:00:00",
    endDateTime: "2023-02-24T10:00:00",
    vehicleId: "1",
    vehicleModel: "X5",
    vehicleMake: "BMW",
    vehiclePicUrl:
      "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    locationAddress: "1.3721, 103.8496",
    marketName: "Singapore",
    total: "100",
    status: "active",
  },
  {
    reservationId: "4",
    hostId: "1",
    startDateTime: "2023-02-24T09:00:00",
    endDateTime: "2023-02-24T12:00:00",
    vehicleId: "1",
    vehicleModel: "X5",
    vehicleMake: "BMW",
    vehiclePicUrl:
      "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    locationAddress: "1.3721, 103.8496",
    marketName: "Singapore",
    total: "100",
    status: "active",
  },
];

const mockPayouts = [
  {
    payoutId: "1",
    amount: 100,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
  {
    payoutId: "2",
    amount: 120,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
  {
    payoutId: "1",
    amount: 100,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
  {
    payoutId: "2",
    amount: 120,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
];

const exampleVehicles: IVehicle[] = [
  {
    color: "red",
    coords: {
      latitude: 6.5244,
      longitude: 3.3792,
    },
    hourlyRate: 1000,
    location: "Lagos",
    locationId: "1",
    seats: 4,
    status: "active",
    transmission: "automatic",
    vehicleId: "1",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleType: "car",
    year: 2019,
    vehiclePictures: [
      "https://images.unsplash.com/photo-1547143379-3374bbefa14a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=697&q=80",
    ],
  },
  {
    color: "red",
    coords: {
      latitude: 8.5244,
      longitude: 4.3792,
    },
    hourlyRate: 1000,
    location: "Lagos",
    locationId: "1",
    seats: 4,
    status: "active",
    transmission: "automatic",
    vehicleId: "2",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleType: "car",
    vehiclePictures: [
      "https://images.unsplash.com/photo-1512668023544-749964af467a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    year: 2019,
  },
];

export default function Dashboard() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [viewButton, setViewButton] = useState("");

  return (
    <Grid
      w="full"
      templateColumns={"1fr 1fr"}
      gridTemplateRows={"1fr 1fr"}
      rowGap="30px"
      columnGap="30px"
    >
      <GridItem h="full">
        <PreviewTableContainer
          title="Upcoming Reservations"
          link="/reservations"
        >
          <BaseTable
            columns={ReservationTableColumns}
            data={data}
            dataFetchFunction={(fetchStatus) => {
              fetchStatus;
            }}
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
            {exampleVehicleManagementData.map((vehicleInfo) => (
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
                key={vehicleInfo.vehicleId}
                onMouseEnter={() => {
                  setViewButton(vehicleInfo.vehicleId);
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
                  key={vehicleInfo.vehicleId}
                >
                  <VehiclePic
                    image={vehicleInfo.vehiclePictures[0]}
                    size="mid"
                  />
                  {viewButton === vehicleInfo.vehicleId && (
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                    >
                      <Rounded variant="solid" rounded="full">
                        <Link href={"/vehicle-management"}>
                          <Text cursor="pointer">Manage</Text>
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
        <LiveMapComponent marketId="someId" vehicles={exampleVehicles} />
      </GridItem>
      <GridItem>
        <PreviewTableContainer title="Last 10 Payouts" link="/reservations">
          <BaseTable
            columns={PayoutsTableColumns}
            data={mockPayouts}
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
