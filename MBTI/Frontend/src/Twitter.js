import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Twitter() {
  const [inputText, setInputText] = useState();
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the submit action here
    console.log("Submitted:", inputText);
    navigate("/personality");
    // You can replace the above line with your actual submit logic.
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter twitter handle"
        style={{ width: "300px", padding: "10px", margin: "10px" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0074d9",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Twitter;
