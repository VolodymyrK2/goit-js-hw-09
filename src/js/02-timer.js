import flatpickr from "flatpickr";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import "flatpickr/dist/flatpickr.min.css";
const startBtnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days');
const hoursEl = document.querySelector('span[data-hours');
const minsEl = document.querySelector('span[data-minutes');
const secsEl = document.querySelector('span[data-seconds');
let targetTime = 0; 
let isActive = false;
startBtnEl.setAttribute('disabled', '');
startBtnEl.addEventListener('click', start);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (isActive) {
      return;
    }
    targetTime = new Date(selectedDates[0]).getTime();
    if (targetTime < Date.now()) {
      Report.failure("Please choose a date in the future");
    } else {
      startBtnEl.removeAttribute('disabled');
    }
  },
};
const fp = flatpickr("#datetime-picker", options);

function start() {
  fp.destroy();
  if (isActive) {
    return;
  }
  isActive = true;
  startBtnEl.setAttribute('disabled', '');
  
  const intervalId = setInterval(() => {
    let distance = targetTime - Date.now();
    if (distance < 0) {
      clearInterval(intervalId);
      isActive = false;
      return;
    }
    updateClockFace(convertMs(distance));
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function updateClockFace({ days, hours, minutes, seconds }) {
  // console.log(seconds);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minsEl.textContent = addLeadingZero(minutes);
  secsEl.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}