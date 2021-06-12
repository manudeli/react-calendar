export interface CalendarCol {
  classes: string;
  date: object;
}

export interface CalendarRows {
  [index: number]: CalendarCol;
}
