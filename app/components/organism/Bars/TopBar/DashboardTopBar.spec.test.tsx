import React from "react";
import DashboardTopBar from "./DashboardTopBar";
import { fireEvent, render, screen } from "@testing-library/react"; 
import store from "../../../../redux/store";
import { Provider } from "react-redux";
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));
describe('Tests the dashboard topbar component',()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement} = render(<Provider store={store} ><DashboardTopBar/></Provider> )
        expect(baseElement).toBeTruthy();
        expect(screen.getByRole('img')).toBeInTheDocument() 
    })
    it('Tests click on the profile', ()=>{
        render(<Provider store={store} ><DashboardTopBar/></Provider>)
        const profile = screen.getByTestId('top-bar')
        fireEvent.click(profile)
        expect(screen.getByText('Profile'))
        expect(screen.getByText('Settings'))
        expect(screen.getByText('Logout'))
    })
})
