import React, { useEffect, useRef } from "react";
import Img1 from "../../../Images/pic-2.jpg";
import Img2 from "../../../Images/pic-5.webp";
import Img3 from "../../../Images/pic-3.jpg";
import { BsCartPlusFill } from "react-icons/bs";
import "../../Pages/Home/Acc.css";

const AccGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (gridRef.current) gridRef.current.classList.add("visible");
        } else {
          if (gridRef.current) gridRef.current.classList.remove("visible"); // Remove to reanimate
        }
      },
      { threshold: 0.3 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  return (
    <div ref={gridRef} className="acc-grid">
      {[Img1, Img2, Img3].map((img, index) => (
        <div key={index} className="acc-item">
          <img
            src={img}
            style={{ opacity: 1 }}
            alt={`Accessory ${index + 1}`}
          />
          <h4>Item Name</h4>
          <p>£10.00</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn-add-basket">
              <span>Add</span>
              <BsCartPlusFill size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccGrid;
