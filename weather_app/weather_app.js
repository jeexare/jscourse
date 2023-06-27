document.addEventListener("DOMContentLoaded", () => {
    /********** 
               API Key
**********/

const apiKey = "8f8b886071b27a712bcd3725233fae1e";

/********** 
               Constants
**********/

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchCity = document.getElementById("searchCity");
const searchCountry = document.getElementById("searchCountry");
const searchWeather = document.getElementById("searchWeather");
const searchTemp = document.getElementById("searchTemp");
const searchMin = document.getElementById("searchMin");
const searchMax = document.getElementById("searchMax");
const searchUnit = document.getElementById("searchUnit");

/********** 
               Fetch
**********/
function getMyWeather(myCity) {
	let myUnit = searchUnit.value;

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&units=${myUnit}&appid=${apiKey}`;
	console.log(url);

	fetch(url)
		.then((response) => response.json())
		.then((response) => {
			const weatherData = {
				location: response.name,
				condition: response.weather[0].main,
				temp: response.main.temp,
				min: response.main.temp_min,
				max: response.main.temp_max,
				feels: response.main.feels_like,
				country: response.sys.country
			};

			searchCity.innerHTML = weatherData.location;
			searchCountry.innerHTML = weatherData.country;
			searchWeather.innerHTML = weatherData.condition;
			searchTemp.innerHTML = weatherData.temp;
			searchFeels.innerHTML = weatherData.feels;
			searchMin.innerHTML = weatherData.min;
			searchMax.innerHTML = weatherData.max;

			console.log(response);
		})
		.catch((err) => console.log(err));
}

/********** 
               Button
**********/
searchButton.addEventListener("click", () => {
	let cityName = searchInput.value;
	getMyWeather(cityName);
});

/********** 
               Initial Value
**********/
getMyWeather("Salt Lake City");
});