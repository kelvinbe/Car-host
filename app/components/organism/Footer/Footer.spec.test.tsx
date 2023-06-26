import React from "react";
import Footer from "./Footer";
import { render, screen } from "@testing-library/react";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('Tests the footer component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<Footer/>) 
        const links = screen.getAllByRole('link')
        expect(screen.getByText('End User License Agreement')).toBeInTheDocument();
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(links[0]).toHaveAttribute('href', 'https://twitter.com/')
        expect(screen.getByText(`Divvly Copyright ${(new Date()).getFullYear()}. All rights reserved`)).toBeInTheDocument()
    })
})