require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://google-calendar-rks.vercel.app','https://google-calendar-nine-blond.vercel.app' ],
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the event management API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT} and connected to the DB`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
});
