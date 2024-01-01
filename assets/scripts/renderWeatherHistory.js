$(document).ready(function () {
    let getSearch = getSearchHistory();

    let history = $('#searchHistory');
    function previousSearches() {
        for (let i = 0; i < getSearch.length; i++) {
            let parts = getSearch[i].split(',');
            let cityName = parts[2];
            let newDiv = $("<div>").addClass('bg-secondary container m-1 mb-2 p-2 rounded text-center h5 cities').text(cityName);
            history.append(newDiv);
        
        }
    }
    //compares clicked item to saved local storage
    function matchHistory() {
        $('.cities').on('click', function () {
            for (let i = 0; i < getSearch.length; i++) {
                let parts = getSearch[i].split(',');
                if (parts[2] === $(this).text()){
                    getApiGeo(parts[0],parts[1]);
                    
                }
            }
        });
    }
    previousSearches();
    matchHistory();
});
