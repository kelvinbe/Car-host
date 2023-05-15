import React from "react";
import LiveMapComponent from "./LiveMapComponent";
import { render, screen } from "@testing-library/react";

describe('Tests the LiveMap component', ()=>{
    it('Tests if the component mounts',()=>{
       const{baseElement}= render(<LiveMapComponent/>)
       expect(baseElement).toBeTruthy()
    })
})