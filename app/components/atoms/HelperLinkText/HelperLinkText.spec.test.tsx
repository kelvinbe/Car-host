import React from "react";
import HelperLinkText from "./HelperLinkText";
import { fireEvent, render, screen } from "@testing-library/react"; 

const testFunc = jest.fn();
describe('Tests the HelperLinkText component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} = render(<HelperLinkText/>)
        expect(baseElement).toBeTruthy();
    })

    it('Tests if the props are passed down correctly', ()=>{
        render(<HelperLinkText link="#" linkText="link text" onClick={testFunc}>Sample text</HelperLinkText>) 
        expect(screen.getByText('link text')).toBeInTheDocument()
        const link = screen.getByText('link text');
        fireEvent.click(link)
        expect(testFunc).toBeCalled()
    })
})