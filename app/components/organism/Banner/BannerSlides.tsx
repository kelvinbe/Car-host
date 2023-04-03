import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import BannerInfo from "../../molecules/BannerInfo/BannerInfo";

export const SlideWithBgImage = ({ banner }:any) => {
  return (
    <Box
      w="full"
      h="calc(100vh)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      marginTop="-124px"
      top="0px"
      left="0px"
      position="relative"
      bgRepeat="no-repeat"
      bgImage={banner.image}
      bgSize={banner.id === 2 ? "" : "cover"}
      opacity={10}
      bgPosition={banner.id === 2 ? "right !important" : ""}
    >
      {banner.id === 1 ? (
        <BannerInfo
          letterSpacing=""
          direction="row"
          display="block"
          image={banner.disImage}
          textColor=""
          boxWidth="full"
          imageWidth="1000px"
          textWidth="480px"
          align="start"
          showText={true}
          spacing={1}
          noStyleText={false}
          textAlign="left"
          vStackPosition="absolute"
          left = "200px"
          boxPosition="absolute"
          right="0px"
          marginTop="-300"
        />
      ) : banner.id === 2 ? (
        <BannerInfo
          letterSpacing=""
          direction="row"
          display="block"
          image={banner.disImage}
          textColor=""
          boxWidth="1000px"
          imageWidth="1000px"
          textWidth="480px"
          align="start"
          showText={true}
          spacing={1}
          noStyleText={false}
          textAlign="left"
        />
      ) : banner.id === 3 ? (
        <BannerInfo
          letterSpacing="1em"
          direction="row"
          display="none"
          image={banner.disImage}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          boxWidth="600px"
          textWidth="880px"
          align="center"
          marginTop="40px"
          showText={false}
          spacing={4}
          textColor="white"
          noStyleText={true}
          textAlign="center"
        />
      ) : null}
    </Box>
  );
};

export const Slide = ({ banner }:any) => {
  return (
    <Box
      w="full"
      h="calc(100vh)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      marginTop="-124px"
      flexDirection="column"
      top="-2px"
      left="0px"
      opacity={10}
    >
      <BannerInfo
        letterSpacing="1em"
        direction="row"
        display="block"
        image={banner.disImage}
        textColor=""
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        boxWidth="600px"
        textWidth="880px"
        align="center"
        marginTop="40px"
        showText={false}
        spacing={4}
      />
    </Box>
  );
};

export const BannerSlides = ({ banner }:any) => {
  return (
    <section>
      <SlideWithBgImage banner={banner} />
    </section>
  );
};
