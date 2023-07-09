document.addEventListener("DOMContentLoaded", function(event) {
/*********************
       CONSTANTS
*********************/
const contentInput = document.getElementById("contentInput");
const abbInput = document.getElementById("abbInput");
const addButton = document.getElementById("addButton");
const snippetsList = document.getElementById("snippetsList");

let expansions = {
	hw: "hello world",
	omw: "on my way",
    "=today": new Date().toLocaleDateString(),
    "=time": (function() {
        var today = new Date();
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      })()
};

/********************************
	          TABS
*********************************/
document.addEventListener("click", (e) => {
	const menuButton = e.target.closest(".tabbutton");
	if (!menuButton) return; // If it's null/empty return

	const menuName = menuButton.getAttribute("data-tab");
	if (!menuName) return; // If it's null/empty return

	const menu = document.querySelector(`.tab[data-tab="${menuName}"]`);
	if (!menu) return; // If it's null/empty return

	const activeButton = document.querySelector(
		`.tabbutton[data-tab="${menuName}"]`
	);
	if (!activeButton) return; // If it's null/empty return

	document
		.querySelectorAll(".tab")
		.forEach((menu) => menu.classList.remove("active"));

	menu.classList.add("active");

	document
		.querySelectorAll(".tabbutton")
		.forEach((activeButton) => activeButton.classList.remove("active"));

	activeButton.classList.add("active");
});

/*********************
     NEW SNIPPET
*********************/
function addNewSnippet(newContent, abbreviation) {
	if (abbreviation.startsWith("=")) {
          const evaluatedContent = eval(newContent);
          expansions[abbreviation] = evaluatedContent;
      } else {
        expansions[abbreviation] = newContent;
      }
      displaySnippets();
}

function deleteSnippet(abbreviation) {
	delete expansions[abbreviation];
	displaySnippets();
}

function displaySnippets() {
	snippetsList.innerHTML = "";

	for (let abbreviation in expansions) {
		const expandedText = expansions[abbreviation];
		const snippetContainer = document.createElement("div");

		// Create the snippet content element
		const snippetContent = document.createElement("div");
		snippetContent.textContent = `${abbreviation} - ${expandedText}`;

		// Create the delete button element
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "x";
		deleteButton.addEventListener("click", () => {
			deleteSnippet(abbreviation);
		});

		// Append snippet content and delete button to snippet container
		snippetContainer.appendChild(snippetContent);
		snippetContainer.appendChild(deleteButton);

		snippetsList.appendChild(snippetContainer);
	}
}

addButton.addEventListener("click", () => {
	const newContent = contentInput.value;
	const newAbb = abbInput.value;

	if (newContent && newAbb) {
		addNewSnippet(newContent, newAbb);
		contentInput.value = "";
		abbInput.value = "";
	}
});



/********************************
	  Handles the full expansion.
*********************************/
function handleTextExpansion(event, key) {
	const input = event.target; // Input
	const text = input.value; // Text
	const words = text.split(" "); // Arr
	const cursor = input.selectionStart; // Current position of the cursor
	let abbreviation = ""; // Abbreviation

	for (let i = words.length - 1; i >= 0; i--) {
		const word = words[i];
		abbreviation = word;
		break;
	}

	if (expansions.hasOwnProperty(abbreviation) && key === "space")
		expandText(abbreviation, input, text, cursor);
}

/********************************
	 Handles input and key pressed.
*********************************/
const inputFields = document.querySelectorAll("input[type='text'], textarea");
inputFields.forEach((field) => {
    field.addEventListener("input", function (event) {
        const key = findKey(event);
        handleTextExpansion(event, key);
    });

    field.addEventListener("keydown", function (event) {
        const key = findKey(event);
        handleTextExpansion(event, key);
    });
});

/********************************
	     Gets key pressed.
*********************************/
function findKey(event) {
	if (event.keyCode == 13 && event.ctrlKey) {
		return "space";
	}
}

/********************************
	 Handles the text expansion.
*********************************/
function expandText(abbreviation, input, text, cursor) {
	const expandedText = expansions[abbreviation];
	const expandedTextLength = expandedText.length;

	// Replace only the abbreviation with the expanded text
	const newText =
		text.substring(0, cursor - abbreviation.length) +
		expandedText +
		text.substring(cursor);

	input.value = newText;
}

/********************
 * DOM
 */

document.getElementById("onbutton").click();
displaySnippets();

});