import React from "react";
import BookRide from "./BookRide";
import { render, screen } from "@testing-library/react"; 

describe('Tests the BookRide component',()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<BookRide></BookRide>)
        const link = screen.getAllByRole('link')[0]
        expect(baseElement).toBeTruthy()
        expect(screen.getByText('Book Your Ride')).toBeInTheDocument()
        expect(screen.getByText('Get Started')).toBeInTheDocument()
        expect(screen.getByText('List Your Vehicle')).toBeInTheDocument()
        expect(link).toHaveAttribute('href', 'https://www.apple.com/app-store/')
        expect(screen.getAllByRole('img').length).toBe(3)
    })
})