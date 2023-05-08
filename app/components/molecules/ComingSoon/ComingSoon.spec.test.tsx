import React from "react";
import ComingSoon from "./ComingSoon";
import { render, screen } from "@testing-library/react";

describe('Tests the ComingSoon component', ()=>{
    it('Tests if the component mounts', ()=>{
        render(<ComingSoon/>)
        expect(screen.getByText('This page is coming soon. Stay tuned!!!')).toBeInTheDocument()
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})