import React, { useEffect, useRef } from "react";
import carImage from "../../Images/logo.jpeg";
import "./ContactForm.css";

const ContactForm = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (contactRef.current) contactRef.current.classList.add("visible");
        } else {
          if (contactRef.current)
            contactRef.current.classList.remove("visible"); // Remove to reanimate
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <div ref={contactRef} className="contact-container">
      <form
        className="form-container"
        action="https://formsubmit.co/d.3s@yahoo.com"
        method="POST"
      >
        <h2>Got an enquiry? Send us a message</h2>
        <div className="input-group">
          <input type="text" placeholder="First Name" name="First Name" />
          <input type="text" placeholder="Last Name" name="Last Name" />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email Address" name="Email" />
          <input type="number" placeholder="Phone Number" name="Number" />
        </div>

        <textarea
          placeholder="Type your message here..."
          className="full-width"
          name="Message"
        ></textarea>
        <button className="submit-btn">SUBMIT</button>
      </form>

      <div className="image-container-contact">
        <img src={carImage} alt="Car Illustration" className="car-image" />
      </div>
    </div>
  );
};

export default ContactForm;
