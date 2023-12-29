$(document).ready(function() {
let getSearch = getSearchHistory();
let history = $('#searchHistory');
let searchSize = 8;
function previousSearches(){
    for(let i = 0; i <searchSize; i++){
        let parts = getSearch[i].split(',');
        let cityName = parts[2];
        let newDiv = $("<div>").attr('id','cities').addClass('bg-secondary container m-1 p-2 rounded text-center h5').text(cityName);
        history.append(newDiv);
    }
}
function clickHistory(){
    
}
previousSearches();
console.log(getSearch);
});