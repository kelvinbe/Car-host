import React from "react";
import Appfeature from "./Appfeature";
import { render, screen } from "@testing-library/react";

describe('Tests the AppFeature component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<Appfeature/>) 
        expect(baseElement).toBeTruthy()
        expect(screen.getByText('For Guests')).toBeInTheDocument()
        expect(screen.getByText('For Hosts')).toBeInTheDocument()
        expect(screen.getByText('App Features')).toBeInTheDocument()
        expect(screen.getAllByRole('link').length).toBe(3)
    })
})