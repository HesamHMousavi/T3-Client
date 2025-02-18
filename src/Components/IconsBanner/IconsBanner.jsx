import React, { useEffect, useRef } from "react";
import {
  FaTruck,
  FaHeadset,
  FaCertificate,
  FaHome,
  FaFileSignature,
} from "react-icons/fa";
import "./IconsBanner.css";

const features = [
  {
    icon: <FaCertificate />,
    title: "Premium Quality",
    description: "Top-grade materials & craftsmanship.",
  },
  {
    icon: <FaTruck />,
    title: "Fast, tracked Delivery",
    description: "Quick shipping with real-time tracking.",
  },
  {
    icon: <FaHeadset />,
    title: "We answer all enquiries",
    description: "Dedicated support for all your needs.",
  },
  {
    icon: <FaFileSignature />,
    title: "Road Legal & show plates",
    description: "Compliant & stylish number plates.",
  },
  {
    icon: <FaHome />,
    title: "Collection Available",
    description: "Pick up from our location hassle-free.",
  },
];

const IconsBanner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (bannerRef.current) bannerRef.current.classList.add("visible");
        } else {
          if (bannerRef.current) bannerRef.current.classList.remove("visible"); // Remove to reanimate
        }
      },
      { threshold: 0.5 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div ref={bannerRef} className="feature-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-content">
            <div className="feature-front">{feature.icon}</div>
            <div className="feature-back">
              <p>{feature.description}</p>
            </div>
          </div>
          <h3>{feature.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default IconsBanner;
