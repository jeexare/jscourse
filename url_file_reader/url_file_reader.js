document.addEventListener("DOMContentLoaded", () =>  {
    const textarea = document.querySelector("textarea");
const myInput = document.getElementById("myInput");
const readButton = document.getElementById("readButton");

function readFile (url) {
fetch(url)
	.then((res) => res.blob())
	.then((blob) => {
		var blobReader = new FileReader();
		blobReader.onload = (e) => {
			const file = blobReader.result;
			const lines = file.split(/\r\n|\n/).map(function (line) {
				return line.split(",");
			});
			console.log(lines);
			textarea.value = lines.join("\n");
		};

		blobReader.readAsText(blob);
	});
}

/********** 
               Button
**********/
readButton.addEventListener("click", () => {
	let url = myInput.value;
	readFile(url);
});

// https://dl.dropbox.com/s/23kmi5lonek8lxw/my_data.csv
});