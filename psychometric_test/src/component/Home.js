import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  const containerStyle = {
    backgroundImage: `url('https://img.freepik.com/free-vector/back-view-landscape-with-businessman-long-way-ahead-business-person-new-career-opportunities-straight-road-bright-future-flat-vector-illustration-motivation-challenge-goal-concept_74855-24324.jpg')`,
    // alignItems: 'center',
    backgroundSize : "cover",
    height: '100vh',
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: '#0074d9', // Background color for the button
    color: '#fff', // Text color
    fontSize: '24px', // Font size
    padding: '10px 20px', // Padding around the text
    border: 'none', // Remove button border
    borderRadius: '8px', // Rounded corners
    cursor: 'pointer', // Add a pointer cursor on hover
    
  };

  const textStyle = {
    paddingTop:"300px",
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'black',
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        <h5>Hello guys!! Take your personality test here</h5>
      </div>
      <Link to="/personality_test">
        <button style={buttonStyle}>Go to Personality Test</button>
      </Link>
    </div>
  );
};

export default Home;