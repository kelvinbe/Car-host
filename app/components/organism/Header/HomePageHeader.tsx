import React from "react";
import Navbar from "../../molecules/NavBar/NavBar";
import Logo from "../../atoms/Brand/Logo";
import { Flex } from "@chakra-ui/react";

const navItems = [
  {
    link: "#",
    text: "About Us",
  },
  {
    link: "#",
    text: "Corporate Housing",
  },
  {
    link: "#",
    text: "List Your Housing",
  },
  {
    link: "#",
    text: "Get Started",
  },
];
const HomePageHeader = () => {
  return (
    <Flex
      direction={["column", "column", "column", "row"]}
      width={"full"}
      borderBottom={"1px"}
      borderColor={"gray.300"}
      paddingBottom={"0"}
      paddingTop={"36px"}
    >
      <Flex
        width={["full", "full", "full", "50%"]}
        justify={["center", "center", "center", "start"]}
        marginBottom={'20px'}
        marginX={["0", "0", "0", "20"]}
        marginTop={'-18px'}
      >
        <Logo />
      </Flex>
      <Navbar navItems={navItems} />
    </Flex>
  );
};

export default HomePageHeader;
