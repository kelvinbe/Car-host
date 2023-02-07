import React from "react";
import Header from "../../components/organism/Header/Header";
import Footer from "../../components/organism/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 min-h-screen h-full">
      <Header />
      <Footer />
    </div>
  );
};

export default LandingPage;
