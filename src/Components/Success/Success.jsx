import React, { useEffect } from "react";
import "./Success.css";
import Img from "../../Images/tick.jpg";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const nav = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      nav("/");
    }, 3000);
  }, []);
  return (
    <div className="success">
      <img src={Img} alt="" />
      <h2>
        Your order has been placed, a confirmation email will be sent to you
        soon. Redirecting to <a href="/">home</a> page...
      </h2>
    </div>
  );
};

export default Success;
