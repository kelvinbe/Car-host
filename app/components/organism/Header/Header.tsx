import React from "react";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import {
  FlexColCenterBetween,
  FlexRowStartBetween,
} from "../../../utils/theme/FlexConfigs";
import DivvlyLogo from "../../../public/images/Divvly.png";

const Header = () => {
  return (
    <Box w="full" margin="30px">
      <Flex w="full" {...FlexRowStartBetween}>
        <div>
          <Heading paddingLeft="80px">
            <Image src={DivvlyLogo.src} />
          </Heading>
        </div>
        <Flex {...FlexRowStartBetween}>
          <Box alignItems="center" textAlign="center" justifyContent="center">
            <Text
              fontStyle="normal"
              textTransform="capitalize"
              fontSize="md"
              marginTop="10px"
              fontWeight="bold"
            >
              Want to list your vehicle?
            </Text>
          </Box>
          <Box paddingLeft="40px" paddingRight="80px">
            <Button fontStyle="normal" color="white" bg="#E63B2E">
              Get Started
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
