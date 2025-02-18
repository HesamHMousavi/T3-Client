import React, { useEffect, useState, useRef } from "react";
import "./StylesGrid.css";
import pic1 from "../../../Images/pic-1.webp";
import pic2 from "../../../Images/pic-2.jpg";
import pic5 from "../../../Images/pic-6.jpg";

const images = [pic5, pic2, pic2, pic1];

const StylesGrid = () => {
  const gridRef = useRef(null);
  const titleRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [visibleImages, setVisibleImages] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === titleRef.current && entry.isIntersecting) {
          setIsTitleVisible(true);
        }
        if (entry.target === gridRef.current && entry.isIntersecting) {
          setIsGridVisible(true);
        }
        if (entry.isIntersecting) {
          setVisibleImages((prev) => ({
            ...prev,
            [entry.target.dataset.index]: true,
          }));
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    document.querySelectorAll(".image-container").forEach((img, index) => {
      img.dataset.index = index;
      observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h1
        ref={titleRef}
        className={`grid-title ${isTitleVisible ? "visible" : ""}`}
      >
        Top Selling
      </h1>
      <div
        ref={gridRef}
        className={`styles-grid ${isGridVisible ? "visible" : ""}`}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`image-container ${
              visibleImages[index] ? "visible" : ""
            }`}
          >
            <img src={img} alt={`Style ${index + 1}`} />
            <div className="image-banner">Style {index + 1}</div>
          </div>
        ))}
      </div>
      <div className="view-more-con">
        <div className="view-more-btn">View More</div>
      </div>
    </>
  );
};

export default StylesGrid;
