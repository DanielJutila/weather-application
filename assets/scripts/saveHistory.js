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