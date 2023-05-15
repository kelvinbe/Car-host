import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import EditStationModal from "./EditStationModal";
import { IStation } from "../../../globaltypes";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn()
const station: IStation = {
    id: '2',
    name: 'Test station',
    description: 'Tests description',
    image: '',
    sub_market_name: 'test sub-market name',
    sub_market: { id: '3', name: 'submarket', market_id: '3' },
    sub_market_id: '3',
    status: 'active',
    longitude: 37,
    latitude: 23

}
describe('Tests the EditStationModal', ()=>{
    it('Tests if the component mounts',()=>{
        const {baseElement}=render(<Provider store={store}><EditStationModal isOpen onClose={testFunc} station={station}/></Provider>);
        expect(baseElement).toBeTruthy()
        expect(screen.getAllByRole('textbox').length).toBe(3)
        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('Tests the edit form fields', ()=>{
        render(<Provider store={store}><EditStationModal isOpen onClose={testFunc} station={station}/></Provider>);
        const inputs=screen.getAllByRole('textbox')
        const button = screen.getByText('Edit')

        fireEvent.change(inputs[0], {target: {value: 'Test station'}})
        expect(inputs[0].value).toBe('Test station');
    })
})