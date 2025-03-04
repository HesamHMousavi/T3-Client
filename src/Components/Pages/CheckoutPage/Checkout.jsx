import React, { useState, useContext } from "react";
import { RxCross1 } from "react-icons/rx"; // For removing product from Basket
import { FiTrash } from "react-icons/fi"; // For removing uploaded file
import { ClientContext } from "../../../Context/ClientContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const CheckoutModal = () => {
  const {
    Basket,
    RemoveFromBasket,
    handleQuantityChange,
    addAlert,
    CreateOrder,
  } = useContext(ClientContext);

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  // ------------------------------
  // Basket Calculation
  // ------------------------------
  const rawSubtotal = Basket.reduce((total, item) => {
    const price = parseFloat(item.Price) || 0;
    const quantity = parseInt(item.Quantity) || 1;
    return total + price * quantity;
  }, 0);
  const formattedSubtotal = rawSubtotal.toFixed(2);

  // ------------------------------
  // Local State for User Inputs
  // ------------------------------
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    PostCode: "",
    StreetName: "",
    HouseNumber: "",
    Phone: "",
    Documents: [], // { FileData: base64String }
  });

  // ------------------------------
  // Handle File Upload
  // ------------------------------
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64File = reader.result; // "data:...;base64,..."

      // Basic check for PDF or image
      const isPDF = base64File.startsWith("data:application/pdf");
      const isImage = base64File.startsWith("data:image");

      if (!isPDF && !isImage) {
        addAlert("Please upload a valid PDF or image file.");
        return;
      }

      // Store the file in Documents array
      setUserData((prev) => ({
        ...prev,
        Documents: [...prev.Documents, { FileData: base64File }],
      }));
    };

    reader.readAsDataURL(file);
  };

  // ------------------------------
  // Remove File
  // ------------------------------
  const removeDocument = (index) => {
    setUserData((prev) => {
      const updatedDocs = [...prev.Documents];
      updatedDocs.splice(index, 1);
      return { ...prev, Documents: updatedDocs };
    });
  };

  // ------------------------------
  // Other Handlers
  // ------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (item, newQty) => {
    if (newQty < 1) return;
    handleQuantityChange(item, newQty);
  };

  const onRemove = (item) => {
    RemoveFromBasket(item);
  };

  // ------------------------------
  // Validation
  // ------------------------------
  const validateUserData = () => {
    let isValid = true;
    const errors = [];

    // 1) Name
    if (!userData.Name.trim()) {
      errors.push("Name is required");
      isValid = false;
    }

    // 2) Email (basic pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.Email.match(emailRegex)) {
      errors.push("A valid email is required");
      isValid = false;
    }

    // 3) PostCode
    else if (!userData.PostCode.trim()) {
      errors.push("Post Code is required");
      isValid = false;
    }

    // 4) StreetName
    else if (!userData.StreetName.trim()) {
      errors.push("Street Address is required");
      isValid = false;
    }

    // 5) HouseNumber
    else if (!userData.HouseNumber.trim()) {
      errors.push("House Number is required");
      isValid = false;
    }

    // 6) Phone
    else if (!userData.Phone.trim()) {
      errors.push("Phone Number is required");
      isValid = false;
    } else if (Basket.some((item) => item.hasOwnProperty("Style"))) {
      // Ensure exactly two files are uploaded
      if (userData.Documents.length !== 2) {
        errors.push("Please upload exactly 2 documents (PDF or image).");
        isValid = false;
      }

      // Regex for valid file types (PDF or image formats)
      const pdfOrImageRegex =
        /^data:(application\/pdf|image\/(png|jpg|jpeg|gif|bmp|webp|svg|tiff|ico));base64,/;

      // Check if both files are valid
      userData.Documents.forEach((doc) => {
        if (!pdfOrImageRegex.test(doc.FileData)) {
          errors.push(
            "Only PDF, PNG, JPG, JPEG, GIF, BMP, WEBP, SVG, TIFF, and ICO files are allowed."
          );
          isValid = false;
        }
      });
    }

    // Display errors in order
    if (!isValid) {
      errors.forEach((errMsg) => addAlert(errMsg, "warning"));
    }

    // Display errors in order
    if (!isValid) {
      errors.forEach((errMsg) => addAlert(errMsg, "warning"));
    }
    return isValid;
  };

  // ------------------------------
  // Checkout
  // ------------------------------
  const handleCheckout = async () => {
    if (!validateUserData()) return;
    setLoading(true);
    const res = await CreateOrder(userData, formattedSubtotal);
    setLoading(false);
    if (res?.msg === "success") {
      nav("/success");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      addAlert("Something Went Wrong", "error");
    }
  };

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <div className="modal-overlay">
      {Basket.length > 0 ? (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Checkout</h2>
          </div>

          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {Basket.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <RxCross1
                      className="remove-icon"
                      onClick={() => onRemove(item)}
                    />
                  </td>
                  <td>
                    {item.Style ? (
                      <>
                        {item.Style}{" "}
                        <strong style={{ color: "#333", display: "block" }}>
                          {item.Number}
                        </strong>
                      </>
                    ) : (
                      item.Name
                    )}
                  </td>
                  <td>£{item.Price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.Quantity}
                      onChange={(e) =>
                        handleChange(item, parseInt(e.target.value))
                      }
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td>
                    £{parseFloat(item.Price * (item.Quantity || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="checkout-content">
            {/* User Details Form */}
            <div className="form-section">
              <h3>
                <span className="ass">*</span> Your Details
              </h3>
              <input
                type="text"
                placeholder="Name"
                name="Name"
                value={userData.Name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="Email"
                value={userData.Email}
                onChange={handleInputChange}
              />

              <h3>
                <span className="ass">*</span> Address
              </h3>
              <input
                type="text"
                placeholder="Post Code"
                name="PostCode"
                value={userData.PostCode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Street Address"
                name="StreetName"
                value={userData.StreetName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="House Number"
                name="HouseNumber"
                value={userData.HouseNumber}
                onChange={handleInputChange}
              />

              <h3>
                <span className="ass">*</span> Phone Number
              </h3>
              <input
                type="text"
                placeholder="Phone Number"
                name="Phone"
                value={userData.Phone}
                onChange={handleInputChange}
              />
              {Basket.some((item) => item.hasOwnProperty("Style")) && (
                <>
                  <h3>
                    <span className="ass">*</span> Upload proof of{" "}
                    <strong>ID</strong> and <strong>ownership</strong>
                    <br />
                    <span style={{ fontSize: "12px" }}>
                      (PDF, PNG, JPEG) 2 documents required
                    </span>
                  </h3>
                  <div className="image-preview">
                    {userData.Documents.map((doc, index) => {
                      const base64Data = doc.FileData;
                      const isPDF = base64Data.startsWith(
                        "data:application/pdf"
                      );

                      return (
                        <div className="document-preview" key={index}>
                          {/* Trash Icon (shown on hover) */}
                          <FiTrash
                            size={20}
                            className="delete-document-icon"
                            onClick={() => removeDocument(index)}
                          />

                          {isPDF ? (
                            <embed
                              src={base64Data}
                              type="application/pdf"
                              width="50"
                              height="50"
                              style={{
                                border: "none",
                                outline: "none",
                                padding: 0,
                                margin: 0,
                              }}
                            />
                          ) : (
                            <img
                              src={base64Data}
                              alt="uploaded-file"
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}

                    {/* Show the "plus sign" box if fewer than 2 files */}
                    {userData.Documents.length < 2 && (
                      <div className="image-box">
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          onChange={handleImageUpload}
                        />
                        <span>+</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Order Summary */}
            <div className="total-section">
              <h2>Total</h2>
              <div className="total-box">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>£{formattedSubtotal}</span>
                </div>
                <div className="total-row">
                  <span>Total</span>
                  <span>£{formattedSubtotal}</span>
                </div>
              </div>
              {loading ? (
                <div className="flex">
                  <span class="loader"></span>
                </div>
              ) : (
                <button className="checkout-btn" onClick={handleCheckout}>
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
          <h2>Basket Empty</h2>
        </div>
      )}
    </div>
  );
};

export default CheckoutModal;
