import React from "react";
import { render, screen } from "@testing-library/react"; 
import ImageButton from "./ImageButton";


beforeEach(()=>{
    render(<ImageButton count={8}/> )
})
describe('Tests the ImageButton Component', ()=>{
    it('Tests if the ImageButton component mounts', ()=>{
        expect(screen.getByTestId('ImageButton')).toBeInTheDocument()  
    })
})