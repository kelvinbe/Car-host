import React from "react";
import PropertyAmenitiesCard from "./PropertyAmenitiesCard";
import { render, screen } from "@testing-library/react"; 
import {CgGym} from 'react-icons/cg'




beforeEach(()=>{
    render(<PropertyAmenitiesCard features="1 bed room" icon={<CgGym />} housingType="1 bedroom" />)
})
describe('Tests the PropertyAmenitiesCard Component', ()=>{
    it('Tests if the PropertyAmenitiesCard component mounts', ()=>{
        expect(screen.getByTestId('PropertyAmenitiesCard')).toBeInTheDocument()  
    })
})