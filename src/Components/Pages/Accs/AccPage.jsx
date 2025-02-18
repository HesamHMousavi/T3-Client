import React from "react";
import Header from "../../Header/Header";
import PlateImage from "../../PlateImage/PlateImage";
import Img from "../../../Images/pic-1.webp";
import IconsBanner from "../../IconsBanner/IconsBanner";
import Footer from "../../Footer/Footer";
import Acc from "../Home/Acc";

const AccPages = () => {
  return (
    <div>
      <Header />
      <PlateImage isFirst={true} Img={Img} />
      <Acc />
      <IconsBanner />
      <Footer />
    </div>
  );
};

export default AccPages;
