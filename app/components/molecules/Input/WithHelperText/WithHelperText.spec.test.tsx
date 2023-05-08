import React from "react";
import WithHelperText from "./WithHelperText";
import { render, screen, fireEvent } from "@testing-library/react";
import ValidityCheck from "../../../atoms/Feedback/ValidityCheck/ValidityCheck";

const testFunc = jest.fn();
describe('Test the WithHelperText input component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement}=render(<WithHelperText placeholder="first name" formLabel="First Name" onChangeText={testFunc} helperTextBottom={<ValidityCheck
            isValid={false}
            isValidText="Email is valid"
            checkText="Email is invalid"
          />}/>);
        expect(baseElement).toBeTruthy();
        expect(screen.getByLabelText('First Name')).toBeTruthy();
        expect(screen.getByPlaceholderText('first name')).toBeTruthy();
        expect(screen.getByText('Email is invalid'))
    });

    it('Tests the text value on change', ()=>{
        render(<WithHelperText placeholder="first name" formLabel="First Name" onChangeText={testFunc} />)
        const input  = screen.getByRole('textbox')
        fireEvent.change(input, {target: {value: 'name'}})
        expect(testFunc).toHaveBeenCalled()
    })
})