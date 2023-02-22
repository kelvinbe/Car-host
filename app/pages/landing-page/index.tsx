import React from "react";
import Header from "../../components/organism/Header/Header";
import Banner from "../../components/organism/Banner/Banner";
import Footer from "../../components/organism/Footer/Footer";
import AboutUs from "../../components/organism/AboutUs/AboutUs";
import BookRide from "../../components/organism/BookRide/BookRide";
import AppFeature from "../../components/organism/AppFeature/Appfeature";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 min-h-screen h-full">
      <Header />
      <Banner />
      
      <div id="about">
        <AboutUs />
      </div>
      <div id="app-feature">
        <AppFeature />
      </div>
      <div id="book-ride">
        <BookRide/>
      </div>    
      <Footer />
    </div>
  );
};

export default LandingPage;
