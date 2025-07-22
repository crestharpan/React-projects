import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./starRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating
      maxSize={5}
      message={["Terrible", "Bad", "okay", "Good", "Amazing"]}
    />
    <StarRating maxSize={5} color={"red"} />
    <StarRating maxSize={5} color={"blue"} defaultRating={2} />
  </React.StrictMode>
);
