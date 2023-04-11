import React, { useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Marker from "../Marker/Marker";
import { IVehicle } from "../../../../globaltypes";
import CarMarkerComponent from "../CarMarkerComponent/CarMarkerComponent";
import { Flex } from "@chakra-ui/react";
import { FlexRowCenterCenter } from "../../../../utils/theme/FlexConfigs";
import getConfig from "next/config";

interface IProps {
  vehicles?: IVehicle[];
  marketId?: string;
}

const LiveMapComponent = (props: IProps) => {
  const { vehicles, marketId } = props;
  /**
   * @todo add logic to fetch the location of the market id
   */
  return (
    <Flex
      w="full"
      h="full"
      {...FlexRowCenterCenter}
      borderRadius="20px"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      data-testid="map-component"
    >
      <Wrapper apiKey={getConfig().publicRuntimeConfig.GOOGLE_MAPS_API_KEY}>
        <Map
          latitude={
            // The values here will be fetched from the market id
            0.39
          }
          longitude={37.64}
          zoom={
            // for now, the zoom will be fixed
            5
          }
          mapTypeId="roadmap"
        >
          {vehicles?.map((vehicle, i) => (
            <CarMarkerComponent key={i} {...vehicle} />
          ))}
        </Map>
      </Wrapper>
    </Flex>
  );
};

interface IMapProps extends google.maps.MapOptions {
  longitude?: number;
  latitude?: number;
  children?: React.ReactNode;
}

const Map = (props: IMapProps) => {
  const { latitude, longitude, children, zoom } = props;
  const ref = React.useRef(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: zoom ?? 0,
        })
      );
    }
  }, [ref, map, latitude, longitude, zoom]);

  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default LiveMapComponent;
