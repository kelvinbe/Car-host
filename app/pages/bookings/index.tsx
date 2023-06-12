import React from "react"
import Gallery from "../../components/molecules/Gallery/Gallery"
import { Box, Flex } from "@chakra-ui/react"
import BookingPropertySection from "../../components/organism/BookingsPropertySection/BookingPropertySection"
import PropertiesFooter from "../../components/organism/Footer/PropertiesFooter"
import HomePageHeader from "../../components/organism/Header/HomePageHeader"
import PropertySearch from "../../components/molecules/PropertySearch/PropertySearch"




// @todo This Image values are only being hard coded until the API and the Global State are hooked up
const images = [
  "https://images.pexels.com/photos/9390250/pexels-photo-9390250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/4031013/pexels-photo-4031013.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/3769443/pexels-photo-3769443.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/9130978/pexels-photo-9130978.jpeg?auto=compress&cs=tinysrgb&w=1600",
]
 // @todo This data is only being hard coded until the API and the Global state are hooked up
const locations = ['Nairobi', 'Mombasa']
const amenities = ['Showers', 'Baths']



const Bookings = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Flex flexDirection={"column"}>
        <HomePageHeader />
        <Box marginTop={'40px'}>
        <PropertySearch  locations={locations} amenities={amenities} filteredSearchResults={amenities} setSearchData={() => {}}/>
        </Box>
        <Gallery images={images} />
        <BookingPropertySection />
        <PropertiesFooter />
      </Flex>
    </div>
  )
}

export default Bookings
