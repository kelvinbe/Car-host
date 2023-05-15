import React from "react";
import ForgotPassword from "./ForgotPassword";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Tests the forgot password component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<ForgotPassword/>)
        const email = screen.getByRole('textbox')
        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
        expect(email).toBeInTheDocument()
    })

    it('Tests the emailtext field', ()=>{
        render(<ForgotPassword/>)
        const email = screen.getByRole('textbox')
        fireEvent.change(email, {target: {value: 'test@test.com'}})
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByTestId('reset-instruction').textContent).toBe('An email with instruction to Reset your password has been sent to test@test.com')
    })
})