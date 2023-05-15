import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import EditProfileModal from "./EditProfileModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn()
const user = {
    fname: 'Test',
    lname: 'User',
    handle: 'tester',
    email: 'test@test.com',
    phone: '+254729737263',
    profile_pic: '',
}
describe('Tests the EditProfile component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement}=render(<Provider store={store}><EditProfileModal isOpen onClose={testFunc} user={user}/></Provider>)
        expect(baseElement).toBeTruthy()
        expect(screen.getAllByRole('textbox')[0].value).toBe('Test')
    })

    it('Test the user edit form', ()=>{
        render(<Provider store={store}><EditProfileModal isOpen onClose={testFunc} user={user}/></Provider>)
        const fname=screen.getAllByRole('textbox')[0]
        const update = screen.getAllByRole('button')[1]
        fireEvent.change(fname, {target: {value: 'First'}})
        expect(fname.value).toBe('First')
        fireEvent.click(update)
        expect(testFunc).toBeCalled()
    })
})