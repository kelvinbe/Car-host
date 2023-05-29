import React from "react";
import ForgotPassword from "./ForgotPassword";
import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Tests the forgot password component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<ForgotPassword/>)
        const email = screen.getByRole('textbox')
        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
        expect(email).toBeInTheDocument()
    })

    it('Tests the emailtext field', async()=>{
        const{getByRole}=render(<ForgotPassword/>)
        const email = screen.getByRole('textbox')
        act(()=>{
            fireEvent.change(email, {target: {value: 'test@test.com'}})
        })
        expect(email.value).toBe('test@test.com')
        act(()=>{
            userEvent.click(getByRole('button'))
        })
        await waitFor (()=>{
            expect(screen.getByTestId('reset-instruction').textContent).toBe('An email with instruction to Reset your password has been sent to test@test.com')
        })
    })
})