import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import Calendar from "./Calendar";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [googleToken, setGoogleToken] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
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
      setLoading(false);
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
          startDate: eventStartDate,
          startTime: eventStartTime,
          endDate: eventEndDate,
          endTime: eventEndTime,
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
      setEventName("");
      setEventStartDate("");
      setEventStartTime("");
      setEventEndDate("");
      setEventEndTime("");
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
          <img
            src="https://download.logo.wine/logo/Google_Calendar/Google_Calendar-Logo.wine.png"
            alt=""
          />
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
        <div className="side-cal">
          <Calendar/>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="logoName">
            <div className="logoH">
              <img
                src="https://download.logo.wine/logo/Google_Calendar/Google_Calendar-Logo.wine.png"
                alt=""
              />
            </div>
            <h2 style={{ fontSize: "1.5em" }}>Real-Time-Calendar</h2>
          </div>
          <div className="user-info">
            {/* <span>Rahul</span> */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s"
              alt="User Avatar"
            />
          </div>
        </header>

        <section className="calendar-section">
          <div className="calenButton">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="create-event-button"
            >
              <img
                className="plusImg"
                src="https://supporthost.com/wp-content/uploads/2021/11/google-authenticator-add-new-device.png"
                alt=""
              />
              Create Event
            </button>
            <div className="calendar-header">
              <span className="date">
                <h2 style={{ marginRight: "5px" }}>DATE-</h2>
              </span>
              <h2>{currentDate}</h2>
            </div>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <div className="loading-text">Loading...</div>
            </div>
          ) : (
            <table className="events-table">
              <thead>
                <tr>
                  <th>EVENT NAME</th>
                  <th>START TIME</th>
                  <th>END TIME</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.summary}</td>
                    <td>{new Date(event.start.dateTime).toLocaleString()}</td>
                    <td>{new Date(event.end.dateTime).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                value={eventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
                required
              />
              <input
                type="time"
                value={eventStartTime}
                onChange={(e) => setEventStartTime(e.target.value)}
                required
              />
              <input
                type="date"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                required
              />
              <input
                type="time"
                value={eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
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
