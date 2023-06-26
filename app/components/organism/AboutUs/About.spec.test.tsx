import React from "react";
import AboutUs from "./AboutUs";
import { render, screen } from "@testing-library/react";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('It Tests the AboutUs component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<AboutUs/>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('About Us')).toBeInTheDocument()
        expect(screen.getByText('DOWNLOAD DIVVLY')).toBeInTheDocument()
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})