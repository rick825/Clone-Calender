import React, { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";

const Dashbot = () => {
  const { handleTimezoneChange } = useContext(DashboardContext);

  return (
    <div className="dashbot">
      <h5>Timezone</h5>
      <div className="timezone">
        <select name="timezone" id="timezone_select" onChange={handleTimezoneChange}>
         <option value="IST">IST (India Standard Time)</option>
         <option value="UTC">UTC</option>
        </select>
      </div>
    </div>
  );
};

export default Dashbot;
