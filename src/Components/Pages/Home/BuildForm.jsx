import React, { useState } from "react";
import "./BuildForm.css";
import NumberPlate from "./NumberPlate";
import StylesGrid from "./StylesGrid";

const BuildForm = () => {
  const [state, setState] = useState("");
  const [sides, setSides] = useState("Both");
  const [spacing, setSpacing] = useState(false);

  const onChange = (value) => {
    const cleanedValue = value.replace(/\s/g, ""); // Remove existing spaces
    if (cleanedValue.length > 7) return;
    setState(cleanedValue);
  };

  const formatPlate = (text) => {
    if (spacing) {
      return (
        text.slice(0, Math.ceil(text.length / 2)) +
        " " +
        text.slice(Math.ceil(text.length / 2))
      );
    }
    return text;
  };

  return (
    <div className="build-form">
      <div className="left">
        <div className="top">
          <NumberPlate text={formatPlate(state)} sides={sides} />
        </div>
        <div className="bottom">
          <div className="number-input-con">
            <input
              value={state}
              onChange={(e) => onChange(e.target.value)}
              className="number-input"
              placeholder="Enter Your Number plate"
            />
            <div className="hor">
              <select
                name="spacing-options"
                className="number-input"
                onChange={(e) => setSpacing(e.target.value === "custom")}
              >
                <option value="standard">Legal Spacing</option>
                <option value="custom">Custom Spacing</option>
              </select>
              <select name="vehicle-type" className="number-input">
                <option value="car">Car</option>
                <option value="motorbike">Motorbike</option>
              </select>
              <select
                name="plate-sides"
                className="number-input"
                value={sides}
                onChange={(e) => setSides(e.target.value)}
              >
                <option value="Both">Both</option>
                <option value="Rear">Rear</option>
                <option value="Front">Front</option>
              </select>
            </div>
          </div>
          <div className="group-bottoms">
            <button className="btn-item selected">Standard Plate</button>
            <button className="btn-item">3D Gel Plate</button>
            <button className="btn-item">4D Laser Cut</button>
            <button className="btn-item">Short Plate</button>
            <button className="btn-item">Show Plate</button>
          </div>
          <div className="center-btn">
            <button className="add-basket">Add to basket</button>
          </div>
        </div>
      </div>
      <div className="right">
        <StylesGrid />
      </div>
    </div>
  );
};

export default BuildForm;
