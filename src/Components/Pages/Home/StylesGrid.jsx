import React, { useEffect, useState, useRef, useContext } from "react";
import "./StylesGrid.css";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../../Context/ClientContext";

const StylesGrid = () => {
  const nav = useNavigate();
  const gridRef = useRef(null);
  const titleRef = useRef(null);
  const { Plates } = useContext(ClientContext);
  const [data, setData] = useState([]);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [isGridVisible, setIsGridVisible] = useState(true);
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

    setData(Plates.slice(0, 4));

    return () => observer.disconnect();
  }, [Plates]);

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
        {data.map((item, index) => (
          <div
            key={index}
            className={`image-container ${
              visibleImages[index] ? "visible" : ""
            }`}
          >
            <img src={item.Images[0]} alt={`${item.Style}`} />
            <div className="image-banner">{item.Style}</div>
          </div>
        ))}
      </div>
      <div className="view-more-con">
        <div className="view-more-btn" onClick={() => nav("/plates")}>
          View More
        </div>
      </div>
    </>
  );
};

export default StylesGrid;
