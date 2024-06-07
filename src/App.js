// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./Calendar";
import EventForm from "./EventForm";
import ResponseTimeChecker from "./ResponseTimeChecker";
import "./App.css";
import Logo from "./loogo.svg";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
    document.body.classList.toggle("light-mode", darkMode);
  };

  return (
    <div className="App">
      <Router>
        <header>
          <img src={Logo} alt="Logo" className="logo" /> {/* Wyświetl logo */}
          <ResponseTimeChecker url="http://localhost:5000/events" />{" "}
        </header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/add-event">Add Event</a>
            </li>
            <li>
              <button onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/add-event" element={<EventForm isEdit={false} />} />
          <Route path="/edit-event/:id" element={<EventForm isEdit={true} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
