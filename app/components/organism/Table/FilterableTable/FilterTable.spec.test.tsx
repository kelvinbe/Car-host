import React from "react";
import FilterableTable from "./FilterableTable";
import { fireEvent, render, screen } from "@testing-library/react";

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
const testFunc = jest.fn();
describe("Tests the FilterTableComponent", () => {
  it("Tests if the component mounts", () => {
    const { baseElement } = render(
      <FilterableTable
        viewSearchField={true}
        viewAddFieldButton={true}
        buttonName="Test Button"
        viewSortablesField={true}
        openCreateModal={testFunc}
      />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("rounded-btn")).toBeInTheDocument();
    expect(screen.getByText('Sort By:')).toBeInTheDocument();
    expect(screen.getByTestId('base-table')).toBeInTheDocument();
  });

  it('Tests the button on the component', ()=>{
    render(
        <FilterableTable
          viewSearchField={true}
          viewAddFieldButton={true}
          buttonName="Test Button"
          viewSortablesField={true}
          openCreateModal={testFunc}
        />
      );
      const button = screen.getByTestId("rounded-btn");
      fireEvent.click(button);
      expect(testFunc).toBeCalled();
  })
});
