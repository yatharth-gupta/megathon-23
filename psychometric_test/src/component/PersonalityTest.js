import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import axios from "axios";

function PersonalityTest() {
  const questions = [
    "1. I am the life of the party.",
    "2. I talk a lot.",
    "3. I feel comfortable around people.",
    "4. I don't keep in the background.",
    "5. I start conversations.",
    "6. I have a lot to say.",
    "7. I talk to a lot of different people at parties.",
    "8. I like to draw attention to myself.",
    "9. I don't mind being the center of attention.",
    "10. I am not quiet around strangers.",
    "11. I get stressed out easily.",
    "12. I am stressed out most of the time.",
    "13. I worry about things.",
    "14. I often feel blue.",
    "15. I am easily disturbed.",
    "16. I get upset easily.",
    "17. I change my mood a lot.",
    "18. I have frequent mood swings.",
    "19. I get irritated easily",
    "20. I often feel blue.",
    "21. I feel concern for others.",
    "22. I am interested in people.",
    "23. I don't insult people.",
    "24. I sympathize with others feelings.",
    "25. I am interested in other peoples' problems.",
    "26. I have a soft heart",
    "27. I am quite interested in others.",
    "28. I take time out for others",
    "29. I feel others emotions",
    "30. I make people feel at ease.",
    "31. I am always prepared.",
    "32. I don't leave my belongings around.",
    "33. I pay attention to details",
    "34. I don't make a mess of things.",
    "35. I get chores done right away.",
    "36. I rarely forget to put things back in their proper place.",
    "37. I like order.",
    "38. I don't shirk my duties.",
    "39. I follow a schedule.",
    "40. I am exacting in my work.",
    "41. I have a rich vocabulary.",
    "42. I easily understand abstract ideas.",
    "43. I have a vivid imagination.",
    "44. I am interested in abstract ideas.",
    "45. I have excellent ideas",
    "46. I have a good imagination.",
    "47. I am quick to understand things.",
    "48. I use difficult words.",
    "49. I spend time reflecting on things.",
    "50. I am full of ideas.",
  ];
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [age, setAge] = useState(18);
  const [gender, setgender] = useState("Male");
  const [next_disabled, setNext_disabled] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);

  const sendData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/receive-data", {
        age: age,
        gender: gender,
        selectedValues: JSON.stringify(selectedValues),
      });

      console.log("Data sent:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleQuestionSelect = (value) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[currentQuestionIndex] = value;
    setSelectedValues(newSelectedValues);
    setNext_disabled(false);
    // console.log(selectedValues)
  };

  const handleNextQuestion = () => {
    // Move to the next question if available
    setNext_disabled(true);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of questions
      alert("End of questions!");

      // Send data to server
      sendData();
      // navigate to home page
      navigate("/");
    }
  };
  // console.log(selectedValues);

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "white",
      backgroundImage: `url('https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/black/Photoroom_black_background_extremely_fine_texture_only_black_co_c100e1e4-63a9-4adc-9794-202888321104.jpg')`,
      backgroundSize: "cover"
    }}

    
    >
      <div>
        <h2 style={{ color: "white", textAlign: "center" }}>Age</h2>
        <input
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          type="number"
          placeholder="Age"
          style={{
            backgroundColor: "#333",
            color: "white",
            fontSize: "16px",
            padding: "10px",
            border: "1px solid #666",
            borderRadius: "4px",
          }}
        />
      </div>
      <br />
      <div>
        <h2 style={{ color: "white", textAlign: "center" }}>Gender</h2>
        <select
          value={gender}
          onChange={(e) => {
            setgender(e.target.value);
          }}
          style={{
            backgroundColor: "#333",
            color: "white",
            fontSize: "16px",
            padding: "10px",
            border: "1px solid #666",
            borderRadius: "4px",
          }}
        >
          <option value="Male" style={{ backgroundColor: "#333" }}>
            Male
          </option>
          <option value="Female" style={{ backgroundColor: "#333" }}>
            Female
          </option>
        </select>
      </div>
      <div
        style={{
          color: "white",
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        <br />
        Personality Test
      </div>
      <Question
        question={questions[currentQuestionIndex]}
        onSelect={handleQuestionSelect}
        selectedValue={selectedValues[currentQuestionIndex]}
        onValueChange={handleQuestionSelect}
      />
      <button
        style={{
          borderRadius: "10px", // Rounded corners
          fontSize: "24px", // Font size
          backgroundColor: "#0074d9", // Background color
          color: "#fff", // Text color
          padding: "10px 20px", // Padding around the text
          border: "none", // Remove button border
          cursor: "pointer", // Add a pointer cursor on hover
        }}
        onClick={handleNextQuestion}
        disabled={next_disabled}
      >
        {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
}

export default PersonalityTest;
