document.addEventListener("DOMContentLoaded", () => {
    const options = ["rock", "paper", "scissors"]; // list of options to choose from
const optionsImages = ["no-repeat url('https://i.imgur.com/KHLqwto.png')", "no-repeat url('https://i.imgur.com/AGkHOxn.png')", "no-repeat url('https://i.imgur.com/YDZfWwp.png')"]; // list of images to be displayed

const optionButtons = document.querySelectorAll("#option"); // buttons

// HTML constants
const messageHTML = document.querySelector("#message"); // Message that it's being displayed
const botHandHTML = document.getElementById("bothand"); // Image of the bot hand that it's being displayed
const userHandHTML = document.getElementById("userhand"); // Image of the user hand that it's being displayed

// variables
let message = "";

// get a random number between 0 and 3
let randomNumber = () => {
	const randomNumber = Math.floor(Math.random() * 3);
	return randomNumber;
};

// gets the bot hand
let getBotHand = () => {
	let myNumber = randomNumber();
	let botHand = {
		option: myNumber,
		hand: options[myNumber],
		background: optionsImages[myNumber],
	}
	return botHand;
};

// gets the data from the selected button
let addClickHandlers = (elements) => {
	elements.forEach((element) => {
		element.onclick = function () {	
			// Get Hands
			let getUser = {
			option: element.getAttribute("data-name"),
			hand: options[element.getAttribute("data-name")],
			background: optionsImages[element.getAttribute("data-name")],
		}
			let getBot = getBotHand();
			
			// Check result
			if (getUser === getBot) {
				message = "Select again";
			} else if ((getUser.option == 2 && getBot.option == 0) // If the user selects scissors and the bot rock
								 || getUser.option < getBot.option) {        // If the user's option is less than the bot's
				message = "You lose"; } else {
				message = "You win";
			}

			// Display
			messageHTML.textContent = message;
			userHandHTML.style.background = getUser.background;
			botHandHTML.style.background = getBot.background;
		};
	});
};

addClickHandlers(optionButtons);
});