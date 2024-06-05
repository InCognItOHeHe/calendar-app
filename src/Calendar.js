import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import "./Calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);

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

  const handleEventClick = async (clickInfo) => {
    const eventId = clickInfo.event.id;
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/events/${eventId}`);
        clickInfo.event.remove();
        setEvents(events.filter((event) => event._id !== eventId));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
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
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events.map((event) => ({
        ...event,
        id: event._id,
        title: `${event.title} (${event.time})`,
        backgroundColor: getEventColor(event.priority),
        borderColor: getEventColor(event.priority),
      }))}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
