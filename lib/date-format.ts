export default function dateFormat(date: Date) {
  const MONTH_LIST = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const dateObj = new Date(date);

  // HH:mm MON Date ,YYYY
  return `${dateObj.getHours() + 1}:${dateObj.getMinutes()} ${
    MONTH_LIST[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}
