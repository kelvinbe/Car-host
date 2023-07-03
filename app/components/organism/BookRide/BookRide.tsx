import React from "react"
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react"
import laptopMobile from "../../../public/images/laptopMobile.png"
import availableOnAppStore from "../../../public/images/availableOnAppStore.png"
import availableOnPlayStore from "../../../public/images/availableOnPlayStore.png"
import Link from "next/link"

const BookRide = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 913px)")

  const textStyle = {
    textColor: "#33415C",
    fontSize: "15px",
  }
  return (
    <Box py="22px">
      <Box>
        <Flex justifyContent="center" alignItems="center">
          <Flex
            width={"100%"}
            flexDirection={!isLargerThan900 ? "column" : "row"}
          >
            <Box w={!isLargerThan900 ? "full" : "50%"} margin="20px">
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
                <Text
                  color="#33415C"
                  p={"15px"}
                  fontSize="15px"
                  width={!isLargerThan900 ? "full" : "500px"}
                  sx={textStyle}
                >
                  Our goal is to provide you with the utmost convenience and
                  value for your money, ensuring that your journey with Divvly
                  is nothing short of extraordinary. With an extensive fleet of
                  vehicles to choose from, ranging from compact cars to
                  luxurious sedans, Divvly offers unparalleled options that
                  cater to every traveler’s preference.
                </Text>

                <Box display={"flex"} width={"full"}>
                  <Flex
                    flexDirection={!isLargerThan900 ? "column" : "row"}
                    justifyContent={
                      !isLargerThan900 ? "center" : "space-between"
                    }
                  >
                    <Box marginBottom={"10px"}>
                      <Link
                        href="https://www.apple.com/app-store/"
                        target="blank"
                      >
                        <Image
                          h="64px"
                          src={availableOnAppStore.src}
                          alt="Available on AppStore"
                        />
                      </Link>
                    </Box>
                    <Link
                      href="https://www.apple.com/app-store/"
                      target="blank"
                    >
                      <Image
                        h="64px"
                        marginBottom={"10px"}
                        marginLeft={!isLargerThan900 ? "" : "20px"}
                        src={availableOnPlayStore.src}
                        alt="Available on PlayStore"
                      />
                    </Link>
                  </Flex>
                </Box>

                <Box>
                  <Flex
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexDirection={"column"}
                    width={!isLargerThan900 ? "full" : "500px"}
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

                    <Text
                      p={"19px"}
                      color="#33415C"
                      fontSize="15px"
                      sx={textStyle}
                    >
                      List your vehicle on our platform and create a consistent
                      stream of income. By working with Divvly, we can assist
                      you in creating pricing plans and marketing to individuals
                      searching for transportation. Rental pricing is based on
                      an hourly charge with gas included. Don’t wait any longer!
                      Contact us to discuss the next steps and get your vehicle
                      on the market.
                    </Text>
                    <Link href="getting-started">
                      <Button
                        color="black"
                        bgColor="#E63B2E"
                        size="lg"
                        h="54px"
                        borderRadius={10}
                        fontWeight="bold"
                        marginTop={5}
                        _hover={{ color: "black", bg: "#E2E8F0" }}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </Flex>
                </Box>
                <Box>
                  <Flex
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexDirection={"column"}
                    width={!isLargerThan900 ? "full" : "500px"}
                  >
                    <Text fontSize="30px" fontWeight="bold" lineHeight="150%">
                      Partner with Divvly Today
                    </Text>
                    <Box
                      bgColor="#E63B2E"
                      w="50px"
                      height="10px"
                      borderRadius="10px"
                    ></Box>

                    <Text
                      p={"19px"}
                      color="#33415C"
                      fontSize="15px"
                      sx={textStyle}
                    >
                      Experience the seamless, stress-free, and enjoyable
                      journey that Divvly offers, regardless of whether you’re
                      the vehicle owner, looking for a way to increase income,
                      or a renter, searching for easier transportation. Say
                      goodbye to the complexities and limitations of traditional
                      car rental services and say hello to a new era of
                      flexibility and ease. Discover a new way of transportation
                      with Divvly Car Rental System!
                    </Text>
                    <Link href="contact-us">
                      <Button
                        color="black"
                        bgColor="#E63B2E"
                        size="lg"
                        h="54px"
                        borderRadius={10}
                        fontWeight="bold"
                        marginTop={5}
                        _hover={{ color: "black", bg: "#E2E8F0" }}
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </VStack>
            </Box>

            <Box
              w={!isLargerThan900 ? "full" : "50%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems="center"
            >
              <Image src={laptopMobile.src} alt="App on mobile and laptop" />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default BookRide
