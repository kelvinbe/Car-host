  import React, { useMemo } from "react";
  import { Wrapper } from "@googlemaps/react-wrapper";
  import { IStation, IVehicle } from "../../../../globaltypes";
  import CarMarkerComponent from "../CarMarkerComponent/CarMarkerComponent";
  import { Flex } from "@chakra-ui/react";
  import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet"
  import "leaflet/dist/leaflet.css"
  import "leaflet-defaulticon-compatibility"
  import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"


  const LiveMapComponent = (props: any) => {
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

    const position = [51.505, -0.09]

    return (
      <Flex
      w="100%" // Set the width to 100%
      h="100%" // Set the height to 100%
      align="center" // Align the content to the center vertically
      justify="center"
        borderRadius="20px"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.200"
        data-testid="map-component"
      >

<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
      </Flex>
    );
  };

    


  export default LiveMapComponent;
