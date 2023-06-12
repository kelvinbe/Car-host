import React from "react";
import RatingTitle from "./RatingTitle";
import { render, screen } from "@testing-library/react"; 

beforeEach(()=>{
    render(<RatingTitle  ratings={8.8} title="Airy 1BR in Koreatown with Rooftop Park + Pets OK"/>)
})
describe('Tests the RatingTitle Component', ()=>{
    it('Tests if the RatingTitle component mounts', ()=>{
        expect(screen.getByTestId('RatingTitle')).toBeInTheDocument()  
    })
})