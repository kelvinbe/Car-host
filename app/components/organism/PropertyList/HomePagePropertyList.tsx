import { Flex, Heading, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import HomePagePropertyCard from "../../molecules/Card/HomePagePropertyCard";
import property1 from "../../../public/images/property1.png";
import property2 from "../../../public/images/property2.png";
import property3 from "../../../public/images/property3.png";
import property4 from "../../../public/images/property4.png";
import cozy from "../../../public/images/cozy.png";

const properties = [
  {
    title: "Commercial Property",
    image: property1.src,
    description: `We prioritize excellence. That’s why we 
        offer premier business properties, from 
        rentals to resorts, to ensure efficient operations in 
        a pleasant atmosphere.`,
  },
  {
    title: "Corporate Property",
    image: property2.src,
    description: `We prioritize excellence. That’s why we 
        offer premier business properties, from 
        rentals to resorts, to ensure efficient operations in 
        a pleasant atmosphere. `,
  },
  {
    title: "Residential Property",
    image: property3.src,
    description: `We prioritize excellence. That’s why we 
        offer premier business properties, from 
        rentals to resorts, to ensure efficient operations in 
        a pleasant atmosphere. `,
  },
  {
    title: "Corporate Property",
    image: property4.src,
    description: `We prioritize excellence. That’s why we 
        offer premier business properties, from 
        rentals to resorts, to ensure efficient operations in 
        a pleasant atmosphere. `,
  },
];
const HomePagePropertyList = () => {
  return (
    <Flex direction="column">
      <Flex direction={"column"} marginX={["5", "10"]}>
        <Heading textAlign={"center"}>What Would You Like To List?</Heading>
        <Flex
          direction={["row"]}
          pt={"10"}
          flexWrap={"wrap"}
          w={"full"}
          justify={"center"}
        >
          {properties.map((property, index) => (
            <HomePagePropertyCard property={property} key={index} />
          ))}
        </Flex>
      </Flex>
      <Flex
        width={"full"}
        direction={["column", "column", "column", "row"]}
        my={"16"}
      >
        <Flex
          width={["full", "full", "full", "30%"]}
          justify={"center"}
          direction={"column"}
        >
          <Flex direction={"column"} gap={"6"} pt={"6"}>
            <Heading fontSize={"36px"} textAlign={"left"}>
              Discover Cozy Havens For Your Next Adventure
            </Heading>
            <Text textAlign={"justify"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus.
            </Text>
          </Flex>
        </Flex>
        <Flex width={["full", "full", "full", "70%"]} mt={['4', '4', '4', '0']} >
          <Flex paddingX={["0", "0", "0", "6"]} borderRadius={"25px"} w={"full"} justify={'right'} align={'center'}>
            <Image src={cozy.src} alt="home" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePagePropertyList;
