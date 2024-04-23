// new Date().toDateString() +
// " at " +
// new Date().getHours() +
// ":" +
// new Date().getMinutes(),

const month = () => {
  const m = new Date().getMonth() + 1;
  switch (m) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
};

const date = new Date().getDate();
const year = new Date().getFullYear();
const hour = () => {
  const h = new Date().getHours();
  if (h > 12) {
    return h - 12;
  } else if (h === 0) {
    return 12;
  } else {
    return h;
  }
};
const minute = new Date().getMinutes();

const ampm = () => {
  const h = new Date().getHours();
  if (h > 11) {
    return "PM";
  } else {
    return "AM";
  }
};

const formattedDate = `${month()} ${date}, ${year} at ${hour()}:${minute} ${ampm()}`;

module.exports = formattedDate;
