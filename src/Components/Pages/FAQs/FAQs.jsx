import React, { useState, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import "./FAQs.css";

const FAQs = () => {
  const faqs = [
    {
      question: "Do you sell Show Plates?",
      answer:
        "Yes, we sell high-quality show plates for display purposes only.",
    },
    {
      question: "What are your dispatch times?",
      answer: "We dispatch orders within 1-2 business days.",
    },
    {
      question: "What forms of ID do you accept?",
      answer: "We accept passport, driving license, and national ID.",
    },
    {
      question: "What if I have made a typo and submitted my order?",
      answer:
        "Please contact us immediately to correct any mistakes in your order.",
    },
    {
      question: "Do you sell Show Plates?",
      answer:
        "Yes, we sell high-quality show plates for display purposes only.",
    },
    {
      question: "What are your dispatch times?",
      answer: "We dispatch orders within 1-2 business days.",
    },
    {
      question: "What forms of ID do you accept?",
      answer: "We accept passport, driving license, and national ID.",
    },
    {
      question: "What if I have made a typo and submitted my order?",
      answer:
        "Please contact us immediately to correct any mistakes in your order.",
    },
    {
      question: "Do you sell Show Plates?",
      answer:
        "Yes, we sell high-quality show plates for display purposes only.",
    },
    {
      question: "What are your dispatch times?",
      answer: "We dispatch orders within 1-2 business days.",
    },
    {
      question: "What forms of ID do you accept?",
      answer: "We accept passport, driving license, and national ID.",
    },
    {
      question: "What if I have made a typo and submitted my order?",
      answer:
        "Please contact us immediately to correct any mistakes in your order.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`faq-item ${isOpen ? "open" : ""}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
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
              <div className="faq-answer">{faq.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQs;
