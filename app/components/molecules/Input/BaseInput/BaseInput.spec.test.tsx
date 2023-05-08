import React from "react";
import BaseInput from "./BaseInput";
import { fireEvent, render, screen } from "@testing-library/react";

const testFunc=jest.fn();
describe('Tests the BaseInput component',()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<BaseInput placeholder="first name" formLabel="First Name" onChangeText={testFunc}/>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByLabelText('First Name')).toBeTruthy();
        expect(screen.getByPlaceholderText('first name')).toBeTruthy();
    }) 

    it('Tests the text value on change', ()=>{
        render(<BaseInput placeholder="first name" formLabel="First Name" onChangeText={testFunc}/>)
        const input  = screen.getByRole('textbox')
        fireEvent.change(input, {target: {value: 'name'}})
        expect(testFunc).toHaveBeenCalled()
    })
})