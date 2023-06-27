document.addEventListener("DOMContentLoaded", () => {
    // Boolean variables
let isPlaying = false;
let hasBlackJack = false;
let isAlive = true;

// Variables
let sum = 0;
let cards = [];
let message = "";
let player = {
	name: "Name",
	chips: 100
};

// HTML constants
const messageHTML = document.querySelector("#message");
const cardsHTML = document.querySelector("#cards");
const sumHTML = document.querySelector("#sum");
const playerHTML = document.querySelector("#player");

// Button constants
const restartButton = document.querySelector("#restart");
const startButton = document.querySelector("#start-button");
const newCardButton = document.querySelector("#newcard-button");

// Setting the newcard button to not allowed
newCardButton.style.cursor = "not-allowed";

updateContent();

// Function to get a random card
function randomCard() {
	let number = Math.floor(Math.random() * (11 - 1) + 2);
	if (number === 1) return 11;
	else if (number === 11 || (number === 12) | (number === 13)) return 10;
	else return number;
}

// Starts the game
function startGame() {
	if (isAlive === true && isPlaying === false) {
		player.chips -= 10;
		let firstCard = randomCard();
		let secondCard = randomCard();
		cards = [firstCard, secondCard];
		sum = firstCard + secondCard;
		startButton.style.cursor = "not-allowed";
		renderGame();
		isPlaying = true;
	}
}

// Functioning of the game
function renderGame() {
	updateContent();

	if (sum < 21) {
		message = "Do you want to grab a new card?";
		newCardButton.style.cursor = "default";
	} else if (sum === 21) {
		message = "You got Blackjack!";
		hasBlackJack = true;
		newCardButton.style.cursor = "not-allowed";
	} else {
		message = "You bursted!";
		isAlive = false;
		newCardButton.style.cursor = "not-allowed";
	}
	messageHTML.textContent = message;
}

// Grabs a new card
function newCard() {
	if (isAlive === true && hasBlackJack === false && isPlaying === true) {
		let thirdCard = randomCard();
		cards.push(thirdCard);
		sum += thirdCard;
		renderGame();
	} else return;
}

// Sets everything to the original values
function restartGame() {
	startButton.style.cursor = "default";
	isPlaying = false;
	isAlive = true;
	hasBlackJack = false;
	cards = [];
	sum = 0;
	updateContent();
}

// Updates the HTML contents
function updateContent() {
	cardsHTML.textContent = "Cards: ";
	for (let i = 0; i < cards.length; i++) {
		cardsHTML.textContent += " " + cards[i];
	}
	sumHTML.textContent = "Sum: " + sum;
	playerHTML.textContent = player.name + " --- $" + player.chips;
}

// Put the functions as onclicks on the buttons
startButton.onclick = startGame;
newCardButton.onclick = newCard;
restartButton.onclick = restartGame;
});