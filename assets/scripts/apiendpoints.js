
 function getApi(city, state, country) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "," + state + "," + country + '&appid=f8b3ce2dc2fd8e1b0d8f9ba635463824'
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
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=f8b3ce2dc2fd8e1b0d8f9ba635463824'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showWeather(data);
        });
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
