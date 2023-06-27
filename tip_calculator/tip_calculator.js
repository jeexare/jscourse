document.addEventListener("DOMContentLoaded", () => {
    let billTotalInput = 0.0;
let tipInput = 10;
let peopleAmount = 1;
let perPersonTotal = 0.0;

// Inputs
const billTotalInputHTML = document.getElementById("billTotalInput");
const tipInputHTML = document.getElementById("tipInput");

// Buttons
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");

// Number
const peopleAmountHTML = document.getElementById("people-amount");
const perPersonTotalHTML = document.getElementById("total-per-person");

const calculateBill = () => {
	billTotalInput = billTotalInputHTML.value;
	tipInput = tipInputHTML.value / 100;
	let totalTipAmount = billTotalInput * tipInput;
	let total = totalTipAmount + billTotalInput;
	perPersonTotal = totalTipAmount / peopleAmount;
	perPersonTotalHTML.innerHTML = perPersonTotal.toFixed(2);
};

plusButton.addEventListener("click", () => {
	peopleAmount++;
	peopleAmountHTML.innerHTML = peopleAmount;
	calculateBill();
});

minusButton.addEventListener("click", () => {
	if (peopleAmount == 1) return;
	peopleAmount--;
	peopleAmountHTML.innerHTML = peopleAmount;
	calculateBill();
});

billTotalInputHTML.addEventListener("keyup", () => {
	calculateBill();
});

tipInputHTML.addEventListener("keyup", () => {
	calculateBill();
});
});