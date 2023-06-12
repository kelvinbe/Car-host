import React from "react";
import { render, screen } from "@testing-library/react"; 
import BookSummaryCard from "./BookSummaryCard";


const booksummaryCardData = {
    hostFee: "509",
    serviceFee: 50,
    dates: "May 21",
    total: 519.98,
    taxFee: 44,
    amenities: "3Guests, 2Pets",
  }





beforeEach(()=>{
    render(<BookSummaryCard
        amenities={booksummaryCardData.amenities}
        dates={booksummaryCardData.dates}
        hostFee={booksummaryCardData.hostFee}
        serviceFee={booksummaryCardData.serviceFee}
        taxFee={booksummaryCardData.taxFee}
        total={booksummaryCardData.total}
      /> )
})
describe('Tests the BookSummaryCard Component', ()=>{
    it('Tests if the BookSummaryCard component mounts', ()=>{
        expect(screen.getByTestId('BookSummaryCard')).toBeInTheDocument()  
    })
})