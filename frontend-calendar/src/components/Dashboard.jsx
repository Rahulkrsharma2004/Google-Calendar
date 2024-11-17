import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('/api/current_user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response.data) {
          // Fetch events from Google Calendar API here
          fetchEvents(token);
        }
      });
    }
  }, []);

  const fetchEvents = async (token) => {
    try {
      const response = await axios.get('/api/events', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  const createEvent = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post('/api/events', {
        // Event data here
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEvents(token); // Refresh events list
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={createEvent}>Create Calendar Event</button>
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
              <td>{event.summary}</td>
              <td>{new Date(event.start.dateTime || event.start.date).toLocaleDateString()}</td>
              <td>{new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
