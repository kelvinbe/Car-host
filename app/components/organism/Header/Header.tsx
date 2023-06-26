import React from "react";
import { Box, Flex, Heading, Text, Button, Image, useMediaQuery } from "@chakra-ui/react";
import {
  FlexRowStartBetween,
} from "../../../utils/theme/FlexConfigs";
import DivvlyLogo from "../../../public/images/Divvly.png";
import Link from "next/link";

const Header = () => {



  const [isLargerThan800] = useMediaQuery('(min-width: 1680px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })
  return (
    <Box id="header" w="full" margin="30px" bg="transparent" zIndex={2}>
      <Flex w="full" {...FlexRowStartBetween}>
        <div>
          <Heading paddingLeft="80px">
            <Image  src={DivvlyLogo.src} alt="Divvly logo" />
          </Heading>
        </div>
        <Flex {...FlexRowStartBetween}>
          <Box alignItems="center" textAlign="center" justifyContent="center">
         {isLargerThan800 &&   <Text
              fontStyle="normal"
              textTransform="capitalize"
              fontSize="sm"
              marginTop="10px"
              fontWeight="bold"
            >
              Want to list your vehicle?
            </Text>}
          </Box>
          <Box paddingLeft="40px" paddingRight="80px">
            <Link href="/auth" legacyBehavior >
              <Button
                fontStyle="normal"
                color="white"
                bg="#E63B2E"
                _hover={{ color: "black", bg: "#E2E8F0" }}
              >
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
