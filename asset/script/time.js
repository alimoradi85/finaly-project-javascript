// Hour Numbers
const clock = document.querySelector(".clock");
const radius = 150; // radius of the clock in px
const numberRadius = radius - 30; // distance of numbers from center

for (let i = 1; i <= 12; i++) {
  const angle = ((i - 3) * (Math.PI * 2)) / 12;
  const x = radius + numberRadius * Math.cos(angle);
  const y = radius + numberRadius * Math.sin(angle);

  const number = document.createElement("div");
  number.className = "number";
  number.style.left = `${x}px`;
  number.style.top = `${y}px`;
  number.textContent = i;
  clock.appendChild(number);
}
const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");

function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDegrees = (seconds / 60) * 360;
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // initial call

// Digital Hour
const digitalSecond = document.querySelector(".digital-second");
const digitalMinute = document.querySelector(".digital-minute");
const digitalHour = document.querySelector(".digital-hour");
const antePost = document.querySelector(".ante-post");
const digitalClock = () => {
  const now = new Date();

  let seconds = now.getSeconds();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  hours = hours <= 9 ? `0${hours}` : hours;
  minutes = minutes <= 9 ? `0${minutes}` : minutes;
  seconds = seconds <= 9 ? `0${seconds}` : seconds;

  antePost.innerText = hours > 12 ? "PM" : "AM";
  digitalHour.innerText = `${hours}:`;
  digitalMinute.innerText = `${minutes}:`;
  digitalSecond.innerText = `${seconds}`;
};
setInterval(digitalClock, 1000);
digitalClock();
