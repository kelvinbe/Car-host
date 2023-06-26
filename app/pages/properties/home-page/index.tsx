import React from "react";
import HomePageHeader from "../../../components/organism/Header/HomePageHeader";
import { Flex } from "@chakra-ui/react";
import HomePageAboutUS from "../../../components/organism/AboutUs/HomePageAboutUS";
import HomePagePropertyList from "../../../components/organism/PropertyList/HomePagePropertyList";
import RecommendedDestinations from "../../../components/organism/RecommendedDestinations/RecommendedDestinations";
import PropertiesFooter from "../../../components/organism/Footer/PropertiesFooter";
import { GetServerSideProps } from "next";
import { PagePhaseProps } from "../../../types";

const HomePage = () => {
  return (
    <div style={{ width: "100%" }}>
      <HomePageHeader />
      <Flex direction={"column"} marginX={["0", "0", "0", "20"]}>
        <HomePageAboutUS />
        <HomePagePropertyList />
        <RecommendedDestinations />
      </Flex>
      <PropertiesFooter />
    </div>
  );
};

export default HomePage;


export const getServerSideProps: GetServerSideProps<PagePhaseProps> = async () => {
  return {
    props: {
      phase: "ph2"
    }
  }
}