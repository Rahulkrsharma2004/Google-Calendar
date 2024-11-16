import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/current_user').then((response) => {
      if (response.data) {
        // Fetch events from Google Calendar API here
      }
    });
  }, []);

  const createEvent = (event) => {
    // Logic to create event using Google Calendar API
  };

  return (
    <div>
      <button onClick={() => createEvent()}>Create Calendar Event</button>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
