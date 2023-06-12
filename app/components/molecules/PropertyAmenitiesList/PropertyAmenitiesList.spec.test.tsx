import React from "react";
import PropertyAmenitiesList from "./PropertyAmenitiesList";
import { render, screen } from "@testing-library/react"; 
import {CgGym} from 'react-icons/cg'
import { BiBed } from "react-icons/bi";


 const Properties = [
    {icon:<BiBed size={25} /> , amenity: 'Bedrooms'},
    {icon:<CgGym  size={25}  /> , amenity: 'Gym' }
]


beforeEach(()=>{
    render(<PropertyAmenitiesList viewAllAmenities={false} propertyAmenities={Properties} />)
})
describe('Tests the PropertyAmenitiesList Component', ()=>{
    it('Tests if the PropertyAmenitiesList component mounts', ()=>{
        expect(screen.getByTestId('PropertyAmenitiesList')).toBeInTheDocument()  
    })
})