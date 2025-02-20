import React, { useContext, useEffect, useState } from "react";
import "./PlatesGrid.css";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../../Context/ClientContext";

const PlatesGrid = () => {
  const nav = useNavigate();
  const { GetAllPlate, Plates, isPlateLoading } = useContext(ClientContext);
  const [state, setState] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await GetAllPlate();
  };

  useEffect(() => {
    setState(Plates);
  }, [Plates]);

  return (
    <div>
      <h1 className="main-title">OUR RANGE</h1>

      {isPlateLoading ? (
        <div
          style={{
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="loader"></span>
        </div>
      ) : (
        state.map((item, idx) => (
          <div key={idx} className="grid-container">
            <span className="price-con">
              <h2 className="grid-heading">{item.Style} </h2>
              <h4 className="price">£{item.Price}</h4>
            </span>
            <div className="grid">
              {item.Images.map((img, index) => (
                <div key={index} className="grid-item">
                  <img
                    src={img}
                    alt={`plate-${index}`}
                    className="grid-image"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="center-btn">
        {!isPlateLoading && (
          <button className="view-more-btn" onClick={() => nav("/")}>
            Build my plate
          </button>
        )}
      </div>
    </div>
  );
};

export default PlatesGrid;
