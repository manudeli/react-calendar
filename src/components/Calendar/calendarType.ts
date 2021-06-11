export interface CalendarCol {
  classes: string;
  date: string;
  value: number;
}

export interface CalendarRows {
  [index: number]: CalendarCol[];
}
