import React, { useContext } from "react";
import { ClientContext } from "../../Context/ClientContext";
import "./Alert.css";

const Alert = () => {
  const { Alerts } = useContext(ClientContext);

  return (
    <div className="alert-container">
      {Alerts &&
        Alerts?.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        ))}
    </div>
  );
};

export default Alert;
