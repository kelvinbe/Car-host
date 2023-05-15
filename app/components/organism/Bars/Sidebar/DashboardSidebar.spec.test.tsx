import DashboardSidebar from "./DashboardSidebar";
import React from "react";
import { render, screen } from "@testing-library/react"; 
import { dashboardRoutes } from "../../../../utils/routes";
import { Provider } from "react-redux";
import store from "../../../../redux/store";
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

jest.mock('next/router', () => require('next-router-mock'));
describe('Tests the DashboardSidebar component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<Provider store={store}><DashboardSidebar/></Provider>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByTestId('sidebar-on-dashboard-links').children.length).toBe(11)
    })
})