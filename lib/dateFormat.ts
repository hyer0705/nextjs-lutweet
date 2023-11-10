export default function dateFormat(date: Date) {
  console.log("===== dateFormat ");
  console.log(date, typeof date);
  const dateObj = new Date(date);
  console.log(
    dateObj.getDate(),
    dateObj.getMonth(),
    dateObj.getFullYear(),
    dateObj.getHours(),
    dateObj.getMinutes()
  );

  return null;
}
