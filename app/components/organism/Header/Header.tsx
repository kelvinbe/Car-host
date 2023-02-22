import React from "react";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import {
  FlexColCenterBetween,
  FlexRowStartBetween,
} from "../../../utils/theme/FlexConfigs";
import DivvlyLogo from "../../../public/images/Divvly.png";
// import Link from "next/link";
import { Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box w="full" margin="30px" bg="transparent" zIndex={2}>
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
          <Link href='#about' paddingRight="20px">
            About Us
          </Link>
            <Link href="getting-started">
              <Button fontStyle="normal" color="white" bg="#E63B2E">
                Get Started
              </Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
