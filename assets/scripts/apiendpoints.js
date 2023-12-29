
 function getApi(city, state, country) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "," + state + "," + country + '&appid=f8b3ce2dc2fd8e1b0d8f9ba635463824&units=imperial'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            saveSearchHistory(data.city.coord.lat, data.city.coord.lon, data.city.name);
            showWeather(data);
        });
}
//gets api request from lat and lon
function getApiGeo(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=f8b3ce2dc2fd8e1b0d8f9ba635463824&units=imperial'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showWeather(data);
            console.log(data);
        });
}


//puts current weather onto page
let today = dayjs().format('MMM D, YYYY');
let currentWeather = $('.currentWeather');
function showWeather(data){
    currentWeather.empty();
    let currentArea = $('<p>').addClass('fw-bold m-2').text(data.city.name + ' (' + today + ')');
    let icon = data.list[0].weather[0].icon;
    let img = $('<img>');
    img.attr('src', 'https://openweathermap.org/img/w/'+icon+'.png');
    currentArea.append(img);
    let currentTemp = $('<p>').addClass('m-2').text('Temp: ' + data.list[0].main.temp + ' °F');
    let currentHumidity = $('<p>').addClass('m-2').text('Wind: ' + data.list[0].main.humidity + ' %');
    let currentWind = $('<p>').addClass('m-2').text('Humidity: ' + data.list[0].wind.speed + ' MPH');
    currentWeather.append(currentArea);
    currentWeather.append(currentTemp);
    currentWeather.append(currentHumidity);
    currentWeather.append(currentWind);
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

//saves search history
function saveSearchHistory(lat, lon, name) {
    let searchHistory = getSearchHistory();
    if (lat !== null || lat !== "" || lon !== null || lon !== "") {
        let coords = lat + "," + lon + "," + name;
        let index = searchHistory.indexOf(coords);
        //removes from list if coords are already present
        if (index !== -1) {
            searchHistory.splice(index, 1);
        }
        searchHistory.unshift(coords);
        searchHistory = searchHistory.slice(0, 7);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    }
}
//gets search history
function getSearchHistory() {
    let searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
}
pressSearched();
