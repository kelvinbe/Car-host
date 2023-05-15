import React from "react";
import PreviewTableContainer from "./TableContainer";
import { render, screen } from "@testing-library/react";

describe('It Tests the PreviewTableContainer component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<PreviewTableContainer title="Test title" link="#">This is a preview table</PreviewTableContainer>)
        expect(screen.getByText('Test title')).toBeInTheDocument()
        expect(screen.getByText('This is a preview table')).toBeInTheDocument()
        expect(screen.getByText('Manage')).toBeInTheDocument()
    })
})