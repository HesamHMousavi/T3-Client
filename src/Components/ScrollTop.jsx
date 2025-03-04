import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsArrowUp } from "react-icons/bs";
import "./ScrollTop.css";

const ScrollTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`scroll-top ${showButton ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <BsArrowUp color="black" size={25} />
    </div>
  );
};

export default ScrollTop;
