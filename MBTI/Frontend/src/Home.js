import React, { useState } from "react";

const Home = () => {
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [data1, setData] = useState();
  const handleCSVFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedCSVFile(file);
  };
  const handleUpload = async () => {
    if (!selectedCSVFile) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("csvFile", selectedCSVFile);

      const response = await fetch("http://localhost:3002/api/upload", {
        method: "POST",
        body: formData,
      });
      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Error uploading file:", response.status);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  console.log(data1);
  return (
    <div className="container">
      <div>
        <br />
        <br />
        <br/>
        <br/>
        <br/>
        <h1>File Upload</h1>
        <div className="mb-3">
          <h4>
          <label htmlFor="csvFileInput" className="form-label " style={{color:'white'}} >
            Select a CSV file:
          </label>
          </h4>
          <input
            type="file"
            className="form-control"
            id="csvFileInput"
            onChange={handleCSVFileChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleUpload}>
          <h4>Upload Files</h4>
        </button>
      </div>
      {data1 && (
        <div>
          <br />
          <br />
          <h2><u>The final analysis is here!!</u></h2>
          <br />
          {data1.map((item, index) => (
            <div key={index}>
              <h2><u>{item["Final prediction:"]}</u></h2>
              <h4>{item["Traits"]}</h4>
              <br />
            </div>
          ))}
        </div>
      )}
      <br />
      <div>
        <h3>
          The Myers Briggs Type Indicator (or MBTI for short) is a personality
          type system that divides everyone into 16 distinct personality types
          across 4 axis:{" "}
        </h3>
        <br />
        <h4>Introversion (I) – Extroversion (E) </h4>
        <h4>Intuition (N) – Sensing (S) </h4>
        <h4>Thinking (T) – Feeling (F) </h4>
        <h4>Judging (J) – Perceiving (P)</h4>
      </div>
    </div>
  );
};

export default Home;
