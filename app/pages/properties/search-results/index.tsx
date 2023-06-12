import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import PropertySearch, { IFilterData } from "../../../components/molecules/PropertySearch/PropertySearch";
import HomePageHeader from "../../../components/organism/Header/HomePageHeader";
import PropertiesFooter from "../../../components/organism/Footer/PropertiesFooter";
import Properties from "../../../components/organism/Properties/Properties";

const amenities = ['Pool', 'Bathtab', 'Air conditioning', 'Internet & wifi', 'Pooler', 'Bathtaber', 'Air conditioninger', 'Internet & wifier'];
const locations = ['Nairobi', 'Mombasa', 'Diani', 'Kisumu', 'Dar Es Salam', 'Kampala','Nairobi', 'Mombasa', 'Diani', 'Kisumu', 'Dar Es Salam', 'Kampala', ]

const ListYourProperties = () => {
  const [searchData, setSearchData] = useState<Partial<IFilterData>>({});
  const [filteredSearchResults, setFilteredSearchResults] = useState<any[]>([])
  return (
    <div style={{ width: "100%"}}>
      <HomePageHeader />
      <Flex direction={"column"} marginX={["6", "6", "20", "20"]} pt={'6'} pb={'16'}>
        <PropertySearch locations={locations} amenities={amenities} setSearchData={setSearchData} filteredSearchResults={filteredSearchResults}/>
        <Properties />
      </Flex>
      <PropertiesFooter />
    </div>
  );
};

export default ListYourProperties;
