import React from "react";
import ComingSoonVector from "./ComingSoonVector";
import { render, screen } from "@testing-library/react";

describe('Tests the ComingSoonVector component', ()=>{
    it('Tests if the component mounts', ()=>{
        const {baseElement} = render(<ComingSoonVector/>)
        expect(baseElement).toBeTruthy();
        expect(screen.getByRole('img')).toBeTruthy()
        expect(screen.getByAltText('coming soon')).toBeTruthy()
    })
})