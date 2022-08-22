import data from "./data.js";

const newDate = document.querySelector(".date p");
const macroEl = document.querySelector("#macro");

const date = new Date();
let selectedDate = new Date();
let orderType = 3;
let orderShipping = 10;
let orderTime = 0;

function addBusinessDays(d, n) {
  d = new Date(d.getTime());
  let day = d.getDay();
  d.setDate(
    d.getDate() +
      n +
      (day === 6 ? 2 : +!day) +
      Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2
  );
  return d.toDateString();
}

////////////////////////////testtttttttttttttttttttttttttttt/////////////////////////////
const showDeliveryDate = (day) => {
  selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
  const deliveryDate = addBusinessDays(
    selectedDate,
    orderShipping + orderTime + orderType
  );
  newDate.textContent = deliveryDate;
  const macro = `By summing up the order placement date of <b>${selectedDate.toDateString()}${
    orderTime === 0 ? "" : " after 3 PM"
  }</b> with the production timeframe mentioned on each artwork's page of<b> up to ${orderType} business days </b>for<b> ${
    orderType === 3 ? "retail" : "custom"
  } </b>orders and <b>the shipping time of ${orderShipping} business days</b> for <b>${
    orderShipping === 10
      ? "standard"
      : orderShipping === 2
      ? "expedited"
      : "express"
  } method </b>your order<b> should be delivered by ${deliveryDate} at the latest</b>.`;
  macroEl.innerHTML = macro;

  navigator.clipboard.writeText(
    macro.replaceAll("<b>", "").replaceAll("</b>", "")
  );
};

const renderCalendar = () => {
  date.setDate(1);
  const month = date.getMonth();
  const firstDayIndex = date.getDay();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octomber",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[month];
  // document.querySelector('.date p').innerHTML = new Date().toDateString()

  const monthDays = document.querySelector(".days");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 7 - lastDayIndex - 1;
  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date"> ${prevLastDay - x + 1} </div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      days += `<div class="day today"> ${i} </div>`;
    } else {
      days += `<div class="day"> ${i} </div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date"> ${j} </div>`;
  }

  monthDays.innerHTML = days;

  const allDays = document.querySelectorAll("div.day");
  console.log(allDays);
  allDays.forEach((day) => {
    day.addEventListener("click", () => showDeliveryDate(day.textContent));
  });
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
showDeliveryDate(selectedDate.getDate());

const typeOfOrder = document.querySelectorAll('input[name="type"]');
const typeOfShipping = document.querySelectorAll('input[name="shipping"]');
const placementTime = document.querySelectorAll('input[name="time"]');

typeOfOrder.forEach((item) => {
  item.addEventListener("click", () => {
    orderType = data[item.id];

    showDeliveryDate(selectedDate.getDate());
    renderCalendar();
  });
});

typeOfShipping.forEach((item) => {
  item.addEventListener("click", () => {
    orderShipping = data[item.id];

    showDeliveryDate(selectedDate.getDate());
    renderCalendar();
  });
});

placementTime.forEach((item) => {
  item.addEventListener("click", () => {
    orderTime = data[item.id];
    showDeliveryDate(selectedDate.getDate());
    renderCalendar();
  });
});
