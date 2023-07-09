function handleTextExpansion(event, key) {
	const input = event.target;
	const text = input.value;
  
	const words = text.split(" ");
	const cursor = input.selectionStart;
	let abbreviation = "";
  
	for (let i = words.length - 1; i >= 0; i--) {
	  const word = words[i];
	  abbreviation = word;
	  break;
	}
  
	chrome.storage.local.get('expansions', function (data) {
	  const expansions = data.expansions || {};
  
	  if (expansions.hasOwnProperty(abbreviation) && key === "space") {
		const expansionValue = expansions[abbreviation];
		let expandedText = "";
		if (abbreviation.startsWith("=")) {
			 expandedText = eval(expansionValue);
		} else {expandedText = expansionValue; }

		const expandedTextLength = expandedText.length;
  
		const newText =
		  text.substring(0, cursor - abbreviation.length) +
		  expandedText +
		  text.substring(cursor);
  
		input.value = newText;
	  }
	});
  }
  
  chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (namespace === 'local' && changes.expansions) {
	  const newExpansions = changes.expansions.newValue || {};
	  expansions = newExpansions;
	}
  });
  
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
  
  function findKey(event) {
	if (event.keyCode == 32 && event.ctrlKey) {
	  return "space";
	}
  }
  