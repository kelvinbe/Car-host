import React from "react";
import Header from "../../components/organism/Header/Header";
import Banner from "../../components/organism/Banner/Banner";
import Footer from "../../components/organism/Footer/Footer";
import AboutUs from "../../components/organism/AboutUs/AboutUs";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 min-h-screen h-full">
      <Header />
      <Banner />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default LandingPage;