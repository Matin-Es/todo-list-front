import React from "react";
import { StyledDiv } from "./calendar.style";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const zeroFill = (n) => {
  return ("0" + n).slice(-2);
};
const interval = setInterval(() => {
  const d = new Date();
  let day = weekday[d.getDay()];
  let time = zeroFill(d.getHours()) + ":" + zeroFill(d.getMinutes());
  let date = d.getDate();
  let month = monthNames[d.getMonth()];
  document.getElementById("time").innerHTML = time;
  document.getElementById("day").innerHTML = day;
  document.getElementById("date").innerHTML = date;
  document.getElementById("month").innerHTML = month;
}, 1000);

const Calendar = () => {
  return (
    <StyledDiv>
      <StyledDiv id="time"></StyledDiv>
      <StyledDiv id="day"></StyledDiv>
      <StyledDiv display="flex">
        <div style={{ marginRight: "10px" }} id="date"></div>
        <div id="month"></div>
      </StyledDiv>
    </StyledDiv>
  );
};

export default Calendar;
