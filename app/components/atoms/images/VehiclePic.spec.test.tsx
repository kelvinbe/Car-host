import React from "react";
import VehiclePic from "./VehiclePic";
import { render, screen } from "@testing-library/react"; 
describe('Tests the VehiclePic component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} = render(<VehiclePic image="https://images.unsplash.com/photo-1547143379-3374bbefa14a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=697&q=80" size={'large'} />)
        expect(baseElement).toBeTruthy();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByAltText('vehicle')).toBeTruthy();
        expect(screen.getByRole('img').getAttribute('src')).toBe('https://images.unsplash.com/photo-1547143379-3374bbefa14a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=697&q=80');
    })
})