import { Flex } from "@chakra-ui/react";
import React from "react";

const PropertyListMap = () => {
  const mapMode='place';
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const location = 'San+Diego,+Carlifornia,+92103'
  return (
    <Flex width={"full"}>
      <iframe
        width={"100%"}
        src={`https://www.google.com/maps/embed/v1/${mapMode}?key=${googleAPIKey}&q=${location}`}
      />
    </Flex>
  );
};

export default PropertyListMap;
