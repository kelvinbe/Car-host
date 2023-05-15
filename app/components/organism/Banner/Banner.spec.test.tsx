import React from "react";
import Banner from "./Banner";
import { render, screen } from "@testing-library/react"; 


describe('Tests the Banner component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} = render(<Banner/>) 
        expect(screen.getAllByRole('img').length).toBe(3)
    })
})