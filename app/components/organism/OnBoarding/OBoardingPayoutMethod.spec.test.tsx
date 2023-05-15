import React from "react";
import OnBoardingPayoutMethod from "./OnBoardingPayoutMethod";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

jest.mock('next/router', () => require('next-router-mock'));
const testFunc = jest.fn();
const testFunc1 = jest.fn();
describe('Tests the OnBoardingPayoutMethod component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<Provider store={store}><OnBoardingPayoutMethod onBack={testFunc} onCompleted={testFunc1}/></Provider>)
        expect(screen.getByText('How would you like to get paid?')).toBeInTheDocument();
        expect(screen.getAllByRole('combobox').length).toBe(4)
    });

    it('Tests if the component mounts', ()=>{
        render(<Provider store={store}><OnBoardingPayoutMethod onBack={testFunc} onCompleted={testFunc1}/></Provider>)
        const select = screen.getAllByRole('combobox')[0];
        fireEvent.change(select, {target:{value: 'bank'}})
        expect(screen.getByText('Account holder bank information')).toBeInTheDocument();
        
    })
})