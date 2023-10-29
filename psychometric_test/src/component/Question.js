import React from 'react';

const Question = ({ question, onSelect, selectedValue, onValueChange }) => {
  const handleOptionChange = (event) => {
    const selectedOption = parseInt(event.target.value, 10);
    onValueChange(selectedOption);
    onSelect(selectedOption);
  };

  const containerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: "white",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)',
    width: '45%',
    height: 'auto',
    
  };

  const questionTextStyle = {
    fontSize: '1.2rem',
    marginBottom: '15px',
  };

  const optionsListStyle = {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const labelStyle = {
    fontSize: '0.9rem',
  };

  const radioInputStyle = {
    marginRight: '5px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={questionTextStyle}>{question}</h2>
      <ul style={optionsListStyle}>
        <label>Disagree</label>
        {[0, 1, 2, 3, 4, 5, 6].map((value) => (
          <li key={value}>
            <label style={labelStyle}>
              <input
                type="radio"
                name="option"
                value={value}
                checked={selectedValue === value}
                onChange={handleOptionChange}
                style={radioInputStyle}
              />
              {value}
            </label>
          </li>
        ))}
        <label>Agree</label>
      </ul>
    </div>
  );
};

export default Question;
