import React, { useEffect, useState } from "react";
import "./NumberPlate.css";

const NumberPlate = ({ text = "", sides, spacing }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (text.trim()) {
      setDisplayText(formatPlate(text, spacing));
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setDisplayText(""), 500); // Remove text after fade-out
    }
  }, [text, spacing]);

  // Function to insert spacing dynamically
  const formatPlate = (plate, addSpacing) => {
    if (addSpacing && plate.length > 5) {
      return plate.slice(0, 5) + " " + plate.slice(5);
    }
    return plate;
  };

  return (
    <>
      <h1 className="build-title">Build Your Plate</h1>
      {displayText ? (
        <div
          className={`plate-container ${isVisible ? "fade-in" : "fade-out"}`}
        >
          {sides === "Both" ? (
            <>
              <div className="number-plate front-plate">
                <span className="plate-text">{displayText}</span>
              </div>
              <div className="number-plate rear-plate">
                <span className="plate-text">{displayText}</span>
              </div>
            </>
          ) : sides === "Front" ? (
            <div className="number-plate front-plate">
              <span className="plate-text">{displayText}</span>
            </div>
          ) : (
            <div className="number-plate rear-plate">
              <span className="plate-text">{displayText}</span>
            </div>
          )}
        </div>
      ) : (
        <h1 className="no-text title-typing-2">
          Start typing to see your plate
        </h1>
      )}
    </>
  );
};

export default NumberPlate;
