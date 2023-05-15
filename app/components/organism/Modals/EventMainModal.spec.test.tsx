import React from "react";
import { render, screen } from "@testing-library/react";
import EventMainModal from "./EventMainModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe('Tests the EventMainModal component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement}= render(<Provider store={store}><EventMainModal isOpen isEvent={true}/></Provider>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Selected Slot')).toBeInTheDocument()
    })
})