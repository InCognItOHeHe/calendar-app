import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    navigate(`/edit-event/${eventId}`);
  };

  const getEventColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "blue";
      case "low":
        return "green";
      default:
        return "";
    }
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
      <div id="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events.map((event) => ({
            ...event,
            id: event._id,
            title: `${event.title} (${event.time})`,
            backgroundColor: getEventColor(event.priority),
            borderColor: getEventColor(event.priority),
          }))}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
