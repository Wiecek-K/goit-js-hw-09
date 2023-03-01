import { Notify } from "notiflix";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const firstDelay = form.querySelector('input[name="delay"]').value;
	const stepDelay = form.querySelector('input[name="step"]').value;
	const amount = form.querySelector('input[name="amount"]').value;
	console.log(stepDelay, amount);

	form.reset();
});

function createPromise(position, delay) {
	const shouldResolve = Math.random() > 0.3;
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
	promise.then(({ position, delay }) => {
		console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
	});
	promise.catch(({ position, delay }) => {
		console.log(`❌ Rejected promise ${position} in ${delay}ms`);
	});
}
createPromise(2, 100);
