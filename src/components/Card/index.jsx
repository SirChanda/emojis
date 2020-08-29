import React from "react";
import "./main.css";

export default ({ name, img }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <h3>{name}</h3>
        </div>
        <img src={img}></img>
      </div>
    </div>
  );
};
