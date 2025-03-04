import React, { useEffect, useState, useRef, useContext } from "react";
import "./StylesGrid.css";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../../Context/ClientContext";

const StylesGrid = ({ selected }) => {
  const nav = useNavigate();
  const gridRef = useRef(null);
  const { Plates } = useContext(ClientContext);
  const [data, setData] = useState([]);

  function getItemByName() {
    return data.find((item) => item.Style === selected.Style);
  }
  useEffect(() => {
    setData(Plates);
  }, [Plates]);

  return (
    <div className="con">
      <h1 className="grid-title">Our Range</h1>
      <div className="styles-grid">
        {selected.Plate !== "" ? (
          <div className="image-container">
            <img src={getItemByName()?.Images[0]} />
            <div className="image-banner">
              <h3>{getItemByName().Style}</h3>
              <h3>£{getItemByName().Price}</h3>
            </div>
          </div>
        ) : (
          data.map((item, index) => (
            <div key={index} className="image-container">
              <img src={item.Images[0]} alt={`${item.Style}`} />
              <div className="image-banner">
                <h3>{item.Style}</h3>
                <h3>£{item.Price}</h3>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="view-more-con">
        <div className="view-more-btn" onClick={() => nav("/plates")}>
          View More
        </div>
      </div>
    </div>
  );
};

export default StylesGrid;
