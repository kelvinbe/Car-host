import React from "react";
import AuthForm from "./AuthForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../redux/store";
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));
const testFunc = jest.fn()
beforeEach(()=>{
    const{baseElement}=render(<Provider store={store}><AuthForm onSubmit={testFunc} type="signin"/></Provider>)
})

describe('Tests the AuthForm component', ()=>{
    it('Tests if the component mounts', ()=>{
        expect(screen.getByText('Log in to Your Account')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    })

    it('Tests the form inputs fields', ()=>{
        const email = screen.getByPlaceholderText('Enter your email');
        const password = screen.getByPlaceholderText('Enter your password');
        fireEvent.change(email, {target: {value:'test'}});
        expect(screen.getByText('Email is invalid')).toBeInTheDocument();
        fireEvent.change(email, {target: {value:'test@test.com'}});
        expect(screen.getByText('Email is valid')).toBeInTheDocument();
        fireEvent.change(password, {target: {value:'test@123'}});
        fireEvent.click(screen.getByText('Log In'))
        expect(testFunc).toHaveBeenCalled()
    })
})