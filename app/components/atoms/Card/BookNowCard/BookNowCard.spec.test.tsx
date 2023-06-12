import React from "react";
import BookNowCard from "./BookNowCard";
import { render, screen } from "@testing-library/react"; 


const booknowCardData = {
    price: "509",
    ratings: 8.8,
    dates: "May 21",
    total: 519.98,
    reviews: 44,
    amenities: "3Guests, 2Pets",
    title: 'Airy 1BR in Koreatown with Rooftop Park + Pets OK'
  }





beforeEach(()=>{
    render(<BookNowCard
    amenities={booknowCardData.amenities}
    reviews={booknowCardData.reviews}
    price={booknowCardData.price}
    ratings={booknowCardData.ratings}
    dates={booknowCardData.dates}
    total={booknowCardData.total}
  /> )
})
describe('Tests the BookNowCard Component', ()=>{
    it('Tests if the BookNowCard component mounts', ()=>{
        expect(screen.getByTestId('BookNowCard')).toBeInTheDocument()  
    })
})