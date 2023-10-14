import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function DatePicker({ currDate, setCurrDate }) {
    const [dateVal, setDateVal] = useState("");

    useEffect(() => {
        setDateVal(currDate.toLocaleString("sv").replace(" ", "T").slice(0, -9))
      }, [currDate]);

  const changeDate = (day) => {
    let newDate = new Date(currDate);
    newDate.setDate(newDate.getDate() + day);
    setCurrDate(newDate);
  };

  const handleChange = (e) => {
    setDateVal(e.target.value)
    let newDate = new Date(e.target.value)
    newDate.setTime(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
    setCurrDate(newDate);

  }
  return (
    <div className="row mb-3 text-center">
      <div className="col">
        <button className="btn btn-secondary" onClick={() => changeDate(-1)}>
          <ChevronLeftIcon />
        </button>
      </div>
      <div className="col">
        <input type="date" value={dateVal} onChange={handleChange}/>
      </div>
      <div className="col">
        <button className="btn btn-secondary" onClick={() => changeDate(1)}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
export default DatePicker;
