import React from "react";
import ApiVehicleDetails from "./ApiVehicleDetails";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn();
describe('Tests the ApiVehicleDetails component',()=>{
    it('Tests if the component mounts',()=>{
        const{baseElement}=render(<Provider store={store}><ApiVehicleDetails updateFormFields={testFunc}/></Provider>);
        expect(baseElement).toBeTruthy();
        expect(screen.getAllByRole('textbox').length).toBe(3);
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    it('Tests for submission', ()=>{
        render(<Provider store={store}><ApiVehicleDetails updateFormFields={testFunc}/></Provider>);
        const inputs = screen.getAllByRole('textbox')
        const button = screen.getByRole('button')
        fireEvent.change(inputs[0], {target: {value: '2009'}})
        expect(inputs[0].value).toBe('2009')
        fireEvent.change(inputs[1], {target: {value: 'test make'}})
        expect(inputs[1].value).toBe('test make')
        fireEvent.change(inputs[2], {target: {value: 'test model'}})
        expect(inputs[2].value).toBe('test model')
        fireEvent.submit(button)
        expect(testFunc).not.toBeCalled()
    })
})