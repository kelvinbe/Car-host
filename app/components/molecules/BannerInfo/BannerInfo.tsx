import React from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  VStack,
  Stack,
} from "@chakra-ui/react";
import playstore from "../../../public/images/play.png";
import appstore from "../../../public/images/appstore.png";

interface iProps {
  letterSpacing?: string;
  direction: string;
  display: string;
  image: StaticImageData;
  textColor: string;
  boxWidth: string;
  textWidth: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  align: string;
  marginTop?: string;
  showText: boolean;
  spacing: number;
  noStyleText: boolean;
  textAlign: ResponsiveValue<Property.TextAlign>;
}

const BannerInfo = (props: iProps) => {
  const {
    letterSpacing,
    direction,
    display,
    image,
    textColor,
    textWidth,
    boxWidth,
    flexDirection,
    justifyContent,
    alignItems,
    align,
    marginTop,
    showText,
    spacing,
    noStyleText,
    textAlign,
  } = props;
  return (
    <Box>
      <Box>
        <Flex
          flexDirection={flexDirection}
          alignItems={alignItems}
          justifyContent={justifyContent}
        >
          <VStack paddingTop="100px" align={align} spacing={spacing}>
            <Text
              textTransform="uppercase"
              letterSpacing={letterSpacing}
              fontSize="24px"
              textColor={textColor}
            >
              Introducing
            </Text>
            {showText && !noStyleText ? (
              <>
                <Text fontSize="96px">AIRBNB CAR</Text>
                <Text fontSize="96px">
                  <span style={{ color: "#FC346A" }}>SHARING</span> APP
                </Text>
              </>
            ) : (
              !noStyleText && (
                <Text letterSpacing="0.1955em" fontSize="96px">
                  AIRBNB CAR <span style={{ color: "#FC346A" }}>SHARING</span>{" "}
                  APP
                </Text>
              )
            )}
            {noStyleText && (
              <Text letterSpacing="0.1955em" textColor="white" fontSize="96px">
                AIRBNB CAR SHARING APP
              </Text>
            )}
            <Text textColor={textColor} w={textWidth} textAlign={textAlign}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus.
            </Text>
            <Stack direction={direction} spacing={6}>
              <Image src={playstore.src} />
              <Image src={appstore.src} />
            </Stack>
          </VStack>
          <Box display={display} w={boxWidth} marginTop={marginTop}>
            <Image src={image?.src} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default BannerInfo;
