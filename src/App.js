import React from "react";
import "./App.css";
import Calendar from "./Calendar";
import AddEvent from "./AddEvent";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Calendar</Link>
            </li>
            <li>
              <Link to="/add-event">Add Event</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/add-event" element={<AddEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
