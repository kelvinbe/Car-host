import React from "react";
import { Box, Flex, Text, Image, Icon, HStack, VStack } from "@chakra-ui/react";
import DivvlyDark from "../../../public/images/DivvlyDark.png";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import InstagramImage from "../../../public/images/instagram.png";
import LinkedInImage from "../../../public/images/linkedin.png";

const Footer = () => {
  const TextStyling = {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "24px",
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
            <VStack spacing="25px" padding="60px">
              <Box>
                <Image src={DivvlyDark.src} boxSize="118px" height="39px" />
              </Box>
              <Box>
                <HStack spacing="20px" justifyContent="center">
                  <Icon as={AiFillTwitterCircle} boxSize="24px" />
                  <Icon as={FaFacebook} boxSize="24px" />
                  <Image src={InstagramImage.src} boxSize="24px" />
                  <Image src={LinkedInImage.src} boxSize="24px" />
                </HStack>
              </Box>
              <Box marginTop="45px">
                <HStack spacing="26px">
                  <Text sx={TextStyling}>About Us</Text>
                  <Text sx={TextStyling}>|</Text>
                  <Text sx={TextStyling}>Privacy Policy </Text>
                  <Text sx={TextStyling}>|</Text>

                  <Text sx={TextStyling}>Terms of Use</Text>
                  <Text sx={TextStyling}>|</Text>

                  <Text sx={TextStyling}>End User License Agreement</Text>
                </HStack>
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
          color="#7D8597"
          fontWeight="bold"
          fontSize="16px"
          lineHeight="19px"
        >
          Divvly Copyright 2023. All rights reserved
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;