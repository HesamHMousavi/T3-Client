import React from "react";
import Header from "../../Header/Header";
import PlateImage from "../../PlateImage/PlateImage";
import BuildForm from "./BuildForm";
import IconsBanner from "../../IconsBanner/IconsBanner";
import Acc from "./Acc";
import Img1 from "../../../Images/pic-2.jpg";
import Img2 from "../../../Images/pic-6.jpg";
import ContactForm from "../../ContactForm/ContactForm";
import Footer from "../../Footer/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <PlateImage Img={Img2} isFirst={true} Title={"T3 CUSTOMS"} />
      <BuildForm />
      <IconsBanner />
      <PlateImage Img={Img1} Title={"Premium Quality"} />
      <Acc />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default HomePage;
