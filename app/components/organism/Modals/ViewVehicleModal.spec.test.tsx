import React from "react";
import { render, screen } from "@testing-library/react";
import ViewUserModal from "./ViewUserModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const user = {
    fname: 'Test',
    lname: 'User',
    handle: 'tester',
    email: 'test@test.com',
    phone: '+254729737263',
    status: 'paid'
}
const testFunc = jest.fn()

describe('Tests user view modal component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement}=render(<Provider store={store}><ViewUserModal isOpen onClose={testFunc} user={user}/></Provider>)
        expect(baseElement).toBeTruthy()
        expect(screen.getByText(`Email: ${user.email}`)).toBeInTheDocument();
        expect(screen.getByText(`Phone: ${user.phone}`)).toBeInTheDocument();
        expect(screen.getByText(`${user.status}`)).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})