import React, { useEffect, useState } from "react";
import "./NumberPlate.css";

const NumberPlate = ({ text = "", sides, spacing, style }) => {
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

  const formatPlate = (plate, addSpacing) => {
    if (addSpacing && plate.length > 5) {
      return plate.slice(0, 5) + " " + plate.slice(5);
    }
    return plate;
  };

  const getPlateTextClass = (style = "") => {
    const lowerStyle = style.toLowerCase();

    if (lowerStyle.includes("3d") && lowerStyle.includes("carbon")) {
      return "plate-text-3d-carbon";
    } else if (lowerStyle.includes("3d")) {
      return "plate-text-3d";
    } else if (lowerStyle.includes("4d")) {
      return "plate-text-4d";
    } else if (lowerStyle.includes("carbon")) {
      return "plate-text-carbon";
    } else {
      return ""; // Default plain text
    }
  };

  const plateTextClass = getPlateTextClass(style);

  return (
    <>
      <h1 className="build-title">Build Your Plate</h1>
      <h1 className="no-text title-typing-2">Start typing to see your plate</h1>
      {displayText ? (
        <div
          className={`plate-container ${isVisible ? "fade-in" : "fade-out"}`}
        >
          {sides === "Both" ? (
            <>
              <div className="number-plate front-plate">
                <span
                  className={`plate-text ${plateTextClass}`}
                  data-text={displayText}
                >
                  {displayText}
                </span>
                <span className="trade">T333s customs</span>
              </div>
              <div className="number-plate rear-plate">
                <span
                  className={`plate-text ${plateTextClass}`}
                  data-text={displayText}
                >
                  {displayText}
                </span>
                <span className="trade">T333s customs</span>
              </div>
            </>
          ) : sides === "Front" ? (
            <div className="number-plate front-plate">
              <span
                className={`plate-text ${plateTextClass}`}
                data-text={displayText}
              >
                {displayText}
              </span>
            </div>
          ) : (
            <div className="number-plate rear-plate">
              <span
                className={`plate-text ${plateTextClass}`}
                data-text={displayText}
              >
                {displayText}
              </span>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NumberPlate;
