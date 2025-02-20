import React, { useState, useRef, useContext, useEffect } from "react";
import { ClientContext } from "../../../Context/ClientContext";
import { FaPlus, FaMinus } from "react-icons/fa";

import "./FAQs.css";

const FAQs = () => {
  const { GetAllFAQs, Faqs } = useContext(ClientContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await GetAllFAQs();
  };

  useEffect(() => {
    setData(Faqs);
  }, [Faqs]);

  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      {data.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`faq-item ${isOpen ? "open" : ""}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.Question}</span>
              <span className="faq-icon">
                {isOpen ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            <div
              className="faq-answer-wrapper"
              style={{
                maxHeight: isOpen
                  ? `${answerRefs.current[index]?.scrollHeight}px`
                  : "0px",
              }}
              ref={(el) => (answerRefs.current[index] = el)}
            >
              <div className="faq-answer">{faq.Answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQs;
