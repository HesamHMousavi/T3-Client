import React, { useEffect, useRef, useState, useContext } from "react";
import { ClientContext } from "../../../Context/ClientContext";
import "./Acc.css";
import { BsCartPlusFill } from "react-icons/bs";

const Acc = () => {
  const accRef = useRef(null);
  const { GetAllProducts, Products, AddBasket, addAlert } =
    useContext(ClientContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch all products
    await GetAllProducts();
  };

  useEffect(() => {
    // IntersectionObserver for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (accRef.current) accRef.current.classList.add("visible");
        } else {
          if (accRef.current) accRef.current.classList.remove("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (accRef.current) {
      observer.observe(accRef.current);
    }

    // Show only first 3 accessories (as per your example)
    setData(Products.slice(0, 3));

    return () => {
      if (accRef.current) {
        observer.unobserve(accRef.current);
      }
    };
  }, [Products]);

  // Basic validation before adding an item to the basket
  const validateItem = (item) => {
    if (!item || !item._id) {
      addAlert("Item data is invalid. Cannot add to basket.", "warning");
      return false;
    }
    return true;
  };

  // Handle adding an accessory to the basket
  const handleAddToBasket = (item) => {
    if (!validateItem(item)) return;

    // Build the payload you want to store in the basket
    const formData = {
      _id: item._id,
      Name: item.Name || "Accessory",
      Price: item.Price || 10, // Fallback if item.Price doesn't exist
      Quantity: 1,
      Images: item.Images || [],
    };

    AddBasket(formData);
    addAlert("Item Added to Basket!", "success");
  };

  return (
    <div ref={accRef} className="accs">
      <h1 className="acc-title">Accessories</h1>
      <div className="acc-grid">
        {data.map((item, index) => (
          <div key={index} className="acc-item">
            <img
              src={item.Images[0]}
              alt={item.name || `Accessory ${index + 1}`}
            />
            <h4>{item.name || "Item Name"}</h4>
            <p>£{item.Price ?? 10}</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn-add-basket"
                onClick={() => handleAddToBasket(item)}
              >
                <span>Add</span>
                <BsCartPlusFill size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acc;
