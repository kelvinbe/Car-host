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
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Cleanliness & Sanitization Measures
                  </Heading>
                  We follow high cleanliness and sanitization conventions,
                  guaranteeing that each vehicle is cleaned and kept at a high
                  level of cleanliness. With Divvly, you can have complete peace
                  of mind knowing that you will be driving a thoroughly
                  maintained and highly dependable car throughout your rental
                  period.
                </li>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Variety and Flexibility
                  </Heading>
                  At Divvly, we take pride in our commitment to offering an
                  extensive range of vehicles that cater to every need and
                  preference. We understand that each customer possesses
                  distinct requirements, and it is our primary objective to
                  cater to all those diverse needs with unwavering dedication.
                </li>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Range of Vehicle Choices
                  </Heading>
                  Whether you find yourself in search of an efficient compact
                  car, perfect for navigating bustling city streets, a capacious
                  SUV, ideal for embarking on family trips, or even a luxurious
                  sedan, designed to add an extra touch of elegance to special
                  occasions, Divvly stands ready to provide you with the ideal
                  vehicle for your desires.
                </li>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Adjustments Made Easy
                  </Heading>
                  Moreover, at Divvly, flexibility is a cornerstone of our car
                  rental system. We acknowledge that plans can change
                  unexpectedly, and we believe in empowering you with the
                  freedom to adapt and modify your arrangements as needed. With
                  Divvly, you are afforded flexibility when it comes to
                  selecting the duration of your rental. Whether you require a
                  car for just a few hours to attend to immediate errands, a day
                  for a short road trip, or a week for a memorable vacation, we
                  offer customizable rental options specifically tailored to
                  your distinct requirements.
                </li>

                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Transparent Pricing
                  </Heading>
                  At Divvly, transparency is a cornerstone of our business. Our
                  pricing structure is clear and straightforward, allowing you
                  to plan and budget your trip without any surprises or hidden
                  fees. We believe in building trust with our customers through
                  open and honest communication, ensuring that you have all the
                  information you need to make a clear decision.
                </li>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Clear Pricing Plans
                  </Heading>
                  We empathize with the frustration that arises from
                  encountering concealed expenses and unanticipated fees. To
                  address this concern, we have established a practice of
                  presenting upfront and competitive rates, guaranteeing a
                  complete absence of pricing surprises. Our estimating
                  structure has been planned with effortlessness in mind,
                  ensuring you have a clear understanding of all expenses.
                </li>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    Custom Rates & Offers
                  </Heading>
                  We proudly offer an array of rental packages to accommodate
                  diverse needs, granting you the flexibility to select the
                  option that aligns with your budget and the duration of your
                  desired usage. Whether you prefer daily, weekly, or monthly
                  rates, we aim to empower you with the freedom of choice while
                  maintaining our commitment to transparency and fairness.
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
