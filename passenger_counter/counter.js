document.addEventListener("DOMContentLoaded", () => {
    let count = 0;
let countHTML = document.getElementById("count");
let renderHTML = document.getElementById("render");
let incrementButton = document.getElementById("increment");
let saveButton = document.getElementById("save");
let resetButton = document.getElementById("reset");

function increment() {
	count += 1;
	countHTML.textContent = count;
}

function save() {
	let countStr = count + " - ";
	renderHTML.textContent += countStr;
	count = 0;
	countHTML.textContent = count;
}

function reset() {
	count = 0;
	countHTML.textContent = count;
}

incrementButton.onclick = increment;
saveButton.onclick = save;
resetButton.onclick = reset;
});

