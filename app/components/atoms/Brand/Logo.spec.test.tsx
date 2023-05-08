import Logo from "./Logo";
import React from "react";
import {screen, render} from '@testing-library/react'

describe('Tests the logo component', ()=>{
    it('Tests if the logo component mounts', ()=>{
        const {baseElement} =render(<Logo/>)

        expect(baseElement).toBeTruthy()
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})