import React from "react";
import FullCallender from "./FullCallender";
import { render } from "@testing-library/react";

describe('Tests the Availability feature', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<FullCallender/>)
        expect(baseElement).toBeTruthy()
    })
})