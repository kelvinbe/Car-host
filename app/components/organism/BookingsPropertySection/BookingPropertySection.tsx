import { Flex, Heading, Modal, ModalContent, ModalOverlay, Text, useDisclosure,  } from "@chakra-ui/react"
import React, { useState } from "react"
import RatingTitle from "../../atoms/RatingTitle/RatingTitle"
import PropertyAmenities from "../PropertyAmenities/PropertyAmenities"
import BookNowCard from "../../atoms/Card/BookNowCard/BookNowCard"
import { BiBed, BiSwim } from "react-icons/bi"
import { MdShower, MdOutlineAir } from "react-icons/md"
import { TbBox } from "react-icons/tb"
import { IoLogoNoSmoking } from "react-icons/io5"
import { MdWash, MdOutlineNetworkCheck, MdOutlineBathtub } from "react-icons/md"
import { CiParking1 } from "react-icons/ci"
import { SlScreenDesktop } from "react-icons/sl"
import { CgGym } from "react-icons/cg"
import BookSummaryCard from "../../atoms/Card/BookSummaryCard/BookSummaryCard"

// @todo This data is only being hard coded until the API and the Global State are hooked up
const BookingProperty = {
  propertyHousingDetails: [
    { features: "1 Bed", housingType: "King size", icons: <BiBed size={20} /> },
    {
      features: "2 Baths",
      housingType: "2 Bathrooms",
      icons: <MdShower size={20} />,
    },
    { features: "1340 ft", housingType: "Condo", icons: <TbBox size={20} /> },
  ],
  propertyInfo:
    "This sparkling new one-bedroom is found within the Kurve on Wilshire apartment community in the heart of Koreatown. Kurve balances bustling city-living with easy access to the open outdoors and offers designer residences within a community focused on wellness.",
  propertyAmenities: [
    { icon: <MdOutlineAir size={25} />, amenity: "Air Conditioning" },
    { icon: <IoLogoNoSmoking size={25} />, amenity: "No Smoking" },
    { icon: <MdWash size={25} />, amenity: "Washer & Dryer" },
    { icon: <CiParking1 size={25} />, amenity: "Parking" },
    { icon: <BiSwim size={25} />, amenity: "Swimming Pool" },
    { icon: <MdOutlineNetworkCheck size={25} />, amenity: "Internet" },
    { icon: <MdOutlineBathtub size={25} />, amenity: "Hot Tub" },
    { icon: <SlScreenDesktop size={25} />, amenity: "Tv" },
    { icon: <CgGym size={25} />, amenity: "Gym" },
  ],
}

// @todo This data is only being hard coded until the API and the Global State are hooked up

const booknowCardData = {
  price: "509",
  ratings: 8.8,
  dates: "May 21",
  total: 519.98,
  reviews: 44,
  amenities: "3Guests, 2Pets",
  title: "Airy 1BR in Koreatown with Rooftop Park + Pets OK",
}


const booksummaryCardData = {
  hostFee: "509",
  serviceFee: 50,
  dates: "May 21",
  total: 1112,
  taxFee: 44,
  amenities: "3Guests, 2Pets",
}

const BookingPropertySection = () => {

  const [booking, setBooking] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex marginTop={"18px"} flexDirection={"column"}>
      <RatingTitle
        ratings={booknowCardData.ratings}
        title={booknowCardData.title}
      />
      <Flex>
        <PropertyAmenities bookingProperty={BookingProperty} />
       {isOpen && 
       <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
       <BookSummaryCard
          amenities={booknowCardData.amenities}
          dates={booksummaryCardData.dates}
          hostFee={booksummaryCardData.hostFee}
          serviceFee={booksummaryCardData.serviceFee}
          taxFee={booksummaryCardData.taxFee}
          total={booksummaryCardData.total}
        />
        </ModalContent>
        </Modal>
        
        }

        <BookNowCard
          amenities={booknowCardData.amenities}
          reviews={booknowCardData.reviews}
          price={booknowCardData.price}
          ratings={booknowCardData.ratings}
          dates={booknowCardData.dates}
          total={booknowCardData.total}
          onClick={onOpen}
        />
      </Flex>
      <Heading>About This Area</Heading>
      <Flex>
        <Text marginTop={"10px"} marginBottom={"50px"} width={'1392px'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar.Maecenas eget condimentum velit,
          sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Praesent auctor
          purus luctus enim egestas, ac scelerisque ante pulvinar. Maecenas eget
          condimentum velit, sit amet feugiat lectus. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque
          ante pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
          dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
          ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
          sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos.
        </Text>
      </Flex>
    </Flex>
  )
}

export default BookingPropertySection
