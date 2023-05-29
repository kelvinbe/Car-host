import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import EditVehicleModal from "./EditVehicleModal";
import { IVehicle } from "../../../globaltypes";
import { Provider } from "react-redux";
import store from "../../../redux/store";
const vehicles: IVehicle[] =[{
    id: '1',
    transmission: 'auto',
    year: 2017,
    status: "active",
    make: 'Toyota',
    model: 'Camry',
    plate: 'ABC-30',
    hourly_rate: 36,
    pictures: [],
    station_id: '3',
    color: 'red',
    coords: {
        latitude: 34,
        longitude: 23
    },
    seats: 4,
    location: 'kenya'
}]

const testFunc = jest.fn()
describe('Tests the EditVehicleModal component', ()=>{
    it('Tests if the component mounts', ()=>{
        const { baseElement } = render(<Provider store={store}><EditVehicleModal isOpen onClose={testFunc} vehicle_id={'1'} vehicles={vehicles} /></Provider>);
        expect(baseElement).toBeTruthy()
        const inputs = screen.getAllByRole('textbox')
        expect(screen.getByText('Edit vehicle details')).toBeInTheDocument();
        expect(screen.getAllByRole('combobox').length).toBe(2)
        expect(inputs.length).toBe(3)
        expect(inputs[0].placeholder).toBe('ABC-123')

    });

    it('Tests edit form fields', ()=>{
        render(<Provider store={store}><EditVehicleModal isOpen onClose={testFunc} vehicle_id={'1'} vehicles={vehicles} /></Provider>);
        const inputs = screen.getAllByRole('textbox')
        const button = screen.getByText('Edit')

        fireEvent.change(inputs[0], {target: {value: 'BCD-34'}})
        expect(inputs[0].value).toBe('BCD-34')
        fireEvent.click(button)
    });

})