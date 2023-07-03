import React from "react"
import {
  Box,
  Text,
  Image,
  Flex,
  VStack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react"
import playstore from "../../../public/images/play.png"
import appstore from "../../../public/images/appstore.png"
import Link from "next/link"

interface iProps {
  letterSpacing?: string
  direction: "row" | "column"
  display: string
  image: string
  disImage?: string
  textColor: string
  boxWidth?: string
  textWidth: string
  flexDirection?: "column" | "column-reverse" | "row" | "row-reverse"
  justifyContent?: string
  alignItems?: string
  align: string
  marginTop?: string
  showText: boolean
  spacing: number
  noStyleText?: boolean
  textAlign?: "left" | "right" | "center" | "justify"
  boxPosition?: "absolute" | "relative"
  right?: string
  imageWidth?: string
  vStackPosition?: "relative" | "absolute"
  left?: string
  marginLeft?: string
  id?: number
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
    boxPosition,
    right,
    imageWidth,
    vStackPosition,
    left,
    marginLeft,
    id,
  } = props

  const [isLargerThan800] = useMediaQuery("(min-width: 1279px)")
  const [isLargerThan1500] = useMediaQuery("(min-width: 1800px)")
  const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)")

  const textStyle = {
    fontSize: "20px",
  }

  return (
    <Box>
      <Box h={"100%"}>
        <Flex
          flexDirection={flexDirection}
          alignItems={alignItems}
          justifyContent={justifyContent}
          marginTop={marginTop}
          w={"100%"}
        >
          <VStack
            paddingTop={isLargerThan800 ? "100px" : "125px"}
            marginLeft={marginLeft}
            align={align}
            spacing={spacing}
            position={vStackPosition}
            left={left}
            data-testid="banner-info"
          >
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
                <Text
                  fontSize={
                    isLargerThan800 && !isLargerThan1500 ? "63px" : "86px"
                  }
                >
                  HOST CAR
                </Text>
                <Text
                  fontSize={
                    isLargerThan800 && !isLargerThan1500 ? "63px" : "86px"
                  }
                >
                  <span style={{ color: "#FC346A" }}>SHARING</span> APP
                </Text>
              </>
            ) : (
              !noStyleText && (
                <Text
                  letterSpacing="0.1955em"
                  fontSize={
                    isLargerThan800 && !isLargerThan1500 && id === 4
                      ? "55px"
                      : "76px"
                  }
                >
                  HOST CAR <span style={{ color: "#FC346A" }}>SHARING</span> APP
                </Text>
              )
            )}
            {noStyleText && (
              <Text
                letterSpacing="0.1955em"
                textColor="white"
                fontSize={
                  isLargerThan800 && !isLargerThan1500 ? "93px" : "96px"
                }
              >
                HOST CAR SHARING APP
              </Text>
            )}
            <Text
              textColor={textColor}
              w={textWidth}
              textAlign={textAlign}
              sx={textStyle}
            >
              In today&apos;s fast-paced and constantly evolving world, Divvly Car
              Rental System emerges as the epitome of convenience and efficiency
              when it comes to renting a car. Our platform, designed with the
              utmost user-friendliness in mind, caters to your every need,
              ensuring a hassle-free and seamless car rental experience.
            </Text>
            <Stack direction={direction} spacing={6}>
              <Link href="https://www.apple.com/app-store/" target="blank">
                <Image src={playstore.src} alt="Download from PlayStore" />
              </Link>
              <Link href="https://www.apple.com/app-store/" target="blank">
                <Image src={appstore.src} alt="Download from AppStore" />
              </Link>
            </Stack>
          </VStack>
          <Box display={display}>
            <Image
              paddingTop={
                isLargerThan800 && !isLargerThan1500 && id !== 4
                  ? "77px"
                  : isLargerThan1500 && id !== 4
                  ? "177px"
                  : ""
              }
              marginTop={
                isLargerThan1500 && !isLargerThan2000 && id !== 4
                  ? "-130px"
                  : isLargerThan2000 && id !== 4
                  ? "-130px"
                  : ""
              }
              src={image ? `/images/${image}` : undefined}
              w={"40%"}
              position={boxPosition}
              right={right}
              alt="Display divvly"
              data-testid="banner-info-img"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default BannerInfo
