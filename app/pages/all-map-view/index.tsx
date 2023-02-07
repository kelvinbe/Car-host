import React, { useState } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import { StreetViewService } from "@react-google-maps/api";
import Locations, { exampleLocationData } from "../locations";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { LocationVehicleMapTableColumns } from "../../utils/tables/TableTypes";
import VehicleManagement from "../vehicle-management";
import Reservations from "../reservations";
import { Flex } from "@chakra-ui/react";

function AllMapView() {
  const [viewReservations, setViewReservations] = useState(false);
  const [viewLocation, setViewLocation] = useState(false);
  const [viewVehicle, setViewVehicle] = useState(false);
  const [noneSelected, setNoneSelected] = useState(true);

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
    border: "1px solid #e0dede",
    borderRadius: "30px",
  };

  let activeStyling = {
    color: "#E63B2E",
    borderBottom: "2px solid #E63B2E",
  };
  const center = {
    lat: -1.2921,
    lng: 36.8219,
  };
  const onLoad = (streetViewService) => {
    streetViewService.getPanorama({
      location: center,
      radius: 50,
    });
  };
  return (
    <Grid
      w="full"
      templateColumns="repeat(3, 1fr)"
      gridTemplateRows={"1fr 1fr"}
      rowGap="30px"
      columnGap="30px"
    >
      <GridItem colSpan={2}>
        <GoogleMap
          id="circle-example"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
        >
          <StreetViewService onLoad={onLoad} />
        </GoogleMap>
      </GridItem>
      <GridItem>
        <FilterableTable
          viewAddFieldButton={false}
          viewSearchField={false}
          viewSortablesField={false}
          columns={LocationVehicleMapTableColumns}
          data={exampleLocationData}
          dataFetchFunction={() => {}}
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
