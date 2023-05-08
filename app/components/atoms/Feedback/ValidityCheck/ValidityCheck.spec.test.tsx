import React from 'react';
import ValidityCheck from './ValidityCheck';
import { screen, render } from '@testing-library/react';

describe('Tests the ValidityCheck component',()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} = render(<ValidityCheck isValid={false} checkText='This is invalid' isValidText='This is valid'/>)
        expect(baseElement).toBeTruthy()
        expect(screen.getByText('This is invalid')).toBeInTheDocument()
    })

    it('Tests if the components validity', ()=>{
        render(<ValidityCheck isValid={true} checkText='This is invalid' isValidText='This is valid'/>)
        expect(screen.getByText('This is valid')).toBeInTheDocument()
    })
})
