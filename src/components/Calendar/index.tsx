import React, { Fragment } from "react";
import { CalendarCol } from "./calendarType";
import useCalendar from "./useCalendar";
import "./Calendar.scss";

const Calendar = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();

  const dateClickHandler = (date: string) => {
    console.log(date);
  };

  return (
    <Fragment>
      <p>
        <button className="button" onClick={getPrevMonth}>
          {`<`}
        </button>
        {`${selectedDate.getFullYear()}년 ${
          monthNames[selectedDate.getMonth()]
        }`}
        <button className="button" onClick={getNextMonth}>
          {`>`}
        </button>
      </p>

      <table className="table">
        <thead>
          <tr>
            {daysShort.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map((cols: CalendarCol[]) => {
            return (
              <tr key={cols[0].date}>
                {cols.map((col: CalendarCol) =>
                  col.date === todayFormatted ? (
                    <td
                      style={{ border: "1px solid red" }}
                      key={col.date}
                      className={`${col.classes} today`}
                      onClick={() => dateClickHandler(col.date)}
                    >
                      {col.value}
                    </td>
                  ) : (
                    <td
                      key={col.date}
                      className={col.classes}
                      onClick={() => dateClickHandler(col.date)}
                    >
                      {col.value}
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Calendar;
