document.addEventListener("DOMContentLoaded", function(event) {
/*********************
       CONSTANTS
*********************/
const contentInput = document.getElementById("contentInput");
const abbInput = document.getElementById("abbInput");
const addButton = document.getElementById("addButton");
const snippetsList = document.getElementById("snippetsList");

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
	chrome.storage.sync.get('expansions', function (data) {
	  const expansions = data.expansions || {};
	  expansions[abbreviation] = newContent;
	  
	  chrome.storage.sync.set({ expansions: expansions }, function () {
		displaySnippets();
	  });
	});
  }
  
  function deleteSnippet(abbreviation) {
	chrome.storage.sync.get('expansions', function (data) {
	  const expansions = data.expansions || {};
	  delete expansions[abbreviation];
  
	  chrome.storage.sync.set({ expansions: expansions }, function () {
		displaySnippets();
	  });
	});
  }
  

  function displaySnippets() {
	chrome.storage.sync.get('expansions', function (data) {
	  const expansions = data.expansions || {};
  
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
	});
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


/********************
 * DOM
 */

document.getElementById("onbutton").click();
displaySnippets();
});