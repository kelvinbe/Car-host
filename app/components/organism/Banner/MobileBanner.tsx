import React, { useCallback, useEffect, useState } from "react";
  
import {
    Box,
    Text,
    Image,
    Flex,
    VStack,
    Stack,
    useMediaQuery
  } from "@chakra-ui/react";
import image from "next/image";
import Link from "next/link";
import playstore from "../../../public/images/play.png";
import appstore from "../../../public/images/appstore.png";


const MobileBanner = () => {

    const [isLargerThan800] = useMediaQuery('(min-width: 1680px)', {
        ssr: true,
        fallback: true, // return false on the server, and re-evaluate on the client side
      })

  return (
    <Box
      w="full"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      id="banner"
      bg="#FF8B83 75%"
      marginTop={'-108px'}
      h={'full'}
    >

      
        <Flex  flexDirection={'column'} justifyContent={'center'} alignItems={'center'} paddingTop={isLargerThan800 ? "100px" : '125px'} marginBottom={'50px'}  data-testid = 'banner-info'>
            <Text
              textTransform="uppercase"
              fontSize="24px"
              style={{ color: 'white' }}
            >
              Introducing
            </Text>
              <>
                <Text style={{color: 'white'}} fontSize={'63px'}>HOST CAR</Text>
                <Text style={{ color: 'white' }} fontSize={'63px'}>
                  <span style={{ color: 'white' }}>SHARING</span> APP
                </Text>
              </>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus.
            </Text>
            <Stack direction={'column'} justifyContent={'center'} spacing={6}>
              <Link href='https://www.apple.com/app-store/' target="blank">
                <Image src={playstore.src} alt='Download from PlayStore'/>
              </Link>
              <Link href='https://www.apple.com/app-store/' target="blank">
              <Image src={appstore.src} alt='Download from AppStore'/>
              </Link>             
            </Stack>
          </Flex>
    </Box>
  );
};

export default MobileBanner;
