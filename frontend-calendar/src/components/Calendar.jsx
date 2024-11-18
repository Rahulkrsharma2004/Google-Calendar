import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    renderCalendar();
  }, [date]);

  const renderCalendar = () => {
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    let daysArray = [];

    for (let x = firstDayIndex; x > 0; x--) {
      daysArray.push({
        day: prevLastDay - x + 1,
        currentMonth: false
      });
    }

    for (let i = 1; i <= lastDay; i++) {
      daysArray.push({
        day: i,
        currentMonth: true,
        today: i === new Date().getDate() && date.getMonth() === new Date().getMonth()
      });
    }

    for (let j = 1; j <= nextDays; j++) {
      daysArray.push({
        day: j,
        currentMonth: false
      });
    }

    setDays(daysArray);
  };

  const prevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const nextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="calendar">
      {/* <div className="month">
        <div className="prev" onClick={prevMonth}>&#10094;</div>
        <div className="date">
          <h2>{`${months[date.getMonth()]} ${date.getFullYear()}`}</h2>
          <p>{new Date().toDateString()}</p>
        </div>
        <div className="next" onClick={nextMonth}>&#10095;</div>
      </div> */}
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${!day.currentMonth ? 'prev-date' : day.today ? 'today' : ''}`}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
