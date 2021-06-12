import React, { Fragment, useState } from "react";
import { CalendarCol } from "./calendarType";
import useCalendar from "./useCalendar";
import "./Calendar.scss";

function Calendar() {
  const {
    selectedDate,
    daysShort,
    calendars,
    monthNames,
    getPrevMonth,
    getNextMonth,
  } = useCalendar();

  const [selectedStart, setSelectedStart] = useState<null | Date>(null);
  const [selectedEnd, setSelectedEnd] = useState<null | Date>(null);

  const dateClickHandler = (date: Date) => {
    if (selectedStart && !selectedEnd && !(selectedStart > date))
      setSelectedEnd(date);
    else {
      setSelectedEnd(null);
      setSelectedStart(date);
    }
  };

  console.log(selectedStart, selectedEnd);

  return (
    <Fragment>
      <button className="button" onClick={getPrevMonth}>{`<`}</button>
      {`${selectedDate.getFullYear()}년 ${monthNames[selectedDate.getMonth()]}`}
      <button className="button" onClick={getNextMonth}>{`>`}</button>
      <div className="calendar-table-head">
        {daysShort.map((day) => (
          <span key={day.value}>{day.name}</span>
        ))}
      </div>
      <div className="calendar-table">
        {calendars.map((calendar, index) => (
          <div
            className={`${
              selectedStart &&
              !selectedEnd &&
              calendar.date.getFullYear() === selectedStart?.getFullYear() &&
              calendar.date.getMonth() === selectedStart?.getMonth() &&
              calendar.date.getDate() === selectedStart?.getDate()
                ? "solo selected"
                : ""
            }${
              selectedStart &&
              selectedEnd &&
              selectedStart <= calendar.date &&
              calendar.date <= selectedEnd
                ? " selected"
                : ""
            }${
              calendar.date.getFullYear() === selectedStart?.getFullYear() &&
              calendar.date.getMonth() === selectedStart?.getMonth() &&
              calendar.date.getDate() === selectedStart?.getDate()
                ? " start"
                : ""
            }${
              calendar.date.getFullYear() === selectedEnd?.getFullYear() &&
              calendar.date.getMonth() === selectedEnd?.getMonth() &&
              calendar.date.getDate() === selectedEnd?.getDate()
                ? " end"
                : ""
            }`}
            key={index}
            onClick={() => dateClickHandler(calendar.date)}
          >
            <div>{calendar.date.getDate()}</div>
          </div>
        ))}
      </div>
      {selectedStart
        ? `시작일자: ${selectedStart.getFullYear()}년 ${selectedStart.getMonth()}월 ${selectedStart.getDate()}일`
        : ""}
      <br />
      {selectedEnd
        ? `종료일자: ${selectedEnd.getFullYear()}년 ${selectedEnd.getMonth()}월 ${selectedEnd.getDate()}일`
        : ""}
    </Fragment>
  );
}

export default Calendar;
