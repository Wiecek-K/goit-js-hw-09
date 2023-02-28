import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const myInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");
startButton.disabled = true;
const secDisp = document.querySelector("span[data-seconds]");
const minsDisp = document.querySelector("span[data-minutes]");
const hoursDisp = document.querySelector("span[data-hours]");
const daysDisp = document.querySelector("span[data-days]");

document.querySelectorAll(".label").forEach((e) => {
	e.textContent = e.textContent.toUpperCase();
});

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const systemDate = new Date();
		if (systemDate.getTime() > selectedDates[0].getTime()) {
			Notify.failure("Please choose a date in the future");
		} else {
			let timeLeft = selectedDates[0].getTime() - systemDate.getTime();
			timerID = setInterval(() => {
				timeLeft -= 1000;
				if (timeLeft <= 0) {
					timeLeft = 0;
					clearInterval(timerID);
				}
				updateDisp(convertMs(timeLeft));
			}, 1000);
		}
	},
	onValueUpdate(selectedDates) {
		const systemDate = new Date();
		if (systemDate.getTime() < selectedDates[0].getTime()) {
			startButton.disabled = false;
		}
	},
};
const fp = flatpickr(myInput, options);

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

function updateDisp({ days, hours, minutes, seconds }) {
	secDisp.textContent = addLeadingZero(seconds.toString());
	minsDisp.textContent = addLeadingZero(minutes.toString());
	hoursDisp.textContent = addLeadingZero(hours.toString());
	daysDisp.textContent = addLeadingZero(days.toString());
}
function addLeadingZero(value) {
	return value.padStart(2, "0");
}
