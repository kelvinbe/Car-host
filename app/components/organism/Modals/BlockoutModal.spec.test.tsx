import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BlockoutModal from "./BlockoutModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const startTime = '2023-05-05 10:30'
const endTime = '2023-05-05 12:30'
const testFunc = jest.fn();
describe('It tests the blockout modal',()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement}=render(<Provider store={store}><BlockoutModal 
            startTime={startTime}
            endTime={endTime}
            isOpen
            onClose={testFunc}
        /></Provider>);
        expect(baseElement).toBeTruthy();
        expect(screen.getByTestId('header').textContent).toBe('Selected Slot');
        expect(screen.getByTestId('blockout').textContent).toBe("Block from 10:30:00 AM to 12:30:00 PM")
    })

    it('Tests the Cancel button', ()=>{
        render(<Provider store={store}><BlockoutModal 
            startTime={startTime}
            endTime={endTime}
            isOpen
            onClose={testFunc}
        /></Provider>);
        const cancel = screen.getByTestId('cancel')
        fireEvent.click(cancel)
        expect(testFunc).toBeCalled()
    })
})