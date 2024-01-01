
function getApi(city, state, country) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "," + state + "," + country + '&appid=f8b3ce2dc2fd8e1b0d8f9ba635463824&units=imperial'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            saveSearchHistory(data.coord.lat, data.coord.lon, data.name);
            showWeather(data);
            showFiveDay(data);
        });
}
//gets api request from lat and lon
function getApiGeo(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=f8b3ce2dc2fd8e1b0d8f9ba635463824&units=imperial'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showWeather(data);
            showFiveDay(data);
            console.log(data);
        });
}


//puts current weather onto page
let today = dayjs().format('MMM D, YYYY');
let currentWeather = $('.currentWeather');
function showWeather(data) {
    currentWeather.empty();
    let currentArea = $('<p>').addClass('fw-bold m-2').text(data.name + ' (' + today + ')');
    let icon = data.weather[0].icon;
    let img = $('<img>');
    img.attr('src', 'https://openweathermap.org/img/w/' + icon + '.png');
    currentArea.append(img);
    let currentTemp = $('<p>').addClass('m-2').text('Temp: ' + data.main.temp + ' °F');
    let currentHumidity = $('<p>').addClass('m-2').text('Wind: ' + data.main.humidity + ' %');
    let currentWind = $('<p>').addClass('m-2').text('Humidity: ' + data.wind.speed + ' MPH');
    currentWeather.append(currentArea);
    currentWeather.append(currentTemp);
    currentWeather.append(currentHumidity);
    currentWeather.append(currentWind);
}
let fiveDay = $('#fiveDay');
function showFiveDay(data){

}

function pressSearched() {
    $('#searchBtn').on("click", function () {
        searchingCity();
    })
}
function searchingCity() {
    let searchValue = $('#searchBar').val();
    //splits string
    let partsOfStr = searchValue.split(',');
    if (searchValue !== "") {
        getApi(partsOfStr[0], partsOfStr[1], partsOfStr[2]);
    }
}

pressSearched();
