document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("input[type='file']");
const textarea = document.querySelector("textarea");

input.addEventListener("change", () => {
	let files = input.files;
	if (files.length === 0) return;
	const file = files[0];
	const extension = file.type;
	console.log(extension);

	let reader = new FileReader();

	// If the file is a csv
	if (extension === "text/csv") {
		reader.onload = (e) => {
			const file = e.target.result;
			const lines = file.split(/\r\n|\n/).map(function (line) {
				return line.split(",");
			});
			textarea.value = lines.join("\n");
		};

		reader.onerror = (e) => alert(e.target.error.name);

		reader.readAsText(file);
	}

	// If the file is a txt
	if (extension === "text/plain") {
		reader.onload = (e) => {
			const file = e.target.result;
			const lines = file.split(/\r\n|\n/);
			textarea.value = lines.join("\n");
		};

		reader.onerror = (e) => alert(e.target.error.name);

		reader.readAsText(file);
	}

	// If the file is an image
	if (extension === "image/png" || extension === "image/jpg") {
		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;
			document.body.appendChild(img);
		};

		reader.onerror = (e) => alert(e.target.error.name);

		reader.readAsDataURL(file);
	}
});

});