import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { TbCalendar } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { RiEqualizerLine } from "react-icons/ri";
import PropertyPriceFilter from "../Card/PropertyPriceFilter";
import PropertiesFilter from "../../organism/Modals/PropertiesFilter";
import PropertyLocations from "../Card/PropertyLocations";
import Amenities from "../Card/Amenities";
import GuestCount from "../Card/GuestCount";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import 'react-day-picker/dist/style.css';

export interface IFilterData {
  location?: string;
  checkIn?: Date | string;
  checkOut?: Date | string;
  guests?: number | string;
  priceRange?: number[];
  beds?: number;
  bedrooms?: number;
  baths?: number;
  amenities?: (string| number)[];
  rateType?: string;
  adults?: number;
  kids?: number;
  pets?: number;
}

interface IProps{
  setSearchData: (searchData: IFilterData)=>void;
  filteredSearchResults: any[];
  locations: string[];
  amenities: string[];
}

const PropertySearch = (props: IProps) => {
  const {setSearchData, filteredSearchResults, locations, amenities} = props
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [filterData, setFilterData] = useState<Partial<IFilterData>>({});
  const [isLocationsVisible, setIsLocationsVisible] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [guests, setGuests] = useState<number>(0);

  const checkInDisabledDays = [
    { from: new Date(2000, 1, 1), to: new Date(dayjs().subtract(1, 'day').format('YYYY,MM,DD'))}
  ];
 const checkoutDisabledDays = [
  { from: new Date(2000, 1, 1), to: new Date(dayjs(checkInDate).format('YYYY,MM,DD'))}
];
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast()

  const handleViewFilters = ()=>{
    onOpen()
  }
  const updateFilterData = (filterData: Partial<IFilterData>)=>{
    setFilterData((prev)=>({...prev, ...filterData}));
  }

  const filterSearchResults = ()=>{
    setSearchData && setSearchData(filterData);
    onClose();
  }

  const setLocation = (location: string)=>{
    setFilterData((prev)=>({...prev, location: location}));
  }

  const handleLocationFocus=()=>{
    setIsLocationsVisible(true)
  }
 
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function outOfLocationFocus(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsLocationsVisible(false);
      }
    }
    document.addEventListener("click", outOfLocationFocus);

    return () => document.addEventListener("click", outOfLocationFocus);
  }, []);

  useEffect(()=>{
    setFilterData({...filterData, checkIn: checkInDate, checkOut: checkOutDate})
  },[checkInDate, checkOutDate])

  useEffect(()=>{
    setSearchData(filterData)
  },[filterData])
  const filteredLocations = locations?.filter((location: string)=>location.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  console.log(filterData)
  return (
    <Flex width={["100%","100%","100%", "80%"]} direction={"column"} gap={"6"}>
      <PropertiesFilter 
        isOpen={isOpen} 
        onClose={onClose} 
        amenities={amenities} 
        filterData={filterData} 
        setFilterData={setFilterData} 
        filterResultsNumber={filteredSearchResults?.length} 
        filterSearchResults={filterSearchResults}
      />
      <Flex gap={"4"} width={"full"} direction={['column', 'column','row']}>
        <Flex position={'relative'} ref={divRef} width={["100%","100%",'25%']}>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <Search2Icon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder={"Where To?"}
              borderColor={"gray.400"}
              _placeholder={{ color: "black", fontWeight: "bold" }}
              onChange={(e)=>setSearch(e.target.value)}
              onFocus={handleLocationFocus}
              size={"lg"}
            />
          </InputGroup>
          <Flex position={'absolute'} top={'14'} zIndex={1}>
            {isLocationsVisible ? <PropertyLocations locations={filteredLocations} setLocation={setLocation} setIsLocationsVisible={setIsLocationsVisible}/>: null}
          </Flex>
          
        </Flex>
        <Flex width={["100%","100%",'25%']}>
          <Menu>
          {({ isOpen, onClose }) => (
            <>
            <MenuButton 
              as={Button} 
              leftIcon={<TbCalendar size={20} />} 
              isActive={isOpen} 
              pl={3} 
              bg={'transparent'} 
              border={'1px'} 
              borderColor={"#6C757D"} 
              width={"full"} size={"lg"} 
              fontWeight={'bold'} 
              borderRadius={'8px'} 
              justifyContent={'left'}  
              textAlign={'left'}
              pb={1}
            >
              <Text pt={1.5}>{checkInDate? dayjs(checkInDate).format('DD/MM/YYYY') :'Check - In'}</Text>
            </MenuButton>
            <MenuList>
              <DayPicker
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                onDayClick={onClose}
                disabled={checkInDisabledDays}
              />
            </MenuList> 
            </>
             )} 
          </Menu>  
        </Flex>
        <Flex width={["100%","100%",'25%']}>
        <Menu>
          {({ isOpen, onClose }) => (
            <>
            <MenuButton 
              as={Button} 
              leftIcon={<TbCalendar size={20} />} 
              isActive={isOpen} 
              pl={3} 
              bg={'transparent'} 
              border={'1px'} 
              borderColor={"#6C757D"} 
              width={"full"} size={"lg"} 
              fontWeight={'bold'} 
              borderRadius={'8px'} 
              justifyContent={'left'}  
              textAlign={'left'}
              pb={1}
            >
              <Text pt={1.5}>{checkOutDate? dayjs(checkOutDate).format('DD/MM/YYYY') :'Check - Out'}</Text>
            </MenuButton>
            <MenuList width={'full'}>
              <DayPicker
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                onDayClick={onClose}
                disabled={checkoutDisabledDays}
              />
            </MenuList> 
            </>
             )} 
          </Menu>  
        </Flex>
        <Flex width={["100%","100%",'25%']}>
          <Menu>
          {({ isOpen, onClose }) => (
            <>
            <MenuButton 
              as={Button} 
              leftIcon={<BsPeople size={20} color="black" fontWeight={"bold"}/>} 
              isActive={isOpen} 
              pl={3} 
              bg={'transparent'} 
              border={'1px'} 
              borderColor={"#6C757D"} 
              width={"full"} size={"lg"} 
              fontWeight={'bold'} 
              borderRadius={'8px'} 
              justifyContent={'left'}  
              textAlign={'left'}
              pb={1}
            >
              <Text pt={1.5}>{guests > 0 ? `${guests} Guests`: 'Guests'}</Text>
            </MenuButton>
            <MenuList>
              <GuestCount onClose={onClose} updateFilterData={updateFilterData} setGuests={setGuests}/>
            </MenuList> 
            </>
             )} 
          </Menu>
        </Flex>
      </Flex>
      <Flex gap={"4"} flexWrap={'wrap'}>
        <Flex>
          <Button 
            bg={'transparent'} 
            gap={'3'} 
            border={'1px'} 
            borderColor={"#6C757D"} 
            width={"170px"} size={"lg"} 
            fontWeight={'normal'} 
            borderRadius={'12px'} 
            justifyContent={'left'} 
            p={3} 
            onClick={handleViewFilters}>
            <RiEqualizerLine size={20} color="black"/>  
            Filters
          </Button>
        </Flex>
        <Flex direction={'column'} position={'relative'}>
          <Menu>
          {({ isOpen, onClose }) => (
            <>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              isActive={isOpen} 
              pl={4} 
              bg={'transparent'} 
              border={'1px'} 
              borderColor={"#6C757D"} 
              width={"170px"} size={"lg"} 
              fontWeight={'normal'} 
              borderRadius={'12px'} 
              justifyContent={'left'} 
              pr={3} 
              textAlign={'left'}
            >
              Prices
            </MenuButton>
            <MenuList>
              <PropertyPriceFilter updateFilterData={updateFilterData} onClose={onClose}/>
            </MenuList> 
            </>
             )} 
          </Menu>
        </Flex>
        <Flex>
          <Menu>
            {({ isOpen, onClose }) => (
              <>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />} 
                isActive={isOpen} 
                pl={4} 
                bg={'transparent'} 
                border={'1px'} 
                borderColor={"#6C757D"} 
                width={"170px"} size={"lg"} 
                fontWeight={'normal'} 
                borderRadius={'12px'} 
                justifyContent={'left'} 
                pr={3} 
                textAlign={'left'}
              >
                Amenities
              </MenuButton>
              <MenuList>
              <Amenities amenities={amenities} filterSearchResults={filterSearchResults} onClose={onClose} setFilterData={setFilterData} filterData={filterData}/>
              </MenuList> 
              </>
              )} 
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PropertySearch;
