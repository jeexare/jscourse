document.addEventListener("DOMContentLoaded", () => {
let output = "0";
let display = "0";
let cleared = true;
const previousOutput = document.querySelector("[data-previous]");
const currentOutput = document.querySelector("[data-current]");

currentOutput.textContent = display;
previousOutput.textContent = output;

const toggleButton = document.querySelector("[data-toggle]");
const percentButton = document.querySelector("[data-percent]");

const decimalButton = document.querySelector("[data-decimal]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");

const digitButtons = document.querySelectorAll("[data-digit]");
const operationButtons = document.querySelectorAll("[data-operation]");

clearButton.addEventListener("click", (event) => {
	display = "0";
	output = "0";
	cleared = true;
	currentOutput.textContent = display;
});

for (const digitButton of digitButtons) {
	digitButton.addEventListener("click", (event) => {
		if (cleared === true) display = digitButton.textContent;
		else display += digitButton.textContent;
		currentOutput.textContent = display;
		previousOutput.textContent = output;
		cleared = false;
	});
}

for (const operationButton of operationButtons) {
	operationButton.addEventListener("click", (event) => {
		if (display === "0") return;
		else display += operationButton.textContent;
		currentOutput.textContent = display;
		previousOutput.textContent = output;
		cleared = false;
	});
}

decimalButton.addEventListener("click", (event) => {
	if (currentOutput.textContent.indexOf(".") > 0) return;
	else display += ".";
	currentOutput.textContent = display;
	previousOutput.textContent = output;
});

function calculate(str) {
	return Function(`'use strict'; return (${str})`)();
}

equalsButton.addEventListener("click", (event) => {
	previousOutput.textContent = output;
	display = calculate(display);
	output = display;
	currentOutput.textContent = display;
	cleared = true;
});

toggleButton.addEventListener("click", (event) => {
	display = Number(display) * -1;
	currentOutput.textContent = display;
	previousOutput.textContent = output;
});

percentButton.addEventListener("click", (event) => {
	if (display === "0") return;
	else display = Number(display) / 100;
	currentOutput.textContent = display;
	previousOutput.textContent = output;
	cleared = false;
});

});