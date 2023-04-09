var searchForm = document.querySelector('#searchForm');
var weatherContainer = document.querySelector('#container');
var currentWeather = document.querySelector('#currentWeather');
var button = document.querySelector('.search');
var nameCity = document.querySelector('#cityName');
let today = new Date().toLocaleDateString()

var currentForecast = function (data) {

    var tempEl = document.querySelector('#temperature');
    var humidityEl = document.querySelector('#humidity');
    var windEl = document.querySelector('#wind-speed');
    var cityname = document.querySelector('#city-name');
    


    cityname.textContent = data.city.name + " " + "Today: " + today;
    tempEl.textContent = "Temp: " + data.list[0].main.temp + "°F";
    humidityEl.textContent = "Humidity: " + data.list[0].main.humidity + "%";
    windEl.textContent = "Wind: " + data.list[0].wind.speed + "km/h";
}

var fivedayForecast = function (data) {


    for (var i = 0; i < data.list.length; i = i + 8) {
        console.log(data.list[i])
    }
}

var cityWeather = function () {
    var apiKey = 'c8be904ec04597163b07ca4fa7a4b984';
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + nameCity.value + "&appid=" + apiKey + "&units=metric";


    fetch(apiUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        currentForecast(data);
        fivedayForecast(data);
    })

};


//GET 5 DAY WEATHER


button.addEventListener('click', cityWeather)





// var displayWeather = function (weather, searchCity) {
//     weatherContainer.textContent = "";
//     searchForm.textContent = "searchCity"
// }
// console.log(displayWeather)
