import { useState } from 'react';

const daysShortArr = [
  { name: '일', value: 0 },
  { name: '월', value: 1 },
  { name: '화', value: 2 },
  { name: '수', value: 3 },
  { name: '목', value: 4 },
  { name: '금', value: 5 },
  { name: '토', value: 6 },
];

const monthNamesArr = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const rows = 6;
const cols = 7;
const today = new Date();

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const [selectedDate, setSelectedDate] = useState(today);

  const firstDayInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  let startingPoint = daysShortArr.filter(d => d.value === firstDayInMonth)[0]
    .value;

  console.log(startingPoint);

  const prevMonthLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0
  );

  const selectedMonthLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  const daysInMonth = selectedMonthLastDate.getDate();

  const calendars = [];
  let prevMonthStartingPoint = prevMonthLastDate.getDate() - startingPoint + 1;
  let month = selectedDate.getMonth();
  let year = selectedDate.getFullYear();

  for (let i = 0; i < rows * cols; i++) {
    // 지난 달 마지막일 넣기
    if (i < startingPoint) {
      calendars.push({
        classes: 'prev-month',
        date: new Date(
          month === 0 ? year - 1 : year,
          month === 0 ? 12 - 1 : month - 1,
          prevMonthStartingPoint
        ),
      });
      prevMonthStartingPoint++;
    } else if (i < daysInMonth + startingPoint) {
      calendars.push({
        classes: '',
        date: new Date(
          month === 0 ? year - 1 : year,
          month === 0 ? 12 : month,
          i - startingPoint + 1
        ),
      });
    } else {
      calendars.push({
        classes: 'next-month',
        date: new Date(
          month === 0 ? year - 1 : year,
          month === 0 ? 12 : month,
          i - startingPoint + 1
        ),
      });
    }
  }

  console.log(calendars);

  const getPrevMonth = (): void => {
    setSelectedDate(
      prevValue =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1)
    );
  };

  const getNextMonth = (): void => {
    setSelectedDate(
      prevValue =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1)
    );
  };

  return {
    selectedDate,
    daysShort,
    monthNames,
    getPrevMonth,
    getNextMonth,
    calendars,
  };
};

export default useCalendar;
