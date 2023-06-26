import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DashboardSidebarButton from "./DashboardSidebarButton";



window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

const testFunc = jest.fn();
beforeEach(()=>{
    render(
        <DashboardSidebarButton
          onClick={testFunc}
          link="www.google.com"
          isActive={true}
        >
          Side Bar Button
        </DashboardSidebarButton>
      );
})


describe("Tests the DashboardSidebarButton component", () => {
    
  it("Tests if the component mounts", () => { 
    const activeBtn = screen.getByText("Side Bar Button"); 
    expect(activeBtn).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "www.google.com");
    expect(activeBtn.className).toBe('chakra-text css-145clb9')
    
  });

  it('Tests function link click', ()=>{
    const activeBtn = screen.getByText("Side Bar Button");
    fireEvent.click(activeBtn);
    expect(testFunc).toBeCalled();
  })
});
