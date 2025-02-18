import React from "react";
import Header from "../../Header/Header";
import PlatesGrid from "./PlatesGrid";
import PlateImage from "../../PlateImage/PlateImage";
import Img from "../../../Images/pic-1.webp";
import IconsBanner from "../../IconsBanner/IconsBanner";
import Footer from "../../Footer/Footer";

const PlatesPage = () => {
  return (
    <div>
      <Header />
      <PlateImage isFirst={true} Img={Img} />
      <PlatesGrid />
      <IconsBanner />
      <Footer />
    </div>
  );
};

export default PlatesPage;
