import React, { useState } from "react";

const Home = () => {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");

  const handleInputChange = (event, setQuestion) => {
    setQuestion(event.target.value);
  };

  console.log(question5);

  const send_data = () => {
    const formData = {
      question1,
      question2,
      question3,
      question4,
      question5,
    };
    alert("Sending data !!")
    fetch("http://localhost:3001/submit-questions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          // Handle a successful response here
          console.log("Questions submitted successfully");
        } else {
          // Handle errors or other responses here
          console.error("Failed to submit questions");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingText}>
        <u>PLEASE WRITE SHORT ESSAYS ON THE FOLLOWING TOPIC</u>
      </h1>
      <div style={rowStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="question1" style={labelStyle}>
            <h3>
              1) Discuss a significant experience that challenged your beliefs
              or viewpoints. How did you respond to this challenge, and what did
              you learn from the experience?
            </h3>
          </label>
          <input
            type="text"
            id="question1"
            style={textInputStyle}
            value={question1}
            onChange={(e) => handleInputChange(e, setQuestion1)}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="question2" style={labelStyle}>
            <h3>
              2) Describe a project or task where you had to manage multiple
              responsibilities and deadlines. How did you organize your time,
              and what strategies did you employ to ensure completion?
            </h3>
          </label>
          <input
            type="text"
            id="question2"
            style={textInputStyle}
            value={question2}
            onChange={(e) => handleInputChange(e, setQuestion2)}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="question3" style={labelStyle}>
            <h3>
              3) Reflect on a social situation where you took on a leadership
              role or played a significant part in a group dynamic. How did you
              interact with others, and what were the outcomes of your
              involvement?
            </h3>
          </label>
          <input
            type="text"
            id="question3"
            style={textInputStyle}
            value={question3}
            onChange={(e) => handleInputChange(e, setQuestion3)}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="question4" style={labelStyle}>
            <h3>
              4) Discuss a scenario where you encountered a conflict or
              disagreement with others. How did you approach the situation, and
              what steps did you take to resolve the conflict or reach a
              compromise?
            </h3>
          </label>
          <input
            type="text"
            id="question4"
            style={textInputStyle}
            value={question4}
            onChange={(e) => handleInputChange(e, setQuestion4)}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="question5" style={labelStyle}>
            <h3>
              5) Think of a challenging or stressful event in your life. How did
              you manage the stress and emotions associated with it? What coping
              mechanisms or strategies did you employ?
            </h3>
          </label>
          <input
            type="text"
            id="question5"
            style={textInputStyle}
            value={question5}
            onChange={(e) => handleInputChange(e, setQuestion5)}
          />
        </div>
        <div style={containerStyle1}>
          <button style={buttonStyle} onClick={send_data}>Next</button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  backgroundImage: `url('https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/black/Photoroom_black_background_extremely_fine_texture_only_black_co_c100e1e4-63a9-4adc-9794-202888321104.jpg')`,
  // backgroundSize:"100% 100vh",
  backgroundSize: "cover",
  // color: "white",
  padding: "20px",
  // height: "140vh",
  textAlign: "center",
};

const headingText = {
  textAlign: "center",
  color: "white"
};

const rowStyle = {
  // display: 'flex',
  color: "white"
};

const inputContainerStyle = {
  background: "gray-500",
  padding: "10px",
  borderRadius: "10px",
};

const labelStyle = {
  marginBottom: "5px",
};

const textInputStyle = {
  width: "1500px", // Set the width of the input boxes
  fontSize: "16px", // Set the font size
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  height: "100px",
  marginLeft: "90px",
};

const buttonStyle = {
  backgroundColor: "#0074d9",
  color: "white",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const containerStyle1 = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0",
  marginTop:"20px",
  textAlign: "center",
};

export default Home;


// Openness to Experience:
// Answer: Exploring the concept of minimalism was a turning point for me. I stumbled upon it during a difficult phase. Adopting minimalism reshaped my perspective on possessions and consumerism. It was challenging to reevaluate my attachments to material things, but it ultimately led to a more liberated and mindful way of living. I began prioritizing experiences over possessions, which significantly enriched my life.

// Conscientiousness:
// Answer: Executing a community service project demanded meticulous planning and unwavering attention to detail. I meticulously coordinated logistics, schedules, and resources. Every aspect was methodically organized, ensuring smooth execution. The results were gratifying — a well-executed project that positively impacted the community, demonstrating the importance of diligence and conscientious efforts.

// Extraversion:
// Answer: I vividly recall a team-building workshop where I assumed a leadership role. Engaging with diverse personalities, I took charge in fostering collaboration. Initiating discussions, encouraging participation, and maintaining an inclusive atmosphere facilitated successful teamwork. The experience was energizing, reaffirming my ability to connect with people and foster a positive environment.

// Agreeableness:
// Answer: Resolving a conflict between colleagues required a balanced approach. I mediated by actively listening to both perspectives, encouraging empathy and compromise. My goal was to find common ground, leading to a resolution that considered everyone's concerns. The outcome was a harmonious working relationship, highlighting the significance of maintaining peace and cooperation.

// Neuroticism:
// Answer: Coping with a sudden job loss was an emotionally taxing period. It triggered anxiety and self-doubt. Managing the emotional rollercoaster was challenging, but through a support network and self-reflection, I learned to channel the stress positively. It taught me resilience and the significance of self-care during tumultuous times.