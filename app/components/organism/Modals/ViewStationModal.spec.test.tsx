import React from "react";
import { render, screen } from "@testing-library/react";
import ViewStationModal from "./ViewStationModal";
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
describe('Tests the ViewPayoutModal component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<Provider store={store}><ViewStationModal isOpen onClose={testFunc} station={station}/></Provider>);
        expect(baseElement).toBeTruthy()
        expect(screen.getByText(`Description: ${station.description}`)).toBeInTheDocument();
        expect(screen.getByText(`Sub-Market Name: ${station?.sub_market?.name}`)).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})