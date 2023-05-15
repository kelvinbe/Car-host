import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BankPayoutMethodForm from ".";
import { Provider } from "react-redux";
import store from "../../../../redux/store";
import userEvent from '@testing-library/user-event'

const testFunc = jest.fn()
const testFunc1 = jest.fn()
beforeEach(()=>{
    render(<Provider store={store}><BankPayoutMethodForm onCancel={testFunc} onDone={testFunc1}/></Provider>)
})

describe('Tests the BankPayoutMethodForm', ()=>{
    it('Tests if the component mounts', ()=>{
        expect(screen.getByText('Direct to your local bank.')).toBeInTheDocument();
        expect(screen.getByText('Account holder bank information')).toBeInTheDocument();
        expect(screen.getByText('I attest that I am the owner and have full authorization to this bank account.')).toBeInTheDocument();
        expect(screen.getAllByRole('textbox').length).toBe(6);
        expect(screen.getByRole('checkbox')).toBeInTheDocument()
    });

    it('Tests the form fields',()=>{
        const accountNumber = screen.getByPlaceholderText('Enter your account number');
        const id = screen.getByTestId('id')
        const done = screen.getByText('Done');
        const cancel = screen.getByText('Cancel')
        const check = screen.getByRole('checkbox')

        fireEvent.change(accountNumber, {target: {value: 'Test text'}});
        expect(accountNumber.value).toBe('Test text');
        fireEvent.change(check, {target: {value: 'checked'}})
        expect(check.value).toBe('checked')
        fireEvent.click(done)
        expect(testFunc1).not.toBeCalled()
        fireEvent.click(cancel)
        expect(testFunc).toBeCalled()
    })

})