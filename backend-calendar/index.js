require('dotenv').config();
const express = require("express");
const  connection  = require("./db");
const authRoutes = require('./routes/eventRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api',eventRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connection
    console.log(`Server is running on port ${PORT} and also connected DB connection`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
});
