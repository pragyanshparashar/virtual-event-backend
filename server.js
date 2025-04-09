const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Virtual Event Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
