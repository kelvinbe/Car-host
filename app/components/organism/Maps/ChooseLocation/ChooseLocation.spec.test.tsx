import React from "react";
import ChooseLocation from "./ChooseLocation";
import { render, screen } from "@testing-library/react"; 

const testFunc = jest.fn()
describe('Tests the ChooseLocation component', ()=>{
    it('Tests if the component mounts',()=>{
        const{baseElement}=render(<ChooseLocation onChange={testFunc}/>)
        expect(baseElement).toBeTruthy()
    })
})