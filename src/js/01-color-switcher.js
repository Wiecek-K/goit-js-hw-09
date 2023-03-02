const body = document.querySelector("body");
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
stopBtn.disabled = true;

startBtn.addEventListener("click", () => {
	const changeBodyColorID = setInterval(
		() => (body.style.backgroundColor = getRandomHexColor()),
		1000,
	);
	startBtn.disabled = true;
	stopBtn.disabled = false;
});
stopBtn.addEventListener("click", () => {
	clearInterval(changeBodyColorID);
	stopBtn.disabled = true;
	startBtn.disabled = false;
});

function changeBodyColor() {
	body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
