import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import EditVehicleModal from "./EditVehicleModal";
import { IVehicleDetails } from "../../../globaltypes";
import { Provider } from "react-redux";
import store from "../../../redux/store";
const vehicles: IVehicleDetails[] =[{
    id: 1,
    transmission: 'auto',
    year: 2017,
    status: "active",
    make: 'Toyota',
    model: 'Camry',
    plate: 'ABC-30',
    hourly_rate: 36,
    VehiclePictures: []
}]

const testFunc = jest.fn()
describe('Tests the EditVehicleModal component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<Provider store={store}><EditVehicleModal isOpen onClose={testFunc} vehicleId={1} vehicles={vehicles}/></Provider>);
        expect(baseElement).toBeTruthy()
        const inputs = screen.getAllByRole('textbox')
        expect(screen.getByText('Edit vehicle details')).toBeInTheDocument();
        expect(screen.getAllByRole('combobox').length).toBe(2)
        expect(inputs[0].value).toBe('ABC-30')

    });

    it('Tests edit form fields', ()=>{
        render(<Provider store={store}><EditVehicleModal isOpen onClose={testFunc} vehicleId={1} vehicles={vehicles}/></Provider>);
        const inputs = screen.getAllByRole('textbox')
        const button = screen.getByText('Edit')

        fireEvent.change(inputs[0], {target: {value: 'BCD-34'}})
        expect(inputs[0].value).toBe('BCD-34')
    });

})