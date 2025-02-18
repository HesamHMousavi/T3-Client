import React, { useEffect, useRef, useState } from "react";
import logo from "../../Images/logo.jpeg";
import { Link } from "react-router-dom";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import SlidingMenu from "./SlidingMenu";
import "./Header.css";

const Header = () => {
  const navbarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!navbarRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (navbarRef.current) {
          if (entry.isIntersecting) {
            navbarRef.current.classList.add("visible");
          } else {
            navbarRef.current.classList.remove("visible");
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(navbarRef.current);

    return () => {
      if (navbarRef.current) {
        observer.unobserve(navbarRef.current);
      }
    };
  }, [navbarRef.current]);

  return (
    <>
      {/* <CheckoutModal isOpen={isOpen} onClose={() => setOpen(false)} /> */}
      <nav className="navbar" ref={navbarRef}>
        <div className="burger-menu" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
        <SlidingMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          isOpen={isOpen}
          onToggle={setOpen}
        />
        <Link to="/" className="hide">
          HOME
        </Link>
        <Link to="/plates" className="hide">
          PLATE STYLES
        </Link>
        <img src={logo} alt="Car Logo" className="car-logo" />
        <Link to="/acc" className="hide">
          ACCESSORIES
        </Link>
        <Link to="/faqs" className="hide">
          FAQS
        </Link>
        <Link to="/checkout" className="cart-icon">
          <FaShoppingCart />
        </Link>
      </nav>
    </>
  );
};

export default Header;
