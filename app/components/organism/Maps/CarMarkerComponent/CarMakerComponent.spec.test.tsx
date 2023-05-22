import React from "react";
import CarMarkerComponent from "./CarMarkerComponent";
import { render } from "@testing-library/react";

describe('Tests the CarMarkerComponent', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<CarMarkerComponent />);
        expect(baseElement).toBeTruthy()
    })
})