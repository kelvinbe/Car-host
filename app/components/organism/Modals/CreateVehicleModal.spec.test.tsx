import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateVehicleModal from "./CreateVehicleModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn()
beforeEach(()=>{
    const {baseElement} =render(<Provider store={store}><CreateVehicleModal isOpen onClose={testFunc}/></Provider>)
})

describe('Tests the CreateVehicle Modal component', ()=>{
    it('Tests if the component mounts', ()=>{
        expect(screen.getAllByRole('textbox').length>=5).toBeTruthy();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(3);
    });

    it('Tests the form fields', ()=>{
        const inputs = screen.getAllByRole('textbox');
        const select = screen.getByRole('combobox');
        const button = screen.getByText('Create')

        fireEvent.change(inputs[0], {target:{value: 'ABC-123'}})
        expect(inputs[0].value).toBe('ABC-123')
        fireEvent.change(inputs[1], {target:{value: 'Toyota'}})
        expect(inputs[1].value).toBe('Toyota')
        fireEvent.change(inputs[2], {target:{value: 'Camry'}})
        expect(inputs[2].value).toBe('Camry')
        fireEvent.change(inputs[3], {target:{value: '2018'}})
        expect(inputs[3].value).toBe('2018')
        fireEvent.change(inputs[4], {target:{value: '36'}})
        expect(inputs[4].value).toBe('36')

        fireEvent.change(select, {target: {value: 'auto'}})
        fireEvent.click(button)
        expect(testFunc).not.toBeCalled()
    });

    it('Tests the form fields errors', ()=>{
        const inputs = screen.getAllByRole('textbox');
        const select = screen.getByRole('combobox');
        const button = screen.getByText('Create')

        fireEvent.change(inputs[0], {target:{value: 'ABC-123'}})
        expect(inputs[0].value).toBe('ABC-123')
        fireEvent.change(inputs[1], {target:{value: 'Toyota'}})
        expect(inputs[1].value).toBe('Toyota')
        fireEvent.change(inputs[2], {target:{value: 'Camry'}})
        expect(inputs[2].value).toBe('Camry')

        fireEvent.click(button)
        expect(testFunc).not.toBeCalled()
        expect(screen.getByText('Ensure all fields are filled')).toBeInTheDocument()
    })
})