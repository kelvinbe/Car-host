import React, { useState } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { selectStations } from "../../redux/stationSlice";
import { useAppSelector } from "../../redux/store";
import Locations from "../stations";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { LocationVehicleMapTableColumns } from "../../utils/tables/TableTypes";
import VehicleManagement from "../vehicle-management";
import Reservations from "../reservations";
import { Flex } from "@chakra-ui/react";
import LiveMapComponent from "../../components/organism/Maps/LiveMapComponent/LiveMapComponent";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";

function AllMapView() {
  const [viewReservations, setViewReservations] = useState(false);
  const [viewLocation, setViewLocation] = useState(false);
  const [viewVehicle, setViewVehicle] = useState(false);
  const [noneSelected, setNoneSelected] = useState(true);
  const StationsData = useAppSelector(selectStations)

  return (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Grid
      w="full"
      templateColumns="repeat(3, 1fr)"
      gridTemplateRows={"400px 1fr"}
      rowGap="30px"
      columnGap="30px"
      data-cy={'all-map-view-container'}
    >
      <GridItem colSpan={2}>
          <LiveMapComponent />
      </GridItem>
      <GridItem>
          <FilterableTable
            viewAddFieldButton={false}
            viewSearchField={false}
            viewSortablesField={false}
            columns={LocationVehicleMapTableColumns}
            data={StationsData}
          />
      </GridItem>
      <GridItem colSpan={3}>
        <Flex borderBottom="2px" borderColor="gray.200" w={"30%"}>
          <Text
            marginX={"20px"}
            color={"gray.400"}
            cursor="pointer"
            _hover={{
              color: "primary.1000",
              borderBottom: "2px",
              borderColor: "primary.1000",
            }}
            onClick={() => {
              setViewLocation(false);
              setViewReservations(true);
              setViewVehicle(false);
              setNoneSelected(false);
            }}
          >
            Reservations
          </Text>
          <Text
            marginX={"20px"}
            color={"gray.400"}
            cursor="pointer"
            _hover={{
              color: "primary.1000",
              borderBottom: "2px",
              borderColor: "primary.1000",
            }}
            onClick={() => {
              setViewLocation(true);
              setViewReservations(false);
              setViewVehicle(false);
              setNoneSelected(false);
            }}
          >
            Location
          </Text>
          <Text
            marginX={"20px"}
            color={"gray.400"}
            cursor="pointer"
            _hover={{
              color: "primary.1000",
              borderBottom: "2px",
              borderColor: "primary.1000",
            }}
            onClick={() => {
              setViewLocation(false);
              setViewReservations(false);
              setViewVehicle(true);
              setNoneSelected(false);
            }}
          >
            Vehicle Data
          </Text>
        </Flex>
          <Box marginTop="20px">
            {noneSelected && <Reservations />}
            {viewReservations && <Reservations />}
            {viewLocation && <Locations />}
            {viewVehicle && <VehicleManagement />}
          </Box>
      </GridItem>
    </Grid>
  </ErrorBoundary>
  );
}

export default AllMapView;

export function getStaticProps() {
  return {
    props: {
      adminonly: true,
      authonly: true,
      dashboard: true,
    },
  };
}
