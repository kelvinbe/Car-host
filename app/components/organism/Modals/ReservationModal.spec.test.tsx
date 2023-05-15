import React from "react";
import { render, screen } from "@testing-library/react";
import ReservationModal from "./ReservationModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe('Tests the reservation Model', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement}= render(<Provider store={store}><ReservationModal toggleViewReservationModal={true} isOpen/></Provider>)
        expect(baseElement).toBeTruthy()
    })
})