import React from "react";
import Header from "../components/organism/Header/Header";
import Banner from "../components/organism/Banner/Banner";
import Footer from "../components/organism/Footer/Footer";
import AboutUs from "../components/organism/AboutUs/AboutUs";
import BookRide from "../components/organism/BookRide/BookRide";
import AppFeature from "../components/organism/AppFeature/Appfeature";
import MobileBanner from "../components/organism/Banner/MobileBanner"
import Head from "next/head";
import { useMediaQuery } from "@chakra-ui/react";

const LandingPage = () => {

  const [isLargerThan800] = useMediaQuery('(min-width: 1280px)')
  return (
    <html lang="en">
      <Head>
        <title>Divvly. Rent a car</title>
        <meta name="description" content="Divvly allows AirBnB hosts rent cars to their tenants." />
        <meta property="og:title" content="Divvly. Rent a car" />
        <meta property="og:description" content="Divvly allows AirBnB hosts rent cars to their tenants." />
        {/* <meta property="og:image" content="https://example.com/my-image.jpg" /> */}
      </Head>
      <body className="flex flex-col items-center justify-start w-screen flex-1 min-h-screen h-full" >
        <Header />
        
        {!isLargerThan800 ?  <MobileBanner /> : <Banner /> }
        <section id="about">
          <AboutUs />
        </section>
        <section id="app-feature">
          <AppFeature />
        </section>
        <section id="book-ride">
          <BookRide/>
        </section>  
        <footer className="w-full">
          <Footer />
        </footer>  
      </body>
      
    </html>
  );
};

export default LandingPage;
