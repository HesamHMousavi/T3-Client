import React from "react";
import { Link } from "react-router-dom";
import "./SlidingMneu.css";
import { FaShoppingCart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const SlidingMenu = ({ menuOpen, setMenuOpen, isOpen, onToggle }) => {
  console.log(menuOpen);
  return (
    <div className={`sliding-menu ${menuOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setMenuOpen(false)}>
        <RxCross1 size={20} />
      </button>
      <Link to="/" onClick={() => setMenuOpen(false)}>
        HOME
      </Link>
      <Link to="/plates" onClick={() => setMenuOpen(false)}>
        PLATE STYLES
      </Link>
      <Link to="/acc" onClick={() => setMenuOpen(false)}>
        ACCESSORIES
      </Link>
      <Link to="/faqs" onClick={() => setMenuOpen(false)}>
        CONTACT
      </Link>
      <Link to="/checkout" onClick={() => setMenuOpen(false)}>
        <FaShoppingCart size={25} onClick={() => onToggle(!isOpen)} />
      </Link>
    </div>
  );
};

export default SlidingMenu;
