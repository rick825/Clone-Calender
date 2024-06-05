import React, { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { format } from 'date-fns';

const Dashtop = () => {
  const { handlePrevWeek, handleNextWeek, startDate } = useContext(DashboardContext);

  return (
    <div className="dashtop">
      <div className="btn">
        <button onClick={handlePrevWeek} aria-label="Previous Week">← Previous Week</button>
      </div>
      <h2>{format(startDate, 'MMMM d, yyyy')}</h2>
      <div className="btn">
        <button onClick={handleNextWeek} aria-label="Next Week">Next Week →</button>
      </div>
    </div>
  );
};

export default Dashtop;
