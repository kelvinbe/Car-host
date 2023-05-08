import React from "react";
import Rounded from "./Rounded";
import { fireEvent, render, screen } from "@testing-library/react"; 

const testFunc = jest.fn()
beforeEach(()=>{
    render(<Rounded  rounded="full" onClick={testFunc}>Button</Rounded>)
})
describe('Tests the rounded button component', ()=>{
    it('Tests if the button mounts', ()=>{
      expect(screen.getByText('Button')).toBeInTheDocument()  
    })

    it('Tests button on click', ()=>{
        fireEvent.click(screen.getByRole('button'))
        expect(testFunc).toBeCalled()
    })
    
})