import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');
buttonStart.disabled = true;

let selectedDay = new Date();

window.addEventListener('load', pageReload);

function pageReload() {}

buttonStart.addEventListener('click', onBtnClick);

function onBtnClick(event) {
  intervalId = setInterval(() => {
    const msResult = selectedDay.getTime() - Date.now();
    const timer = convertMs(msResult);
    const { days, hours, minutes, seconds } = timer;
    if (msResult < 1000 || pageReload()) {
      clearInterval(intervalId);
    }
    //Выведение таймера
    daysTimer.textContent = `${days}`;
    hoursTimer.textContent = `${hours}`;
    minutesTimer.textContent = `${minutes}`;
    secondsTimer.textContent = `${seconds}`;
  }, 1000);
}
input.addEventListener('change', onInputClick);
function onInputClick(event) {
  const selectedTime = new Date(event.target.value);
  if (selectedTime.getTime() < Date.now()) {
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  buttonStart.removeAttribute('disabled');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDay = selectedDates[0];
    console.log(selectedDates[0]);
  },
};
flatpickr(input, options);
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
// intervalId = setInterval(() => {
//   const date = new Date(e.target.value);
//   clearInterval(intervalId);
//   if (date.getTime() > Date.now()) {
//     alert('Виберіть коректну дату народження!');
//     return;
//   }
//   const { days, hours, minutes, seconds } = convertMs(ms);
//   dayTimer.textContent = days;
//   console.log(dayTimer);
// }, 1000);
// function addLeadingZero(value); {
// padStart(2, '0')
// }
