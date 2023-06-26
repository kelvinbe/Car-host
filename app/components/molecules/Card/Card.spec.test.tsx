import React from "react";
import AppFeatureCard from "./Card";
import { render, screen } from "@testing-library/react";
import { SiApple } from "react-icons/si";
import { IconBaseProps } from "react-icons";


window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

beforeEach(() => {
  render(
    <AppFeatureCard
      title="Card Title"
      icons={{
        src: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      }}
      description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, 
    ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per.`}
      buttonTitle="Download"
      displayFirstButton="block"
      displaySecondButton="block"
      showFirstButtonIcon={true}
      showSecondButtonIcon={true}
      buttonLink="https://www.apple.com/app-store/"
    />
  );
});

describe("Tests the AppFeatureCard component", () => {
  it("Tests if the component mounts", () => {
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per."
      )
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(2); 
    expect(screen.getByRole('img').getAttribute('src')).toBe("https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" )
  });

  it('Tests the AppFeatureCard links', ()=>{
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '#')
    expect(links[1]).toHaveAttribute('href', 'https://www.apple.com/app-store/')

  })
});
