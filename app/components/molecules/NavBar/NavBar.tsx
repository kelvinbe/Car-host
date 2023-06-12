import React from "react";
import { Flex, Button, Link } from "@chakra-ui/react";

interface IProps {
  navItems: {
    text: string;
    link: string;
  }[];
}
const Navbar = (props: IProps) => {
  const { navItems } = props;
  return ( 
      <Flex direction={[ "column", "column","column","row"]} width={["full", "full", "full", "50%"]} gap={[2, 4, 4, 12]}>
        <Flex width={'1150px'} direction={[ "column","row"]} gap={[3,12]} justify={['center', 'center', 'center', 'start']}>
          {navItems.map((item, index) => (
            <Link  href={item.link} key={index} fontWeight={'bold'} textAlign={['center', 'center', 'center', 'left']}>
              {item.text}
            </Link>
          ))}
        </Flex>
        <Flex justify={['center', 'center', 'center', 'start']} >
            <Button variant={'outline'} borderColor="red" mt={'-1.5'} _hover={{
                background: "red",
                color: "white",
            }}>Sign In</Button>
        </Flex>
      </Flex>
  );
};

export default Navbar;
