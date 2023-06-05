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
      paddingTop={"12"}
    >
      <Flex
        width={["full", "full", "full", "50%"]}
        justify={["center", "center", "center", "start"]}
        marginBottom={[4, 4, 4, 0]}
        marginX={["0", "0", "0", "20"]}
      >
        <Logo />
      </Flex>
      <Navbar navItems={navItems} />
    </Flex>
  );
};

export default HomePageHeader;
