import React from "react";
import StatusTag from "./StatusTag";
import { render, screen } from "@testing-library/react"; 

describe('Tests the Status Tag component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} = render(<StatusTag status="active">Active</StatusTag>)
        expect(baseElement).toBeTruthy();
        const status = screen.getByTestId('status-tag')
        expect(status.className).toBe('css-ot8775')
    })
})