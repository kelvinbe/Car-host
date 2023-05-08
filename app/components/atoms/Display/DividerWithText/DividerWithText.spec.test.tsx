import React from "react";
import { screen, render } from "@testing-library/react";
import DividerWithText from "./DividerWithText";

describe('Tests the DividerWithText component',()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} =render(<DividerWithText>Just a sample text</DividerWithText>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Just a sample text')).toBeInTheDocument();
    })
})