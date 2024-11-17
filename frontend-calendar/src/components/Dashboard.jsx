import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [googleToken, setGoogleToken] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setGoogleToken(token);
      fetchEvents(token);
      localStorage.setItem("authToken", token);
    } else {
      console.log("No Google token found.");
    }
  }, []);

  const fetchEvents = async (token) => {
    try {
      const response = await axios.get(
        "https://google-calendar-nine-blond.vercel.app/api/events/getevent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events from backend", error);
    }
  };

  const createEvent = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.post(
        "https://google-calendar-nine-blond.vercel.app/api/events/createevent",
        {
          name: eventName,
          date: eventDate,
          time: eventTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Event created successfully!");
      fetchEvents(token);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error creating event in backend", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent();
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Calendar</a>
            </li>
            <li>
              <a href="#">Tasks</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="search-bar">
            <h2>Real-Time Calendar</h2>
          </div>
          <div className="user-info">
            <span>Rahul</span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s"
              alt="User Avatar"
            />
          </div>
        </header>

        <section className="calendar-section">
          <div className="calendar-header">
            <h2>December 7, 2020</h2>
          </div>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="create-event-button"
          >
            Create Calendar Event
          </button>

          <table className="events-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.summary}</td>
                  <td>{new Date(event.start.dateTime).toLocaleDateString()}</td>
                  <td>{new Date(event.start.dateTime).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
              />
              <button className="submit" type="submit">
                Submit
              </button>
              <button
                className="cancel"
                type="button"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
