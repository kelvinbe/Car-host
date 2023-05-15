import React from "react";
import OnBoardingProfileInfo from "./OnBoardingProfileInfo";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn();
const testFunc1 = jest.fn();

describe('Tests the OnBoardingProfileInfo compnent', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<Provider store={store}><OnBoardingProfileInfo onBack={testFunc} onCompleted={testFunc1}/></Provider>);
        expect(screen.getByText('Upload Your Profile Pic')).toBeInTheDocument();
        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.getByText('Last Name')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('Tests incomplete form submit', ()=>{
        render(<Provider store={store}><OnBoardingProfileInfo onBack={testFunc} onCompleted={testFunc1}/></Provider>);
        const button = screen.getByRole('button')
        const inputs = screen.getAllByRole('textbox')
        fireEvent.change(inputs[0], {target: {value: 'Test'}})
        fireEvent.change(inputs[1], {target: {value: 'User'}})
        fireEvent.click(button)
        expect(testFunc1).not.toBeCalled()
    })

    it('Tests image upload', ()=>{
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        render(<Provider store={store}><OnBoardingProfileInfo onBack={testFunc} onCompleted={testFunc1}/></Provider>);
        const uploader = screen.getByTestId('image-upload');
        userEvent.upload(uploader, file);
        expect(uploader.files).toHaveLength(1);
    })
})