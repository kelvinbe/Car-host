import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StationActionModal from "./StationActionModal";
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

jest.mock('../../../utils/apiClient', () => ({
    create: jest.fn().mockReturnValue({
        headers: {
            "x-user": "HOST", 
            "ngrok-skip-browser-warning": true
        },
        interceptors: {
            request: {
                use: jest.fn().mockImplementation((config) => {
                    return {
                        ...config,
                        headers: {
                            ...config.headers,
                            "Authorization": `Bearer ${'mocked_token'}`
                        }
                    }
                })
            },
            response: {
                use: jest.fn().mockImplementation(() => ({
                    data: 'mocked data',
                    message: 'mocked message',
                    status: 'mocked status'
                }))
            }
        },
    }),
    db_user: {
        getUser: jest.fn().mockResolvedValue({
            getIdToken: jest.fn().mockResolvedValue('mocked_token')
        })
    },
}));


describe('Tests the StationactionModal component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<Provider store={store}><StationActionModal isOpen onClose={testFunc} station={station}/></Provider>)
        expect(baseElement).toBeTruthy()
        expect(screen.getAllByRole('textbox').length).toBe(2)
        expect(screen.getAllByText('Update Station')[0]).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByRole('img')).toBeInTheDocument()
    });

    it('Tests the edit form fields', ()=>{
        render(<Provider store={store}><StationActionModal isOpen onClose={testFunc} station={station}/></Provider>);
        const inputs=screen.getAllByRole('textbox')
        const button = screen.getAllByRole('button')[2]

        fireEvent.change(inputs[0], {target: {value: 'Test station'}})
        expect(inputs[0].value).toBe('Test station');
    })
})