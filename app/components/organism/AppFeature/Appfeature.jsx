import React from "react"
import AppFeatureCard from "../../molecules/Card/Card"
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react"
import user_group from "../../../public/images/users.png"
import group_car from "../../../public/images/group_car.png"

const Appfeature = () => {
  const cardData = [
    {
      title: "For Guests",
      icons: user_group,
      description: `Embrace the future of car rentals by visiting our website today. Join our ever-growing community of satisfied customers who have discovered a new way to explore the world, marked by simplicity, freedom, and convenience. 
      Let Divvly Car Rental System redefine the way you rent and navigate the world around you.`,
      buttonTitle: "Download",
      displayFirstButton: "block",
      displaySecondButton: "block",
      showFirstButtonIcon: true,
      showSecondButtonIcon: true,
      buttonLink: "https://www.apple.com/app-store/",
    },
    {
      title: "For Hosts",
      icons: group_car,
      description: `Ready to get started with Divvly? As a vehicle owner or Airbnb host, you can turn your car into another stream of revenue. 
      Instead of letting your vehicle sit in the garage while not in use, instead offer it as a method of transportation for those staying at your Airbnb. 
      As travelers, they’re likely looking for ways to easily get around, providing the perfect opportunity to expand your business and increase your profits`,
      buttonTitle: "Get Started",
      displayFirstButton: "block",
      displaySecondButton: "none !important",
      showFirstButtonIcon: false,
      showSecondButtonIcon: false,
      buttonLink: "getting-started",
    },
  ]

  const [isLargerThan800] = useMediaQuery("(min-width: 1680px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })

  const textStyle = {
    textColor: "#33415C",
    fontSize: "15px",
  }

  return (
    <Box padding="50px">
      <VStack spacing={16}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box py="4">
            <Heading>App Features</Heading>
          </Box>
          <Box
            bgColor="#E63B2E"
            w="50px"
            height="10px"
            borderRadius="10px"
          ></Box>
          <Box
            p={"50px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text py="9" width={"full"} textAlign={"center"} sx={textStyle}>
              <Text fontSize={"2xl"}>
                Our app is designed to make the rental process fast and
                efficient. Change your transportation for the better with
                Divvly.
              </Text>
              <ul>
                <Heading as={"h6"} fontSize={"xl"}>
                  <b>Streamlined Reservation Process</b>
                </Heading>
                <Text as={"p"} fontWeight={"medium"}>
                  Traditional car rental processes often come with their fair
                  share of challenges and frustrations. The never-ending
                  paperwork, hidden fees, limited options, and complicated
                  reservation systems can make renting a car feel like a
                  daunting and time-consuming task. At Divvy, we&apos;ve recognized
                  these issues and embarked on a mission to revolutionize the
                  car rental experience. Our objective is to disentangle the
                  method, guaranteeing that it is hassle-free and user-friendly
                  for our customers.
                </Text>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    <b>Easy-to-Use System</b>
                  </Heading>
                  <Text as={"p"} fontWeight={"medium"}>
                    One of the key advantages of choosing Divvly is the seamless
                    ease of use we offer. We know that your time is important,
                    and that&apos;s why we&apos;ve committed ourselves to designing a
                    process that&apos;s both instinctive and proficient.
                  </Text>
                </li>
                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    <b>Clear User Interface</b>
                  </Heading>
                  <Text as={"p"} fontWeight={"medium"}>
                    Through a few simple clicks, you can easily access our
                    advanced booking system, navigate through our extensive
                    fleet of vehicles, select your desired model, and
                    conveniently reserve it instantaneously. With Divvly, you
                    can bid farewell to long queues at rental counters and piles
                    of paperwork. Experience the convenience and freedom of
                    starting your rental journey the moment you make your
                    decision with us.
                  </Text>
                </li>

                <li>
                  <Heading as={"h6"} fontSize={"xl"}>
                    <b>Outstanding Customer Service</b>
                  </Heading>
                  <Text as={"p"} fontWeight={"medium"}>
                    In addition to our wide range of vehicles and transparent
                    pricing, Divvly prides itself on our commitment to providing
                    top-notch customer service. Our dedicated team of
                    professionals is always ready to assist you, whether it&apos;s
                    answering your inquiries, helping you choose the perfect car
                    for your journey, or providing support throughout your
                    rental period. We go the additional mile to ensure that your
                    rental encounter outperforms your expectations.
                  </Text>
                </li>
                <li>
                  {" "}
                  <Heading as={"h6"} fontSize={"xl"}>
                    <b>24/7 Helpful Service</b>
                  </Heading>
                  <Text as={"p"} fontWeight={"medium"}>
                    Our dedicated group of experts is promptly accessible around
                    the clock and prepared to help you with any inquiries or
                    concerns that will arise. We understand the importance of
                    leasing a car within the context of your travel plans, so
                    we&apos;re ready to help connect you with the best-suited vehicle
                    for your needs. After you select Divvly, you&apos;ll be able to
                    rest assured that our commitment to offering client benefits
                    will be apparent each step of the way.
                  </Text>
                </li>
              </ul>
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Flex flexDirection={!isLargerThan800 ? "column" : "row"}>
            {cardData.map((card) => {
              return (
                <AppFeatureCard
                  key={card.title}
                  title={card.title}
                  icons={card.icons}
                  description={card.description}
                  buttonTitle={card.buttonTitle}
                  displayFirstButton={card.displayFirstButton}
                  displaySecondButton={card.displaySecondButton}
                  showFirstButtonIcon={card.showFirstButtonIcon}
                  showSecondButtonIcon={card.showSecondButtonIcon}
                  buttonLink={card.buttonLink}
                />
              )
            })}
          </Flex>
        </Flex>
      </VStack>
    </Box>
  )
}

export default Appfeature
