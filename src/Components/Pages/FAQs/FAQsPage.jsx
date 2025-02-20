import React from "react";
import Header from "../../Header/Header";
import PlateImage from "../../PlateImage/PlateImage";
import Img from "../../../Images/pic-2.jpg";
import FAQs from "../FAQs/FAQs";
import Acc from "../Home/Acc";
import ContactForm from "../../ContactForm/ContactForm";
import Footer from "../../Footer/Footer";

const FAQsPage = () => {
  return (
    <div>
      <Header />
      <PlateImage Img={Img} isFirst={true} Title={"FAQs"} />
      <FAQs />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default FAQsPage;
