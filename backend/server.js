const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/mood', require('./src/routes/mood'));
app.use('/api/journal', require('./src/routes/journal'));
app.use('/api/ai', require('./src/routes/ai'));
app.use('/api/coping', require('./src/routes/coping'));

// Database Connection
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/mental_wellness",
    {},
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Mental Wellness API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
