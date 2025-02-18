import React, { useEffect, useRef } from "react";
import Img from "../../Images/logo-t3.jpeg";
import { FaInstagram } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (footerRef.current) footerRef.current.classList.add("visible");
        } else {
          if (footerRef.current) footerRef.current.classList.remove("visible"); // Remove to reanimate
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div ref={footerRef} className="footer">
      {/* Left Section - Quick Links & Our Store */}
      <div className="footer-section between">
        <div>
          <div className="footer-title">Quick Links</div>
          <div className="footer-links">
            <p>Home</p>
            <p>Plate Style</p>
            <p>FAQ’s</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div>
          <div className="footer-title">Our Store</div>
          <div className="footer-store">
            <p>8 Hove Ct, WF16 9BW</p>
            <p>T333scustoms@gmail.com</p>
            <p>+44 7456 604345</p>
          </div>
        </div>
      </div>

      <div className="between">
        <img src={Img} alt="Logo" className="footer-logo-img" />
        <div>
          <div className="footer-title">Follow us</div>
          <div className="between-row">
            <div>
              <FaInstagram />
              <FaInstagram />
            </div>
            <span>@t333</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
