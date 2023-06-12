import React from "react";
import PropertyAmenities from "./PropertyAmenities";
import { render, screen } from "@testing-library/react"; 
import {CgGym} from 'react-icons/cg'
import { BiBed } from "react-icons/bi";
import { MdShower } from "react-icons/md";




const BookingProperty = {
    propertyHousingDetails: [{"features":"1 Bed","housingType":"King size","icons":<BiBed size={20}  />},
                                {"features":"2 Baths","housingType":"2 Bathrooms","icons":<MdShower size={20} />}],
    propertyInfo: 'This sparkling new one-bedroom is found within the Kurve on Wilshire apartment community in the heart of Koreatown. Kurve balances bustling city-living with easy access to the open outdoors and offers designer residences within a community focused on wellness.',
    propertyAmenities: [
        {icon:<BiBed size={25} /> , amenity: 'Air Conditioning'},
        {icon:<CgGym  size={25}  /> , amenity: 'Gym' }
    ]

}


beforeEach(()=>{
    render(<PropertyAmenities bookingProperty={BookingProperty} />)
})
describe('Tests the PropertyAmenities Component', ()=>{
    it('Tests if the PropertyAmenities component mounts', ()=>{
        expect(screen.getByTestId('PropertyAmenities')).toBeInTheDocument()  
    })
})