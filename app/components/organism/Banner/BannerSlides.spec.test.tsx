import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SlideWithBgImage, Slide, BannerSlides } from "./BannerSlides";
import { async } from "@firebase/util";


window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe("SlideWithBgImage", () => {
  const banner = {
    id: 1,
    image: "bg-image-1.jpg",
    disImage: "banner-image-1.jpg",
  };

  it("renders banner info with correct props if banner id is 1", () => {
    render(<SlideWithBgImage banner={banner} />);
    const bannerInfo = screen.getByTestId("banner-slide");
    expect(bannerInfo).toBeInTheDocument();
  });

  it("renders banner info with correct props if banner id is 2", () => {
    const bannerWithId2 = {
      ...banner,
      id: 2,
    };
    render(<SlideWithBgImage banner={bannerWithId2} />);
    const bannerInfo = screen.getByTestId("banner-slide");
    expect(bannerInfo).toBeInTheDocument();
    expect(bannerInfo).not.toHaveAttribute("left");
    expect(bannerInfo).not.toHaveAttribute("right");
    expect(bannerInfo).not.toHaveAttribute("marginTop");
  });

  it("renders banner info with correct props if banner id is 3", async() => {
    const bannerWithId3 = {
      image: "bg-image-1.jpg",
      disImage: "banner-image-1.jpg",
      id: 3,
    };
    render(<SlideWithBgImage banner={bannerWithId3} />);
    await waitFor(()=>{
      const bannerInfo = screen.getByTestId("banner-slide");
      expect(bannerInfo).toBeInTheDocument();
    }) 
  });
});

describe("Slide", () => {
  const banner = {
    id: 1,
    disImage: "banner-image-1.jpg",
  };

  it("renders banner info with correct props", () => {
    render(<Slide banner={banner} />);
    const bannerInfo = screen.getByTestId("slidebanner-info");
    expect(bannerInfo).toBeInTheDocument();
  });
});

describe("BannerSlides", () => {
  const banner = {
    id: 1,
    image: "bg-image-1.jpg",
    disImage: "banner-image-1.jpg",
  };

  it("renders SlideWithBgImage with correct props", () => {
    render(<BannerSlides banner={banner} />);
    const slideWithBgImage = screen.getByTestId("slide-with-bg-image");
    expect(slideWithBgImage).toBeInTheDocument();
  });
});
