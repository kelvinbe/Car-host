import React from "react";
import Banner from "./Banner";
import { render, screen } from "@testing-library/react"; 

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('Tests the Banner component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} = render(<Banner/>) 
        expect(screen.getAllByRole('img').length).toBe(3)
    })
})