import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EventForm = ({ isEdit }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [recurrence, setRecurrence] = useState("none");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/events/${id}`
          );
          const { title, start, time, priority, recurrence } = response.data;
          setTitle(title);
          setDate(start);
          setTime(time);
          setPriority(priority);
          setRecurrence(recurrence || "none");
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      };
      fetchEvent();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, start: date, time, priority, recurrence };
    try {
      if (isEdit && id) {
        await axios.put(`http://localhost:5000/events/${id}`, newEvent);
      } else {
        await axios.post("http://localhost:5000/events", newEvent);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Event" : "Add Event"}</h2>
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
        <div>
          <label>Recurrence:</label>
          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
            required
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button type="submit">{isEdit ? "Update Event" : "Add Event"}</button>
      </form>
    </div>
  );
};

export default EventForm;
