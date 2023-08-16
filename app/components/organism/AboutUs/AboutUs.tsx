import React from "react"
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react"
import aboutImage from "../../../public/images/aboutUsImg.png"

const AboutUs = () => {
  const textStyle = {
    textColor: "#33415C",
    fontSize: "15px",
  }

  const [isLargerThan900] = useMediaQuery("(min-width: 913px)")

  return (
    <Box marginTop={"100px"} w="full" py="20" p="7px">
      <Flex
        justifyContent="center"
        flexDirection={!isLargerThan900 ? "column" : "row"}
        alignItems="center"
      >
        <Box marginTop={"15px"}>
          <Image
            boxSize={!isLargerThan900 ? "xl" : '2xl'}
            padding={0}
            src={aboutImage.src}
            alt="About us"
          />
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
          <VStack mt="10px" width={"full"} textAlign="left" spacing={6}>
            <Text width={!isLargerThan900 ? "full" : "500px"} sx={textStyle}>
              Welcome to Divvly Car Rental System, your premier vehicle rental
              platform. We are pleased to offer you a reliable and comprehensive
              system that simplifies the car rental process, ensuring a smooth
              and enjoyable experience at every stage. Whether you’re planning a
              rejuvenating weekend getaway, preparing for an important business
              trip, or seeking a trustworthy vehicle for your daily commute,
              Divvly proudly stands ready to cater to your needs and exceed your
              expectations. With our comprehensive range of services and
              unparalleled commitment to customer satisfaction, Divvly is your
              ultimate solution, providing you with a hassle-free and enjoyable
              car rental journey.
            </Text>
            <Text width={!isLargerThan900 ? "full" : "500px"} sx={textStyle}>
              <Text fontWeight="bold" fontSize="20px">
                How It Works
              </Text>
              Level up your transportation with Divvly. Here’s what we promise
              our customers.
            </Text>
            <Text width={!isLargerThan900 ? "full" : "500px"} sx={textStyle}>
              <ul>
                <Heading as={"h6"} fontSize={"xl"}>
                  Safety and Maintenance
                </Heading>

                <li>
                  Safety is of paramount importance to us at Divvly and we put
                  the highest significance on your security and well-being. We
                  understand the importance of a secure and worry-free travel
                  experience, which is why we prioritize keeping our vehicles in
                  pristine condition and implementing rigorous safety measures.
                </li>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Consistent & Frequent Inspections
                  </Heading>
                  Our overarching objective is to provide certainty as you set
                  out on your ventures. To achieve this, we have made safety and
                  maintenance integral aspects of our car rental system. Before
                  every rental, our fleet of vehicles goes through comprehensive
                  inspections and undergoes regular maintenance procedures,
                  ensuring that they are in the best possible condition.
                </li>
              </ul>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default AboutUs
