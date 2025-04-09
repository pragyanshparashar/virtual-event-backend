const events = require("../models/eventModel");

exports.createEvent = (req, res) => {
  const { title, description, date, location, organizer } = req.body;

  if (!title || !description || !date || !location || !organizer) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEvent = {
    id: Date.now(),
    title,
    description,
    date,
    location,
    organizer,
    createdBy: req.user.id, // coming from JWT middleware
  };

  events.push(newEvent);
  res
    .status(201)
    .json({ message: "Event created successfully", event: newEvent });
};
