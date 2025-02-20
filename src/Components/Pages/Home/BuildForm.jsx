import React, { useState, useContext } from "react";
import NumberPlate from "./NumberPlate";
import StylesGrid from "./StylesGrid";
import { ClientContext } from "../../../Context/ClientContext";
import "./BuildForm.css";

const BuildForm = () => {
  const { Plates, AddBasket, addAlert, isPlateLoading } =
    useContext(ClientContext);
  const [formData, setFormData] = useState({
    Plate: "",
    Side: "",
    Style: "",
    spacing: false,
    spacingChoice: "",
    Number: "",
    Price: 0,
    Quantity: 1,
    vehicleType: "",
  });

  const onChange = (value) => {
    const cleanedValue = value.replace(/\s/g, "").toUpperCase();
    if (cleanedValue.length > 7) return;
    setFormData((prev) => ({ ...prev, Number: cleanedValue }));
  };

  const validateInputs = () => {
    let isValid = true;
    const errors = [];

    // 1) Number Plate
    if (!formData.Number.match(/^[A-Z0-9]{1,7}$/)) {
      errors.push("Invalid number plate format");
      isValid = false;
    }

    // 2) Plate Style
    else if (!formData.Plate) {
      errors.push("Please select a plate style");
      isValid = false;
    }

    // 3) Spacing
    else if (!formData.spacingChoice) {
      errors.push("Please select a spacing option");
      isValid = false;
    }

    // 4) Vehicle Type
    else if (!formData.vehicleType) {
      errors.push("Please select vehicle type");
      isValid = false;
    }

    // 5) Plate Position
    else if (!formData.Side) {
      errors.push("Please select plate position");
      isValid = false;
    }

    // Display all errors in the order we pushed them
    if (!isValid) {
      errors.forEach((errMsg) => {
        addAlert(errMsg, "warning");
      });
    }

    return isValid;
  };

  const AddToBasket = () => {
    if (!validateInputs()) return;
    AddBasket(formData);
  };

  const formatPlate = (text) => {
    // Insert a space if 'custom' spacing is selected
    if (formData.spacing) {
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
          <NumberPlate
            text={formatPlate(formData.Number)}
            sides={formData.Side}
          />
        </div>
        <div className="bottom">
          <div className="number-input-con">
            <input
              value={formData.Number}
              name="Number"
              onChange={(e) => onChange(e.target.value)}
              className="number-input"
              placeholder="Enter Your Number plate"
            />
            <div className="hor">
              <select
                name="spacing"
                className="number-input"
                value={formData.spacingChoice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    spacingChoice: e.target.value,
                    spacing: e.target.value === "custom",
                  }))
                }
              >
                <option value="">Select Spacing</option>
                <option value="standard">No spacing</option>
                <option value="custom">Legal Spacing</option>
              </select>
              <select
                name="vehicle-type"
                className="number-input"
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    vehicleType: e.target.value,
                  }))
                }
              >
                <option value="">Select Vehicle</option>
                <option value="car">Car</option>
                <option value="motorbike">Motorbike</option>
              </select>
              <select
                name="plate-sides"
                className="number-input"
                value={formData.Side}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Side: e.target.value }))
                }
              >
                <option value="">Select Front/Rear Plate</option>
                <option value="Both">Both</option>
                <option value="Back">Rear</option>
                <option value="Front">Front</option>
              </select>
            </div>
          </div>
          <div className="group-bottoms">
            {Plates.map((item, index) => (
              <button
                key={index}
                className={`btn-item ${
                  formData.Plate === item._id ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    Plate: item._id,
                    Style: item.Style,
                    Price: item.Price,
                  }))
                }
              >
                {item.Style}
              </button>
            ))}
          </div>
          <div className="center-btn">
            <button className="add-basket" onClick={AddToBasket}>
              Add to basket
            </button>
          </div>
        </div>
      </div>
      <div className="right">
        {isPlateLoading ? (
          <div
            style={{
              minHeight: "300px",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="loader"></span>
          </div>
        ) : (
          <StylesGrid />
        )}
      </div>
    </div>
  );
};

export default BuildForm;
