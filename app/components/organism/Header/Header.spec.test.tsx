import React from "react";
import Header from "./Header";
import { render, screen } from "@testing-library/react";

describe('Tests the Header component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<Header/>)
        expect(screen.getByText('Want to list your vehicle?')).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    })
})