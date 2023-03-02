import { Notify } from "notiflix";

const form = document.querySelector(".form");

/////////////////////////////////////////////////////
form.querySelector('input[name="delay"]').value = 10;
form.querySelector('input[name="step"]').value = 20;
form.querySelector('input[name="amount"]').value = 5;
/////////////////////////////////////////////////////

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const firstDelay = form.querySelector('input[name="delay"]').value - 0;
	const stepDelay = form.querySelector('input[name="step"]').value - 0;
	const amount = form.querySelector('input[name="amount"]').value - 0;
	let position = 1;
	let delayCnt = firstDelay;
	createPromise(position, firstDelay)
		.then(({ position, delay }) =>
			Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
		)
		.catch(({ position, delay }) =>
			Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
		);

	if (amount > 1) {
		promiseID = setInterval(() => {
			position++;
			createPromise(position, stepDelay)
				.then(({ position, delay }) => {
					delayCnt += delay;
					Notify.success(`✅ Fulfilled promise ${position} in ${delayCnt}ms`);
				})
				.catch(({ position, delay }) => {
					delayCnt += delay;
					Notify.failure(`❌ Rejected promise ${position} in ${delayCnt}ms`);
				});
			if (position === amount) {
				clearInterval(promiseID);
			}
		}, stepDelay);
	}
	form.reset();
});

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const shouldResolve = Math.random() > 0.3;
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
}
