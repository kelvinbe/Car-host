import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import laptopMobile from "../../../public/images/laptopMobile.png";
import availableOnAppStore from "../../../public/images/availableOnAppStore.png";
import availableOnPlayStore from "../../../public/images/availableOnPlayStore.png";

const BookRide = () => {
  return (
    <Box py="20">
      <Box>
        <Flex justifyContent="center" alignItems="center">
          <HStack spacing={10}>
            <Box w="500px">
              <VStack
                spacing={4}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Text fontSize="30px" fontWeight="bold" lineHeight="150%">
                  Book Your Ride
                </Text>
                <Box
                  bgColor="#E63B2E"
                  w="50px"
                  height="10px"
                  borderRadius="10px"
                ></Box>
                <Text color="#33415C" fontSize="15px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti.
                </Text>

                <Box>
                  <HStack spacing={8}>
                    <Image h="64px" src={availableOnAppStore.src} />
                    <Image h="64px" src={availableOnPlayStore.src} />
                  </HStack>
                </Box>

                <Box>
                  <VStack
                    spacing={4}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Text fontSize="30px" fontWeight="bold" lineHeight="150%">
                      List Your Vehicle
                    </Text>
                    <Box
                      bgColor="#E63B2E"
                      w="50px"
                      height="10px"
                      borderRadius="10px"
                    ></Box>

                    <Text color="#33415C" fontSize="15px">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                      dignissim, metus nec fringilla accumsan, risus sem
                      sollicitudin lacus, ut interdum tellus elit sed risus.
                      Maecenas eget condimentum velit, sit amet feugiat lectus.
                      Class aptent taciti.
                    </Text>

                    <Button
                      color="white"
                      bgColor="#E63B2E"
                      size="lg"
                      h="54px"
                      borderRadius={10}
                      fontWeight="bold"
                      marginTop={5}
                    >
                      Get Started
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box>
              <Image src={laptopMobile.src} />
            </Box>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default BookRide;
