import React from "react";
import { render, screen } from "@testing-library/react";
import BannerInfo from "./BannerInfo";

describe("Tests the BannerInfo component", () => {
  it("Tests if the component mounts", () => {
    const { baseElement } = render(
      <BannerInfo
        letterSpacing=""
        direction="row"
        display="block"
        image="https://marketplace.canva.com/EAE9QjX6rhA/1/0/1600w/canva-blue-pink-gradient-fashion-banner-cVzLo3B1IHE.jpg"
        textColor=""
        boxWidth="full"
        imageWidth="1000px"
        textWidth="480px"
        align="start"
        showText={true}
        spacing={1}
        noStyleText={false}
        textAlign="left"
        vStackPosition="absolute"
        left="200px"
        boxPosition="absolute"
        right="0px"
        marginTop="-300"
      />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId("banner-info").textContent).toBe(
      "IntroducingHOST CARSHARING APPLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus."
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://www.apple.com/app-store/');
    expect(screen.getByTestId('banner-info-img').getAttribute('src')).toBe("/images/https://marketplace.canva.com/EAE9QjX6rhA/1/0/1600w/canva-blue-pink-gradient-fashion-banner-cVzLo3B1IHE.jpg")
  });
});
