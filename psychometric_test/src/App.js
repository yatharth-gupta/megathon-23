import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PersonalityTest from "./component/PersonalityTest";
import Home from "./component/Home";
// import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/personality_test" element={<PersonalityTest/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
