import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const dayTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-second]');
// buttonStart.disabled = true;

buttonStart.addEventListener('click', convertMs);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
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
intervalId = setInterval(() => {
  const date = new Date(e.target.value);
  clearInterval(intervalId);
  if (date.getTime() > Date.now()) {
    alert('Виберіть коректну дату народження!');
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(ms);
  dayTimer.textContent = days[value];
  console.log(dayTimer);
}, 1000);
// function addLeadingZero(value); {
// padStart(2, '0')
// }
