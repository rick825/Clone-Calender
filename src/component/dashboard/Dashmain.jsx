import React, { useContext, useState, useEffect } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { format, setHours, setMinutes } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const Dashmain = () => {
  const { dates, weeklyData, timezone } = useContext(DashboardContext);
  const [checkedTimes, setCheckedTimes] = useState({});


  useEffect(() => {
    const initialCheckedTimes = {};
    weeklyData.forEach(data => {
      const dateStr = format(new Date(data.Date), "yyyy-MM-dd");
      if (!initialCheckedTimes[dateStr]) {
        initialCheckedTimes[dateStr] = new Set();
      }
      initialCheckedTimes[dateStr].add(data.Time);
    });
    setCheckedTimes(initialCheckedTimes);
}, [weeklyData]);


 //get displayed time 
const getDisplayTime = (time) => {
    const [hour, minutes] = time.split(":");
    const formattedHour = hour.padStart(2, '0');
    return `${formattedHour}:${minutes}`;
  };


  //handle checkbox channge
const handleCheckboxChange = (date, time) => {
    setCheckedTimes(prevChecked => {
      const updatedCheckedTimes = { ...prevChecked };
      const dateStr = format(date, 'yyyy-MM-dd');
      if (!updatedCheckedTimes[dateStr]) {
        updatedCheckedTimes[dateStr] = new Set();
      }

      if (updatedCheckedTimes[dateStr].has(time)) {
        updatedCheckedTimes[dateStr].delete(time);
      } else {
        updatedCheckedTimes[dateStr].add(time);
      }

      return updatedCheckedTimes;
    });
  };

  return (
    <div className="dashmain">
      <div className="days-container">
        {dates.map((date) => (
          <div key={date.toString()} className="day-block">
            <div className="day-header">
              <h3>{format(date, "EEE")}</h3>
              <p>{format(date, "MM/dd")}</p>
            </div>
            <div className="time-slots">
              {[...Array(16 * 2).keys()].map((i) => {
                const hours = 8 + Math.floor(i / 2);
                const minutes = i % 2 === 0 ? '00' : '30';
                const time = `${String(hours).padStart(2, '0')}:${minutes}`;
                const dateStr = format(date, "yyyy-MM-dd");
                const isChecked = checkedTimes[dateStr]?.has(time);
                const zonedTime = formatInTimeZone(setMinutes(setHours(date, hours), minutes), timezone, 'HH:mm');

                return (
                  <div key={time} className="time-slot">
                    <label>
                      <input type="checkbox" checked={isChecked || false} onChange={() => handleCheckboxChange(date, time)} value={getDisplayTime(time)}
                      />
                      {zonedTime}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="weekly-data">
        <h3>Weekly Data</h3>
        {weeklyData.map((data) => (
          <div key={data.Id}>
            <p>
              {data.Name} - {format(new Date(data.Date), "MMMM d, yyyy")} - {data.Time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashmain;
