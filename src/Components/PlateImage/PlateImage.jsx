import React, { useEffect, useRef } from "react";
import "./PlateImage.css";

const PlateImage = ({ Img, Title = null, isFirst = false }) => {
  const plateImgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (plateImgRef.current) {
            plateImgRef.current.classList.add("visible");
          }
        } else {
          if (plateImgRef.current)
            plateImgRef.current.classList.remove("visible"); // Remove to reanimate
        }
      },
      { threshold: 0.5 }
    );

    if (plateImgRef.current) {
      observer.observe(plateImgRef.current);
    }

    return () => {
      if (plateImgRef.current) {
        observer.unobserve(plateImgRef.current);
      }
    };
  }, []);

  return (
    <div
      className="plate-img"
      ref={plateImgRef}
      style={isFirst ? { marginTop: "120px" } : {}}
    >
      <img src={Img} alt="Plate" />
      <h1 className="title-typing">{Title}</h1>
    </div>
  );
};

export default PlateImage;
