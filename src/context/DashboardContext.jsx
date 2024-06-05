import React, { createContext, useState, useEffect } from "react";
import { addWeeks, subWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import axios from 'axios';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [timezone, setTimezone] = useState("IST");
  const [startDate, setStartDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    loadWeeklyData();
  }, [startDate, timezone]);

  const loadWeeklyData = async () => {
    try {
      const start = startOfWeek(startDate, { weekStartsOn: 1 });
      const end = endOfWeek(startDate, { weekStartsOn: 1 });
      const days = eachDayOfInterval({ start, end });
      setDates(days);

      const response = await axios.get('/weeklyData.json'); 
      setWeeklyData(response.data);
    } catch (error) {
      console.error("Error loading weekly data:", error);
    }
  };

  const handlePrevWeek = () => {
    setStartDate(subWeeks(startDate, 1));
  };

  const handleNextWeek = () => {
    setStartDate(addWeeks(startDate, 1));
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  return (
    <DashboardContext.Provider
      value={{
        timezone,
        startDate,
        dates,
        weeklyData,
        handlePrevWeek,
        handleNextWeek,
        handleTimezoneChange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
