const { google } = require('googleapis');
const User = require('../models/User'); // Assuming you have the User model with accessToken

const createEvent = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    // Fetch user by accessToken (this assumes you store the access token in your User model)
    const user = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize OAuth2 client for Google API
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    // Set the credentials for the OAuth2 client
    oAuth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    // Destructure event details from request body
    const { name, date, time, duration = 60 } = req.body;  // You can pass duration (in minutes) or default to 60 minutes

    // Create start and end Date objects
    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + duration * 60000); // Add duration in minutes to start time

    const event = {
      summary: name,
      start: {
        dateTime: startTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/Los_Angeles',
      },
    };

    // Call Google Calendar API to create event
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.status(201).json({
      message: 'Event created successfully',
      event: response.data,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Event creation failed', error });
  }
};

const getEvents = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),  // Get events from the current time onward
      maxResults: 10,                     // Limit results to 10 events
      singleEvents: true,
      orderBy: 'startTime',               // Order by start time
    });

    res.status(200).json(response.data.items);  // Return events
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

module.exports = {
  createEvent,
  getEvents,
};
