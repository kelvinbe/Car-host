import React from "react";
import LoadingComponent from "./LoadingComponent";
import { render, screen } from "@testing-library/react";

describe('Tests the Loading component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<LoadingComponent/>)
        expect(baseElement).toBeTruthy();
        expect(screen.getAllByText('Loading...')).toBeTruthy();
    })
})