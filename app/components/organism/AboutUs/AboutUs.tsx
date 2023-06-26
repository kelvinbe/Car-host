import React from "react";
import { Box, Flex, Heading, Image, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import aboutImage from "../../../public/images/aboutUsImg.png";

const AboutUs = () => {
  const textStyle = {
    textColor: "#33415C",
    // width: "full",
    fontSize: "15px",
  };

  const [isLargerThan900] = useMediaQuery('(min-width: 913px)')


  return (
    <Box w="full" py="20" p='7px'>
  
      <Flex justifyContent="center" flexDirection={!isLargerThan900 ? 'column' : 'row'}  alignItems="center">
        <Box marginTop={'15px'}>
          <Image boxSize="2xl" padding={0} src={aboutImage.src} alt='About us'/>
        </Box>
        <Box>
          <Box>
        <Text
            textColor="#7D8597"
            // marginTop="-113px"
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
          </Box>
          <VStack mt="10px" width={'full'} textAlign="left" spacing={6}>
            <Text width={!isLargerThan900 ? 'full' : '500px'} sx={textStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante pulvinar.
            </Text>
            <Text width={!isLargerThan900 ? 'full' : '500px'} sx={textStyle}>
              <Text fontWeight="bold" fontSize="20px">
                How It Works
              </Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit.
            </Text>
            <Text width={!isLargerThan900 ? 'full' : '500px'} sx={textStyle}>
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
