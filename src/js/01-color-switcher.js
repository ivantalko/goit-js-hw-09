function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onStart);

let timerId = null;
function onStart() {
  timerId = setInterval(() => {
    const bodyColor = getRandomHexColor();
    body.style.background = bodyColor;
  }, 1000);
  btnStart.disabled = true;
}
btnStop.addEventListener('click', onStop);
function onStop() {
  clearInterval(timerId);
  btnStart.disabled = false;
}
