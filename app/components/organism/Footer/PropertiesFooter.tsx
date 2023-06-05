import React,{ChangeEvent, useState} from "react";
import Logo from "../../atoms/Brand/Logo";
import { Flex, Stack, Text, Select, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillApple, AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { MdFacebook } from "react-icons/md";
import { TiSocialLinkedinCircular } from 'react-icons/ti';

const PropertiesFooter = () => {
  const [language, setLanguage]=useState<string>('English')
  const handleLanguageSelect=(e: ChangeEvent)=>{
    setLanguage((e.target as HTMLSelectElement).value)
  }
  return (
    <Flex
      direction={"column"}
      width={"full"}
      css={{background: "linear-gradient(105.73deg, rgba(10, 7, 7, 0.45) 23.42%, rgba(6, 9, 12, 0.1935) 67.3%),linear-gradient(0deg, #808285, #808285)"}}
      color={"white"}
      px={"20"}
      py={'10'}
    >
      <Flex width={"full"} direction={{sm: 'column', md:'column', lg:'row'}} gap={'8'}>
        <Flex direction={"column"} gap={'20'} width={{md:'full', lg:'50%'}}>
          <Flex>
            <Logo />
          </Flex>
          <Flex>
            <Stack direction={"column"} spacing={4}>
              <Link href="https://www.apple.com/app-store/" target="blank">
                <Flex color={'black'} bg={'white'} px={'2'} py={'1'} borderRadius={'10px'} width={'auto'} gap={'2'}>
                    <Flex align={'center'}>
                        <AiFillApple size={40}/>
                    </Flex>
                    <Flex direction={'column'} align={'center'}>
                        <Text size={'sm'}>Download On The</Text>
                        <Text size={'md'} as={'b'}>App Store</Text>
                    </Flex>
                </Flex>
              </Link>
              <Link href="https://www.apple.com/app-store/" target="blank">
                <Flex color={'black'} bg={'white'} px={'2'} py={'1'} borderRadius={'10px'} width={'auto'} gap={'2'}>
                    <Flex align={'center'}>
                        <IoLogoGooglePlaystore size={35}/>
                    </Flex>
                    <Flex direction={'column'} align={'center'}>
                        <Text size={'sm'}>Get It On</Text>
                        <Text size={'md'} as={'b'}>Google Play</Text>
                    </Flex>
                </Flex>
              </Link>
            </Stack>
          </Flex>
          <Flex w={'190px'}>
          <Select placeholder="Languages" w={'full'} onChange={handleLanguageSelect}>
            <option value={'English'}>English</option>
          </Select>
          </Flex>
        </Flex>
        <Flex width={{sm: 'full', md:'full', lg:'50%'}} gap={{sm: 10, lg:'20'}} pl={{sm: 0, lg: '6'}}>
          <Flex direction={'column'} gap={'8'}>
            <Heading size={'md'}>Explore</Heading>
            <Link href={'#'}>About Us</Link >
            <Link href={'#'}>Contact Us</Link >
            <Link href={'#'}>FAQ</Link >
            <Link href={'#'}>Privacy Policy</Link >
          </Flex>
          <Flex direction={'column'} gap={'8'}>
          <Heading size={'md'}>Join Us</Heading>
            <Link href={'#'}>Advertise With Us</Link >
          </Flex>
          <Flex direction={'column'} gap={'8'}>
            <Heading size={'md'}>Policies</Heading>
            <Link href={'#'}>Privacy</Link >
            <Link href={'#'}>Terms Of Use</Link >
            <Link href={'#'}>Divvly Terms & Conditions</Link >
          </Flex>
        </Flex>
      </Flex>
      <Flex width={"full"} align={'center'} direction={'column'} gap={'3'} p={'4'}>
        <Flex gap={'5'}>
            <AiFillTwitterCircle size={'30'}/>
            <MdFacebook size={'30'}/>
            <TiSocialLinkedinCircular size={'30'}/>
        </Flex>
        <Text>Copyright {new Date().getFullYear()}. All rights reserved. Divvly.com.</Text>
      </Flex>
    </Flex>
  );
};

export default PropertiesFooter;

