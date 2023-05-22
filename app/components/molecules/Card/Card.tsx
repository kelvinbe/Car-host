import React, { FunctionComponent } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Flex,
  HStack,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { SiApple } from "react-icons/si";
import { IconType } from "react-icons";

interface IProps {
  title: string;
  icons: {src:string};
  description: string;
  buttonTitle: string;
  buttionIcon: IconType;
  displayFirstButton: "none" | "block";
  displaySecondButton: "none" | "block";
  showFirstButtonIcon: boolean;
  showSecondButtonIcon: boolean;
  buttonLink: string;
}

const AppFeatureCard: FunctionComponent<IProps> = (props: IProps) => {
  const {
    title,
    icons,
    description,
    buttonTitle,
    displayFirstButton,
    displaySecondButton,
    showFirstButtonIcon,
    showSecondButtonIcon,
    buttonLink,
  } = props;

  return (
    <Card
      maxW="container.md"
      p="5px"
      top="0px"
      boxShadow="0px 6px 24px rgba(230, 59, 46, 0.06)"
      borderRadius={30}
      _hover={{
        top: "-10px",
        transition: "top ease 0.5s",
        boxShadow: "0px 6px 24px rgba(230, 59, 46, 0.06);",
      }}
    >
      <CardHeader>
        <Flex>
          <HStack spacing={4}>
            <Image src={icons?.src} alt='card icon' />
            <Text fontSize="24px" fontWeight="bold">
              {title}
            </Text>
          </HStack>
        </Flex>
      </CardHeader>
      <CardBody
        color="#33415C"
        fontWeight="bold"
        fontSize="15px"
        lineHeight="30px"
        w="725px"
      >
        {description}
        <Box pt={2}>
          <Text textColor="#33415C">
            <Link href="#">
              Learn more <ArrowForwardIcon />
            </Link>
          </Text>
        </Box>
      </CardBody>

      <CardFooter>
        <HStack spacing={6}>
          <Box display={displayFirstButton}>
            <Link href={buttonLink} target="blank" role={'group'}>
              <Button
                _groupHover={{ color: "black", bg: "#E2E8F0" }}
                color="black"
                bgColor="#E63B2E"
                leftIcon={
                  <div>
                    {showFirstButtonIcon && <Icon boxSize={6} color="black" as={SiApple} _groupHover={{ color: "black"}}/>}
                  </div>
                }
                size="lg"
                h="58px"
                borderRadius={10}
                fontWeight="bold"
              >
                {buttonTitle}
              </Button>
            </Link>
            
          </Box>
          <Box display={displaySecondButton}>
            <Link href={buttonLink} target="blank">
              <Button
                color="#E63B2E"
                bgColor="white"
                leftIcon={
                  <div>
                    {showSecondButtonIcon && (
                      <Icon
                        boxSize={6}
                        color="#E63B2E"
                        as={IoLogoGooglePlaystore}
                      />
                    )}
                  </div>
                }
                size="lg"
                h="58px"
                borderRadius={10}
                border="2px solid #E63B2E"
                fontWeight="bold"
              >
                {buttonTitle}
              </Button>
            </Link>
            
          </Box>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default AppFeatureCard;
