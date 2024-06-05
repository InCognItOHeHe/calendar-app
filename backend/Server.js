const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/calendar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  title: String,
  start: String,
  time: String,
  priority: String,
});

const Event = mongoose.model("Event", eventSchema);

app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post("/events", async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json(newEvent);
});

app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
