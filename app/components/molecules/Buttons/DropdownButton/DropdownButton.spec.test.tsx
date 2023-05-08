import React from "react";
import DropdownButton from "./DropdownButton";
import { fireEvent, render, screen } from "@testing-library/react"; 

const testFunc = jest.fn();
const testFunc1 = jest.fn()
beforeEach(()=>{
    render(
        <DropdownButton icon={'Icon'} isActive={true} toggleDropdown={testFunc} onClick={testFunc1}>Drop down</DropdownButton>
    )
}) 


describe('Tests the DropdownButton component', ()=>{
    it('Tests if the component renders', ()=>{
        expect(screen.getByText('Drop down')).toBeInTheDocument();
    })

    it('Tests the dropdown functions',()=>{
        const button =  screen.getByRole('button');
        fireEvent.click(button)
        expect(testFunc).toBeCalled();
        expect(testFunc).toBeCalled();
    })
}) 


