// const { google } = require("googleapis");
// const User = require("../models/User");
// const createEvent = async (req, res) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     console.log("Token:", token);

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Authentication token is required" });
//     }

//     const user = await User.findOne({ accessToken: token });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const oAuth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET
//     );

//     oAuth2Client.setCredentials({ access_token: token });

//     const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

//     const { name, date, time, duration = 60 } = req.body;

//     const startTime = new Date(`${date}T${time}:00`);
//     const endTime = new Date(startTime.getTime() + duration * 60000);

//     const event = {
//       summary: name,
//       start: {
//         dateTime: startTime,
//         timeZone: "America/Los_Angeles",
//       },
//       end: {
//         dateTime: endTime,
//         timeZone: "America/Los_Angeles",
//       },
//     };

//     const response = await calendar.events.insert({
//       calendarId: "primary",
//       resource: event,
//     });

//     res.status(201).json({
//       message: "Event created successfully",
//       event: response.data,
//     });
//   } catch (error) {
//     console.error("Error creating event:", error);
//     res.status(500).json({ message: "Event creation failed", error });
//   }
// };

// const getEvents = async (req, res) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const user = await User.findOne({ accessToken: token });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     const oAuth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET
//     );

//     oAuth2Client.setCredentials({ access_token: token });

//     const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

//     const response = await calendar.events.list({
//       calendarId: "primary",
//       timeMin: new Date().toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: "startTime",
//     });

//     res.status(200).json(response.data.items);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Error fetching events", error });
//   }
// };

// module.exports = {
//   createEvent,
//   getEvents,
// };






const { google } = require("googleapis");
const User = require("../models/User");

const createEvent = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }

    const user = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const { name, startDate, startTime, endDate, endTime } = req.body;

    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate}T${endTime}:00`);

    const event = {
      summary: name,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Kolkata",
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.status(201).json({
      message: "Event created successfully",
      event: response.data,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Event creation failed", error });
  }
};

const getEvents = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const response = await calendar.events.list({
      calendarId: "primary",
      // timeMin: new Date().toISOString(),
      maxResults: 20,
      singleEvents: true,
      orderBy: "startTime",
    });

    res.status(200).json(response.data.items);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

module.exports = {
  createEvent,
  getEvents,
};
