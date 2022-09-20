import Notiflix from 'notiflix';

// находим инпуты и кнопку отправка.
const delayEL = document.querySelector('[name="delay"]');
const stepEL = document.querySelector('[name="step"]');
const amountEL = document.querySelector('[name="amount"]');
const btnEL = document.querySelector('[type="submit"]');
const formEL = document.querySelector('.form');

// создаёв функцию promis.
function getPromise(position, delayEL) {
  // создаём новый промис с условиями (resolve, reject).и с записываемой задержкой инпут).
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delayEL });
      } else {
        reject({ position, delayEL });
      }
    }, delayEL);
  });
}

formEL.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const { amount, step, delay } = event.target.elements;
  let amountValue = Number(amount.value);
  let stepValue = Number(step.value);
  let delayValue = Number(delay.value);
  for (let index = 0; index < amountValue; index += 1) {
    getPromise(index, delayValue)
      .then(({ position, delayEL }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delayEL}ms`
        );
      })
      .catch(({ position, delayEL }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += stepValue;
  }
}
