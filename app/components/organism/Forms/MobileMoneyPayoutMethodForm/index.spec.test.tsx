import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MobileMoneyPayoutMethodForm from ".";
import { Provider } from "react-redux";
import store from "../../../../redux/store";

const testFunc = jest.fn()
const testFunc1 = jest.fn()
describe('Tests the MobilePayoutMethodForm component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<Provider store={store}><MobileMoneyPayoutMethodForm onDone={testFunc} onCancel={testFunc1}/></Provider>);
        expect(screen.getByText('Mobile Money')).toBeInTheDocument()
        expect(screen.getByText('We currently only support MTN Mobile Money in Rwanda and M-PESA in Kenya.')).toBeInTheDocument()
        expect(screen.getByText('I attest that I am the owner and have full authorization to use this account.')).toBeInTheDocument()
        expect(screen.getAllByRole('textbox').length).toBe(2)
        expect(screen.getAllByRole('combobox').length).toBe(3)
        expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('Tests the form fields', ()=>{
        render(<MobileMoneyPayoutMethodForm onDone={testFunc} onCancel={testFunc1}/>);
        const input = screen.getByTestId('phone')
        const selects = screen.getAllByRole('combobox')
        const cancel = screen.getByText('Cancel')
        const done = screen.getByText('Done')
        const check = screen.getByRole('checkbox')
        fireEvent.change(input, {target: {value: 'Test'}})
        fireEvent.change(check, {target: {value: 'checked'}})
        expect(check.value).toBe('checked')
        fireEvent.click(done)
        expect(testFunc).toBeCalled()
        fireEvent.click(cancel)
        expect(testFunc1).toBeCalled()
    })
})