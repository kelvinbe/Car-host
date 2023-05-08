import React from "react";
import ErrorComponent from "./ErrorComponent";
import { render, screen } from "@testing-library/react";

describe('Tests the ErrorComponent', ()=>{
    it('Tests if the component mounts',()=>{
        const {baseElement}=render(<ErrorComponent error={{message: 'Invalid username or email'}}/>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Invalid username or email')).toBeInTheDocument();
        expect(screen.getByText('An error occured')).toBeInTheDocument();
    })
})