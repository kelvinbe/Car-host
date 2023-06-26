import React from "react";
import { Box, Flex, Text, Image, Icon, HStack, VStack, useMediaQuery } from "@chakra-ui/react";
import DivvlyDark from "../../../public/images/DivvlyDark.png";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import InstagramImage from "../../../public/images/instagram.png";
import LinkedInImage from "../../../public/images/linkedin.png";
import Link from "next/link";

const Footer = () => {

  const [isLargerThan900] = useMediaQuery('(min-width: 913px)')

  const TextStyling = {
    fontWeight: "bold",
    lineHeight: "24px",
    marginLeft: '10px'
  };



  return (
    <Box w="full">
      <Box h="250px" bg="#FF8B83 75%">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <VStack spacing="25px" paddingTop={!isLargerThan900 ? '30px' : '0px'} padding={isLargerThan900 ? "60px" : ''}>
              <Box>
                <Image src={DivvlyDark.src} boxSize="118px" height="39px"  alt=''/>
              </Box>
              <Box>
                <HStack spacing="20px" justifyContent="center">
                  <Link href='https://twitter.com/' target="blank">
                    <Icon as={AiFillTwitterCircle} boxSize="24px" />
                  </Link>
                  <Link href='https://www.facebook.com/' target="blank">
                    <Icon as={FaFacebook} boxSize="24px" />
                  </Link>
                  <Link href='https://www.instagram.com/' target="blank">
                    <Image src={InstagramImage.src} boxSize="24px"  alt='Go to Instagram'/>
                  </Link>
                  <Link href='https://www.linkedin.com/' target="blank">
                    <Image src={LinkedInImage.src} boxSize="24px"  alt='Go to LinkedIn'/>
                  </Link>
                </HStack>
              </Box>
              <Box marginTop="45px">
                <Flex flexDirection={'row'} textAlign={'center'} justifyContent={'center'}>
                  <Text fontSize={isLargerThan900 ? "20px" : "15px"} sx={TextStyling}>About Us</Text>
                  <Text  sx={TextStyling}>|</Text>
                  <Text fontSize={isLargerThan900 ? "20px" : "15px"}  sx={TextStyling}>Privacy Policy </Text>
                  <Text sx={TextStyling}>|</Text>

                  <Text fontSize={isLargerThan900 ? "20px" : "15px"} sx={TextStyling}>Terms of Use</Text>
                  <Text  sx={TextStyling}>|</Text>

                  <Text fontSize={isLargerThan900 ? "20px" : "15px"} sx={TextStyling}>End User License Agreement</Text>
                </Flex>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Box
        w="full"
        h="50px"
        bg="#F2F3F5"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Text
          padding="15px"
          fontWeight="bold"
          fontSize="16px"
          lineHeight="19px"
        >
          Divvly Copyright {(new Date()).getFullYear()}. All rights reserved
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
