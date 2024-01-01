function fiveDayForcast(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=f8b3ce2dc2fd8e1b0d8f9ba635463824&units=imperial';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            renderFiveDays(data);
        });
}

function renderFiveDays(data) {
    let fiveDays = $('#fiveDay');
    fiveDays.empty();
    for(let i = 0; i < data.list.length; i++){
        //gets every 24 hours as info.
        if(i == 7 || i == 15 || i==23 || i== 31|| i==39) {
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let date = new Date(data.list[i].dt * 1000)
            let formattedTime = months[date.getMonth()]  + "/" + date.getDate() + "/" + date.getFullYear();
            let futureDate = $('<p>').addClass('bg-info-subtle fw-bold p-2 border border-dark-subtle').text(formattedTime);
            
            let icon = data.list[i].weather[0].icon
            let img = $('<img>');
            img.attr('src', 'https://openweathermap.org/img/w/' + icon + '.png');

            let currentTemp = $('<p>').addClass('m-2').text('Temp: ' + data.list[i].main.temp + ' °F');
            let currentHumidity = $('<p>').addClass('m-2').text('Wind: ' + data.list[i].wind.speed + ' MPH');
            let currentWind = $('<p>').addClass('m-2').text('Humidity: ' + data.list[i].main.humidity + ' %');
            futureDate.append(img);
            futureDate.append(currentTemp);
            futureDate.append(currentHumidity);
            futureDate.append(currentWind);
            fiveDays.append(futureDate);
            //fiveDays.append(currentTemp);
            // fiveDays.append(currentHumidity);
            // fiveDays.append(currentWind);
            

        }
    }
}