import React, { useEffect, useRef } from "react";
import "./Acc.css";
import Img1 from "../../../Images/pic-2.jpg";
import Img2 from "../../../Images/pic-5.webp";
import Img3 from "../../../Images/pic-3.jpg";
import { BsCartPlusFill } from "react-icons/bs";

const Acc = () => {
  const accRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (accRef.current) accRef.current.classList.add("visible");
        } else {
          if (accRef.current) accRef.current.classList.remove("visible"); // Remove to reanimate
        }
      },
      { threshold: 0.3 }
    );

    if (accRef.current) {
      observer.observe(accRef.current);
    }

    return () => {
      if (accRef.current) {
        observer.unobserve(accRef.current);
      }
    };
  }, []);

  return (
    <div ref={accRef} className="accs">
      <h1 className="acc-title">Accessories</h1>
      <div className="acc-grid">
        {[Img1, Img2, Img3].map((img, index) => (
          <div key={index} className="acc-item">
            <img src={img} alt={`Accessory ${index + 1}`} />
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
    </div>
  );
};

export default Acc;
