import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CreatePassword from "./CreatePassword";

const testFunc = jest.fn();
const testFunc1 = jest.fn();
describe('Tests the CreatePassword component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<CreatePassword onValidPasswordCreated={testFunc} onForgotPasswordHandler={testFunc1}/>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    });

    it('Tests the password field', ()=>{
        render(<CreatePassword onValidPasswordCreated={testFunc} onForgotPasswordHandler={testFunc1}/>);
        const input = screen.getByPlaceholderText('Confirm Password');
        fireEvent.change(input, {target: {value: 'test@123'}}) 
        expect(input.value).toBe('test@123')
    })
})