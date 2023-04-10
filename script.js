var searchForm = document.querySelector('#searchForm');
var weatherContainer = document.querySelector('#container');
var currentWeather = document.querySelector('#currentWeather');
var button = document.querySelector('.search');
var nameCity = document.querySelector('#cityName');
let today = new Date().toLocaleDateString();
var searchList = document.getElementById('cityId');
let cities = JSON.parse(localStorage.getItem("search")) || [];
const fiveDay = document.querySelector(".tile")


// display today weather

var currentForecast = function (data) {

    var tempEl = document.querySelector('#temperature');
    var humidityEl = document.querySelector('#humidity');
    var windEl = document.querySelector('#wind-speed');
    var cityname = document.querySelector('#city-name');
    console.log(data)



    cityname.textContent = data.city.name + " " + "Today: " + today;
    tempEl.textContent = "Temp: " + data.list[0].main.temp + "°F";
    humidityEl.textContent = "Humidity: " + data.list[0].main.humidity + "%";
    windEl.textContent = "Wind: " + data.list[0].wind.speed + "km/h";
}

var fivedayForecast = function (data) {
    fiveDay.innerHTML = ""

    for (var i = 7; i < data.list.length; i = i + 8) {
        const forecast = data.list[i];

        fiveDay.insertAdjacentHTML("beforeend", `
        <div class="tile is-parent">
            <article class="tile is-child box">
                <p id ="date" id="day1">${forecast.dt_txt}</p>
                <p id="temperature">Temp: ${forecast.main.temp} °F </p>
                <p id="wind">Wind: ${forecast.wind.speed} km/h </p>
                <p id="humidity">Humidity: ${forecast.main.humidity} % </p>
            </article>
        </div>`)
   }
}

// display searched cities history
const renderCityList = (cities) => {
    searchList.innerHTML = "";
    cities.map((city) => searchList.insertAdjacentHTML("afterbegin", `<li class="searchedCities">${city}</li>`))
}


// api fetch
const cityWeather = async function (city) {
    var apiKey = 'c8be904ec04597163b07ca4fa7a4b984';
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";


    const data = await fetch(apiUrl).then(function (response) {
        return response.json()
    })
    // console.log(data.list[0].city.name)
    currentForecast(data);
    fivedayForecast(data);



};

//save to local storage
button.addEventListener("click", function () {
    const searchHistory = nameCity.value.toUpperCase();
    cityWeather(searchHistory)
    if (cities.includes(searchHistory)) {

    } else {
        cities = [...cities, searchHistory];
        localStorage.setItem("search", JSON.stringify(cities));

    }
    renderCityList(cities);

})
renderCityList(cities);