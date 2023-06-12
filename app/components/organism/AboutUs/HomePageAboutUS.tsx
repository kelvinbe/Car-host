import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Image } from "@chakra-ui/react";
import indoor from "../../../public/images/indoor.png";
import family from "../../../public/images/family.png";

const HomePageAboutUS = () => {
  return (
    <Flex
      direction={"column"}
      marginY={"10"}
      // marginX={"20"}
      alignItems={"center"}
      gap={'10'}
    > 
      <Flex width={"full"} direction={{sm:"column", md:"column", lg:"column", xl:"row"}}>
        <Flex width={["full", "full", "full", "30%"]} direction={"column"} justify={"center"} pr={"3"}>
          <Flex direction={"column"}>
            <Heading fontSize={"40px"}>
              The Easiest Way To List Your perfect Home
            </Heading>
            <Text textAlign={'justify'} pt={'6'}>
              We provide you with the smartest means to rent, buy and sell
              properties with Divvly.
            </Text>
          </Flex>
          <Flex paddingTop={"12"} pb={'6'} justify={['center', 'center', 'center', 'left']}>
            <Button bg={"#BC2B3D"} color={"white"}>
              Get Started
            </Button>
          </Flex>
        </Flex>
        <Flex width={["full", "full", "full", "70%"]}>
          <Flex paddingX={["0", "0", "0", "6"]} borderRadius={"25px"} w={"full"} align={'center'} justify={'right'}>
            <Image src={indoor.src} alt="home" />
          </Flex>
        </Flex>
      </Flex>
      <Flex width={"full"} direction={["column", "column", "column", "row"]}>
        <Flex width={["full", "full", "full", "70%"]}>
          <Flex paddingX={["0", "0", "0", "6"]} borderRadius={"25px"} w={"full"} align={'center'} justify={'left'}>
            <Image src={family.src} alt="home" />
          </Flex>
        </Flex>
        <Flex width={["full", "full", "full", "30%"]} justify={"center"} direction={"column"}>
          <Flex direction={"column"} gap={'6'} pt={'6'}>
            <Heading fontSize={"40px"} textAlign={'center'}>Who Are We?</Heading>
            <Text textAlign={'justify'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus.
            </Text>
            <Text textAlign={'justify'}>
              Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante pulvinar.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePageAboutUS;
