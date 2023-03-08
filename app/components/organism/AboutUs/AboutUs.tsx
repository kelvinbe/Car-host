import React from "react";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import aboutImage from "../../../public/images/aboutUsImg.png";

const AboutUs = () => {
  const textStyle = {
    textColor: "#33415C",
    width: "500px",
    fontSize: "15px",
  };

  return (
    <Box w="full" py="20">
      <Flex justifyContent="center" alignItems="center">
        <Box>
          <Image boxSize="2xl" padding={0} src={aboutImage.src} alt='About us'/>
        </Box>
        <Box>
          <Text
            textColor="#7D8597"
            marginTop="-113px"
            letterSpacing="0.275em"
            as="h6"
          >
            DOWNLOAD DIVVLY
          </Text>

          <Heading py="10px" size="lg">
            About Us
          </Heading>
          <Box
            bgColor="#E63B2E"
            w="50px"
            height="10px"
            borderRadius="10px"
          ></Box>
          <VStack mt="10px" textAlign="left" spacing={6}>
            <Text sx={textStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante pulvinar.
            </Text>
            <Text sx={textStyle}>
              <Text fontWeight="bold" fontSize="20px">
                How It Works
              </Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit.
            </Text>
            <Text sx={textStyle}>
              Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi.
              Integer in felis sed leo vestibulum venenatis. Suspendisse quis
              arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a
              eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit
              ultrices nibh. Mauris sit amet magna non ligula vestibulum
              eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in
              purus lobortis eleifend.
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutUs;
