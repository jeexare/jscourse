document.addEventListener("DOMContentLoaded", () => {
    const catImage = document.getElementById("catImage");
const catButton = document.getElementById("newImage");

function fetchMyCat() {
	fetch("https://api.thecatapi.com/v1/images/search")
		.then((response) => response.json())
		.then((json) => {
			let myCat = json[0].url;
			catImage.innerHTML = `<img src="${myCat}" alt="" width="300px" height:"300px">`;
		});
}

fetchMyCat();
catButton.addEventListener("click", fetchMyCat);
});