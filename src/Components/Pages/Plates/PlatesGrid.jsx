import React from "react";
import "./PlatesGrid.css";
import Img from "../../../Images/pic-2.jpg";
import Img2 from "../../../Images/pic-5.webp";
import Img3 from "../../../Images/pic-1.webp";

const products = [
  {
    image: Img, // Replace with actual image path
    price: "£25",
    title: "3D GEL",
  },
  {
    image: Img2, // Replace with actual image path
    price: "£25",
    title: "3D ACRYLIC - 3mm",
  },
  {
    image: Img, // Replace with actual image path
    price: "£25",
    title: "3D ACRYLIC - 5mm",
  },
  {
    image: Img3, // Replace with actual image path
    price: "£25",
    title: "3D CARBON",
  },
  {
    image: Img, // Replace with actual image path
    price: "£25",
    title: "3D CARBON",
  },
];

const PlatesGrid = () => {
  return (
    <>
      <h1 className="main-title">OUR RANGE</h1>
      <div className="grid-container">
        <h2 className="grid-heading">THE 3D RANGE</h2>
        <div className="grid">
          {products.map((product, index) => (
            <div key={index} className="grid-item">
              <img
                src={product.image}
                alt={product.title}
                className="grid-image"
              />
              {/* <p className="grid-price">{product.price}</p>
              <h1 className="grid-title-plates">{product.title}</h1> */}
            </div>
          ))}
        </div>
      </div>
      <div className="grid-container">
        <h2 className="grid-heading">THE 3D RANGE</h2>
        <div className="grid">
          {products.map((product, index) => (
            <div key={index} className="grid-item">
              <img
                src={product.image}
                alt={product.title}
                className="grid-image"
              />
              {/* <p className="grid-price">{product.price}</p>
              <h1 className="grid-title-plates">{product.title}</h1> */}
            </div>
          ))}
        </div>
      </div>
      <div className="grid-container">
        <h2 className="grid-heading">THE 3D RANGE</h2>
        <div className="grid">
          {products.map((product, index) => (
            <div key={index} className="grid-item">
              <img
                src={product.image}
                alt={product.title}
                className="grid-image"
              />
              {/* <p className="grid-price">{product.price}</p>
              <h1 className="grid-title-plates">{product.title}</h1> */}
            </div>
          ))}
        </div>
        <button className="add-basket">Build My Plate</button>
      </div>
    </>
  );
};

export default PlatesGrid;
