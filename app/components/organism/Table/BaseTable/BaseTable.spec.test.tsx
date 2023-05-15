import React from "react";
import BaseTable from "./BaseTable";
import { render, screen } from "@testing-library/react";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
describe('Tests the Basetable component', ()=>{
    it('Tests if the component mounts', ()=>{
        const{baseElement}=render(<BaseTable columns={[]} data={[]}/>)
        expect(baseElement).toBeTruthy()
    })
})