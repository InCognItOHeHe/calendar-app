import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && date && time && priority) {
      try {
        const newEvent = { title, start: date, time, priority };
        await axios.post("http://localhost:5000/events", newEvent);
        navigate("/");
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
