import React from "react";
import { render, screen } from "@testing-library/react";
import ViewPayoutModal from "./viewPayoutModal";
import { IPayout } from "../../../globaltypes";
import dayjs from "dayjs";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn()

const payout: IPayout = {
    id: 2,
    amount: 3000,
    date: new Date().toDateString(),
    status:"pending"
}
describe('Tests the ViewPayoutModal component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<Provider store={store}><ViewPayoutModal isOpen onClose={testFunc} payout={payout}/></Provider>);
        expect(baseElement).toBeTruthy()
        expect(screen.getByText('Payout details')).toBeInTheDocument();
        expect(screen.getByText(`Payout Date: ${dayjs(payout?.date).format()}`)).toBeInTheDocument();
        expect(screen.getByTestId('amount').textContent).toBe(`Amount paid: $${payout['amount']}`)
    })
})