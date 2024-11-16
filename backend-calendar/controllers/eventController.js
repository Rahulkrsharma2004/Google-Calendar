const { google } = require('googleapis');
const User = require('../models/User');

const createEvent = async (req, res) => {
  const { name, date, time } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({ access_token: user.accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const event = {
      summary: name,
      start: {
        dateTime: new Date(`${date}T${time}:00`),
        timeZone: 'America/Los_Angeles'
      },
      end: {
        dateTime: new Date(`${date}T${time}:00`),
        timeZone: 'America/Los_Angeles'
      }
    };

    await calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });

    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Event creation failed', error });
  }
};

module.exports = {
  createEvent
};
