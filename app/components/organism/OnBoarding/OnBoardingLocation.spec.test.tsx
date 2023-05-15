import React from "react";
import OnBoardinLocation from "./OnBoardingLocation";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn();
const testFunc2 = jest.fn();
beforeEach(()=>{
    render(<Provider store={store}><OnBoardinLocation onBack={testFunc} onCompleted={testFunc2}/></Provider>)
})

describe('Tests the OnBoardingLocation component', ()=>{
    it('Tests if the component mounts',()=>{
        expect(screen.getByText('Add your location details')).toBeInTheDocument();
        expect(screen.getByText('Your market is the country you are located in')).toBeInTheDocument();
        expect(screen.getByText('Your submarket is the city you are located in')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2)
        expect(screen.getAllByRole('combobox').length).toBe(2)
    });

    it('Tests for the select fields', ()=>{
        const buttons = screen.getAllByRole('button');
        const selects = screen.getAllByRole('combobox');
        fireEvent.change(selects[0], {target: {value: 'Rio'}})
        fireEvent.change(selects[1], {target: {value: 'Dejen'}})
        fireEvent.click(buttons[1])
        expect(testFunc2).not.toBeCalled()
        fireEvent.click(buttons[0])
        expect(testFunc).toBeCalled()
    })
})