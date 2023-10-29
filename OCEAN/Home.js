import React, { useState } from 'react';


const Home = () => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
  
  const handleInputChange = (event, setQuestion) => {
    setQuestion(event.target.value);
  };

  const send_data = () => {
    const formData = {
      question1,
      question2,
      question3,
      question4,
      question5,
    };
  
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
  

  console.log(question5)

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="question1" style={labelStyle}>    'Discuss a significant experience that challenged your beliefs or viewpoints. How did you respond to this challenge, and what did you learn from the experience?',</label>
          <input
            type="text"
            id="question1"
            style={textInputStyle}
            value={question1}
            onChange={(e) => handleInputChange(e, setQuestion1)}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="question2" style={labelStyle}>'Describe a project or task where you had to manage multiple responsibilities and deadlines. How did you organize your time, and what strategies did you employ to ensure completion?'</label>
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
          <label htmlFor="question3" style={labelStyle}>'Reflect on a social situation where you took on a leadership role or played a significant part in a group dynamic. How did you interact with others, and what were the outcomes of your involvement?'</label>
          <input
            type="text"
            id="question3"
            style={textInputStyle}
            value={question3}
            onChange={(e) => handleInputChange(e, setQuestion3)}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="question4" style={labelStyle}> 'Discuss a scenario where you encountered a conflict or disagreement with others. How did you approach the situation, and what steps did you take to resolve the conflict or reach a compromise?'</label>
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
          <label htmlFor="question5" style={labelStyle}> 'Think of a challenging or stressful event in your life. How did you manage the stress and emotions associated with it? What coping mechanisms or strategies did you employ?'</label>
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
  backgroundColor: 'black',
  color: 'white',
  padding: '20px',
};

const rowStyle = {
  // display: 'flex',
};

const inputContainerStyle = {
  background: 'gray-500',
  padding: '10px',
  borderRadius: '10px',
  margin: 20
};

const labelStyle = {
  marginBottom: '5px',
};

const textInputStyle = {
  width: '1500px', // Set the width of the input boxes
  // height: '300px', // You can adjust the height as needed
  fontSize: '16px', // Set the font size
  padding: '10px',
  borderRadius: '10px',
  display:'flex'
};

const buttonStyle = {
  backgroundColor: '#0074d9',
  color: 'white',
  fontSize: '16px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const containerStyle1 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // height: '100vh',
  margin: '0',
  textAlign: 'center',
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