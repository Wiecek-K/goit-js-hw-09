import { Notify } from "notiflix";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const firstDelay = form.querySelector('input[name="delay"]').value;
	const stepDelay = form.querySelector('input[name="step"]').value;
	const amount = form.querySelector('input[name="amount"]').value;
	console.log(stepDelay, amount);
	let position = 1;
	createPromise(firstDelay, position)
		.then((user) => console.log(user))
		.catch((error) => console.error(error))
		.finally(() => {
			position++;
			createPromise(stepDelay, position);

			position++;
			if (position < amount) {
				// createPromise(stepDelay, position);
			} else {
				return;
			}
		});
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

	// const promise = new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		if (shouldResolve) {
	// 			resolve({ position, delay });
	// 		} else {
	// 			reject({ position, delay });
	// 		}
	// 	}, delay);
	// });
	// promise.then(({ position, delay }) => {
	// 	console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
	// });
	// promise.catch(({ position, delay }) => {
	// 	console.log(`❌ Rejected promise ${position} in ${delay}ms`);
	// });
	// promise.finally(() => {});
}
