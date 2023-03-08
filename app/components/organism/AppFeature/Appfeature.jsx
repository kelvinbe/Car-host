import React from "react";
import AppFeatureCard from "../../molecules/Card/Card";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import user_group from "../../../public/images/users.png";
import group_car from "../../../public/images/group_car.png";

const Appfeature = () => {
  const cardData = [
    {
      title: "For Guests",
      icons: user_group,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, 
                  ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per.`,
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
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, 
                  ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per.`,
      buttonTitle: "Get Started",
      displayFirstButton: "block",
      displaySecondButton: "none !important",
      showFirstButtonIcon: false,
      showSecondButtonIcon: false,
      buttonLink: "getting-started",
    },
  ];

  return (
    <Box py="20" w="1500px">
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
          <Box>
            <Text py="9">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit
            </Text>
          </Box>
        </Flex>
        <Flex>
          <HStack spacing={"16"}>
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
              );
            })}
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Appfeature;
