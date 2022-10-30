
var today = moment().format('L');
var apiKey = "47f166773e351368285402b79068ea73";
var searchButton = document.querySelector("#searchButton");
var cityName = document.querySelector("#cityName");
var currentCityDetail = document.querySelector("#currentCityDetail");
var searchList = [];



function weatherDetails(cityName){
    var webUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";




    fetch(webUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);

        $("#currentWeather").removeClass("hidden");
        // $("p").removeClass("intro");
        $("currentCityDetail").empty();

        var iconId = data.weather[0].icon;
        console.log(iconId);
        var iconPicture = "http://openweathermap.org/img/wn/"+ iconId + "@2x.png"

        // $("#currentWeather").append(iconPicture);
             var name = data.name;
             var description = data.weather[0].description;
             var temp = data.main.temp;
             var wind = data.wind.speed;
             var humidity = data.main.humidity;
             console.log(description);
             console.log(name); 

             var enteredCity = $(`<h2 id="currentCity">
             ${name} ${today} <img src="${iconPicture}" alt="" />
         </h2>
         <p>Temperature: ${temp} Degree Celcius</p>
         <p>Humidity: ${humidity}\%</p>
         <p>Wind Speed: ${wind} miles per hour</p>
     `);
            

            $("#currentCityDetail").removeClass("hidden");
            $("#currentCityDetail").append(enteredCity);

            // for UltraViolet Index
            // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}-- needs subscription
            

            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            console.log(latitude);
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat="+ latitude + "&lon=" + longitude + "&appid=" + apiKey;
            
            console.log(uvUrl); //it needs subscription

            var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

            // console.log(forecastUrl);


            fetch(uvUrl)
                .then(function (response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                    var uvRate = data.value;
                    console.log(uvRate);

                    var uvPara = $(`
                    <p>UV Index: 
                        <span id="uvColor">${uvRate}</span>
                    </p>
                `);




             $("#currentCityDetail").append(uvPara);
            //  fiveDayForecast(latitude,longitude);

                    if(uvRate >8){
                        $("#uvColor").css("background-color","#DC143C")
                    } else if (uvRate>4 && uvRate < 8){
                        $("#uvColor").css("background-color","#FF7F50")
                    }else {
                        $("#uvColor").css("background-color","#FFF8DC")
                    }
            
                })


    var inputCity = document.getElementById('cityName').value;
    console.log(inputCity);
     var newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

    console.log(newUrl);
    
    fetch(newUrl)
   .then(function (fuResponse){
       return fuResponse.json();
   })
   .then(function(fuResponse){
       console.log(fuResponse);
       $("#forecast").empty();

       

       for (var i = 1; i < 6; i++) {
        var weatherInfo = {
            date: fuResponse.daily[i].dt,
            icon: fuResponse.daily[i].weather[0].icon,
            temp: fuResponse.daily[i].temp.day,
            humidity: fuResponse.daily[i].humidity
        };

    var currDate = moment.unix(weatherInfo.date).format("MM/DD/YYYY");
    var iconURL = `<img src="https://openweathermap.org/img/w/${weatherInfo.icon}.png" alt="${fuResponse.daily[i].weather[0].main}" />`;


    var paraCard = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${weatherInfo.temp} °C</p>
                            <p>Humidity: ${weatherInfo.humidity}\%</p>
                        </div>
                    </div>
                <div>
            `);


    $("#forecast").append(paraCard);


    }


    });










        }) 
}


  















    //    for (let i = 1; i < 6; i++) {
    //     var cityInfo = {
    //         date: response.daily[i].dt,
    //         icon: response.daily[i].weather[0].icon,
    //         temp: response.daily[i].temp.day,
    //         humidity: response.daily[i].humidity
    //     };
    //     var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
    //     var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

    //     var futureCard = $(`
    //     <div class="pl-3">
    //         <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
    //             <div class="card-body">
    //                 <h5>${currDate}</h5>
    //                 <p>${iconURL}</p>
    //                 <p>Temp: ${cityInfo.temp} °F</p>
    //                 <p>Humidity: ${cityInfo.humidity}\%</p>
    //             </div>
    //         </div>
    //     <div>
    // `);

    // $("#forecast").append(futureCard);

    
   
   


$("#searchButton").on("click", function(event){
    event.preventDefault();
    var searchCity = cityName.value;
    weatherDetails(searchCity);

if(!searchList.includes(searchCity)){
    searchList.push(searchCity);
    var cityList = $(`
    <li class="list">${searchCity}</li>
    `);
    $("#history").append(cityList);
}

localStorage.setItem("name", JSON.stringify(searchList));
console.log(searchList);


});

$(document).on("click", ".list", function(){
    var currCity = $(this).text();
    weatherDetails(currCity);
})


$(document).ready(function(){
    var searchListArray = JSON.parse(localStorage.getItem("name"));
    
    if (searchListArray !== null) {
       var lastIndex = searchListArray.length - 1;
       var lastCity = searchListArray[lastIndex];
       weatherDetails(lastCity);
    }



})



// searchButton.addEventListener("click", function(){
//     var searchCity = cityName.value;
//     weatherDetails(searchCity);

    
// })









// fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//       //Loop over the data to generate a table, each table row will have a link to the repo url
//       for (var i = 0; i < data.length; i++) {
//         // Creating elements, tablerow, tabledata, and anchor
//         var createTableRow = document.createElement('tr');
//         var tableData = document.createElement('td');
//         var link = document.createElement('a');

//         // Setting the text of link and the href of the link
//         link.textContent = data[i].html_url;
//         link.href = data[i].html_url;

//         // Appending the link to the tabledata and then appending the tabledata to the tablerow
//         // The tablerow then gets appended to the tablebody
//         tableData.appendChild(link);
//         createTableRow.appendChild(tableData);
//         tableBody.appendChild(createTableRow);
//       }
//     });






// {
//     "coord": {
//         "lon": 138.6,
//         "lat": -34.9333
//     },
//     "weather": [
//         {
//             "id": 802,
//             "main": "Clouds",
//             "description": "scattered clouds",
//             "icon": "03d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 286.09,
//         "feels_like": 285.48,
//         "temp_min": 284.3,
//         "temp_max": 287.22,
//         "pressure": 1020,
//         "humidity": 78
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 1.79,
//         "deg": 7,
//         "gust": 4.02
//     },
//     "clouds": {
//         "all": 39
//     },
//     "dt": 1665784028,
//     "sys": {
//         "type": 2,
//         "id": 2001763,
//         "country": "AU",
//         "sunrise": 1665777820,
//         "sunset": 1665824339
//     },
//     "timezone": 37800,
//     "id": 2078025,
//     "name": "Adelaide",
//     "cod": 200
// }






// {
//     "cod": "200",
//     "message": 0,
//     "cnt": 40,
//     "list": [
//         {
//             "dt": 1665878400,
//             "main": {
//                 "temp": 289.86,
//                 "feels_like": 289.21,
//                 "temp_min": 288.99,
//                 "temp_max": 289.86,
//                 "pressure": 1022,
//                 "sea_level": 1022,
//                 "grnd_level": 1017,
//                 "humidity": 62,
//                 "temp_kf": 0.87
//             },
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "clouds": {
//                 "all": 20
//             },
//             "wind": {
//                 "speed": 0.99,
//                 "deg": 206,
//                 "gust": 1.93
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-16 00:00:00"
//         },
//         {
//             "dt": 1665889200,
//             "main": {
//                 "temp": 290.06,
//                 "feels_like": 289.35,
//                 "temp_min": 290.06,
//                 "temp_max": 290.45,
//                 "pressure": 1022,
//                 "sea_level": 1022,
//                 "grnd_level": 1016,
//                 "humidity": 59,
//                 "temp_kf": -0.39
//             },
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "clouds": {
//                 "all": 14
//             },
//             "wind": {
//                 "speed": 3.22,
//                 "deg": 245,
//                 "gust": 2.4
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-16 03:00:00"
//         },
//         {
//             "dt": 1665900000,
//             "main": {
//                 "temp": 289.8,
//                 "feels_like": 289.11,
//                 "temp_min": 289.77,
//                 "temp_max": 289.8,
//                 "pressure": 1021,
//                 "sea_level": 1021,
//                 "grnd_level": 1015,
//                 "humidity": 61,
//                 "temp_kf": 0.03
//             },
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "clouds": {
//                 "all": 19
//             },
//             "wind": {
//                 "speed": 4.09,
//                 "deg": 207,
//                 "gust": 4.72
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-16 06:00:00"
//         },
//         {
//             "dt": 1665910800,
//             "main": {
//                 "temp": 287.43,
//                 "feels_like": 286.66,
//                 "temp_min": 287.43,
//                 "temp_max": 287.43,
//                 "pressure": 1022,
//                 "sea_level": 1022,
//                 "grnd_level": 1016,
//                 "humidity": 67,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "clouds": {
//                 "all": 5
//             },
//             "wind": {
//                 "speed": 4.35,
//                 "deg": 142,
//                 "gust": 7.86
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-16 09:00:00"
//         },
//         {
//             "dt": 1665921600,
//             "main": {
//                 "temp": 284.76,
//                 "feels_like": 284.09,
//                 "temp_min": 284.76,
//                 "temp_max": 284.76,
//                 "pressure": 1024,
//                 "sea_level": 1024,
//                 "grnd_level": 1018,
//                 "humidity": 81,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "clouds": {
//                 "all": 3
//             },
//             "wind": {
//                 "speed": 3.62,
//                 "deg": 125,
//                 "gust": 8.23
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-16 12:00:00"
//         },
//         {
//             "dt": 1665932400,
//             "main": {
//                 "temp": 283.87,
//                 "feels_like": 283.19,
//                 "temp_min": 283.87,
//                 "temp_max": 283.87,
//                 "pressure": 1022,
//                 "sea_level": 1022,
//                 "grnd_level": 1016,
//                 "humidity": 84,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03n"
//                 }
//             ],
//             "clouds": {
//                 "all": 33
//             },
//             "wind": {
//                 "speed": 2.61,
//                 "deg": 89,
//                 "gust": 5.82
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-16 15:00:00"
//         },
//         {
//             "dt": 1665943200,
//             "main": {
//                 "temp": 283.33,
//                 "feels_like": 282.54,
//                 "temp_min": 283.33,
//                 "temp_max": 283.33,
//                 "pressure": 1021,
//                 "sea_level": 1021,
//                 "grnd_level": 1015,
//                 "humidity": 82,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03n"
//                 }
//             ],
//             "clouds": {
//                 "all": 45
//             },
//             "wind": {
//                 "speed": 2.08,
//                 "deg": 98,
//                 "gust": 4.05
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-16 18:00:00"
//         },
//         {
//             "dt": 1665954000,
//             "main": {
//                 "temp": 284.28,
//                 "feels_like": 283.54,
//                 "temp_min": 284.28,
//                 "temp_max": 284.28,
//                 "pressure": 1021,
//                 "sea_level": 1021,
//                 "grnd_level": 1015,
//                 "humidity": 80,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "clouds": {
//                 "all": 24
//             },
//             "wind": {
//                 "speed": 2.44,
//                 "deg": 89,
//                 "gust": 6.41
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-16 21:00:00"
//         },
//         {
//             "dt": 1665964800,
//             "main": {
//                 "temp": 291.38,
//                 "feels_like": 290.67,
//                 "temp_min": 291.38,
//                 "temp_max": 291.38,
//                 "pressure": 1020,
//                 "sea_level": 1020,
//                 "grnd_level": 1014,
//                 "humidity": 54,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03d"
//                 }
//             ],
//             "clouds": {
//                 "all": 31
//             },
//             "wind": {
//                 "speed": 2.87,
//                 "deg": 46,
//                 "gust": 4.7
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-17 00:00:00"
//         },
//         {
//             "dt": 1665975600,
//             "main": {
//                 "temp": 294.13,
//                 "feels_like": 293.51,
//                 "temp_min": 294.13,
//                 "temp_max": 294.13,
//                 "pressure": 1017,
//                 "sea_level": 1017,
//                 "grnd_level": 1011,
//                 "humidity": 47,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03d"
//                 }
//             ],
//             "clouds": {
//                 "all": 43
//             },
//             "wind": {
//                 "speed": 1.99,
//                 "deg": 44,
//                 "gust": 3.73
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-17 03:00:00"
//         },
//         {
//             "dt": 1665986400,
//             "main": {
//                 "temp": 294.37,
//                 "feels_like": 293.77,
//                 "temp_min": 294.37,
//                 "temp_max": 294.37,
//                 "pressure": 1015,
//                 "sea_level": 1015,
//                 "grnd_level": 1009,
//                 "humidity": 47,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 803,
//                     "main": "Clouds",
//                     "description": "broken clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 70
//             },
//             "wind": {
//                 "speed": 2.37,
//                 "deg": 43,
//                 "gust": 4.17
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-17 06:00:00"
//         },
//         {
//             "dt": 1665997200,
//             "main": {
//                 "temp": 291.39,
//                 "feels_like": 290.78,
//                 "temp_min": 291.39,
//                 "temp_max": 291.39,
//                 "pressure": 1015,
//                 "sea_level": 1015,
//                 "grnd_level": 1009,
//                 "humidity": 58,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 3.13,
//                 "deg": 99,
//                 "gust": 5.17
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-17 09:00:00"
//         },
//         {
//             "dt": 1666008000,
//             "main": {
//                 "temp": 291.33,
//                 "feels_like": 290.56,
//                 "temp_min": 291.33,
//                 "temp_max": 291.33,
//                 "pressure": 1015,
//                 "sea_level": 1015,
//                 "grnd_level": 1009,
//                 "humidity": 52,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 99
//             },
//             "wind": {
//                 "speed": 5.18,
//                 "deg": 79,
//                 "gust": 12.25
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-17 12:00:00"
//         },
//         {
//             "dt": 1666018800,
//             "main": {
//                 "temp": 291.19,
//                 "feels_like": 290.33,
//                 "temp_min": 291.19,
//                 "temp_max": 291.19,
//                 "pressure": 1014,
//                 "sea_level": 1014,
//                 "grnd_level": 1008,
//                 "humidity": 49,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 6.28,
//                 "deg": 60,
//                 "gust": 13.47
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-17 15:00:00"
//         },
//         {
//             "dt": 1666029600,
//             "main": {
//                 "temp": 291.04,
//                 "feels_like": 290.06,
//                 "temp_min": 291.04,
//                 "temp_max": 291.04,
//                 "pressure": 1012,
//                 "sea_level": 1012,
//                 "grnd_level": 1006,
//                 "humidity": 45,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 6.66,
//                 "deg": 61,
//                 "gust": 14.09
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-17 18:00:00"
//         },
//         {
//             "dt": 1666040400,
//             "main": {
//                 "temp": 290.55,
//                 "feels_like": 289.6,
//                 "temp_min": 290.55,
//                 "temp_max": 290.55,
//                 "pressure": 1013,
//                 "sea_level": 1013,
//                 "grnd_level": 1007,
//                 "humidity": 48,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 6.47,
//                 "deg": 56,
//                 "gust": 13.82
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-17 21:00:00"
//         },
//         {
//             "dt": 1666051200,
//             "main": {
//                 "temp": 289.42,
//                 "feels_like": 288.72,
//                 "temp_min": 289.42,
//                 "temp_max": 289.42,
//                 "pressure": 1015,
//                 "sea_level": 1015,
//                 "grnd_level": 1009,
//                 "humidity": 62,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 6.27,
//                 "deg": 47,
//                 "gust": 13.9
//             },
//             "visibility": 10000,
//             "pop": 0.22,
//             "rain": {
//                 "3h": 0.24
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-18 00:00:00"
//         },
//         {
//             "dt": 1666062000,
//             "main": {
//                 "temp": 289.56,
//                 "feels_like": 288.98,
//                 "temp_min": 289.56,
//                 "temp_max": 289.56,
//                 "pressure": 1014,
//                 "sea_level": 1014,
//                 "grnd_level": 1008,
//                 "humidity": 66,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 6.4,
//                 "deg": 39,
//                 "gust": 13.01
//             },
//             "visibility": 10000,
//             "pop": 0.38,
//             "rain": {
//                 "3h": 0.27
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-18 03:00:00"
//         },
//         {
//             "dt": 1666072800,
//             "main": {
//                 "temp": 289.57,
//                 "feels_like": 289.15,
//                 "temp_min": 289.57,
//                 "temp_max": 289.57,
//                 "pressure": 1013,
//                 "sea_level": 1013,
//                 "grnd_level": 1007,
//                 "humidity": 72,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 3.71,
//                 "deg": 49,
//                 "gust": 10
//             },
//             "visibility": 10000,
//             "pop": 0.44,
//             "rain": {
//                 "3h": 0.5
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-18 06:00:00"
//         },
//         {
//             "dt": 1666083600,
//             "main": {
//                 "temp": 289.83,
//                 "feels_like": 289.28,
//                 "temp_min": 289.83,
//                 "temp_max": 289.83,
//                 "pressure": 1011,
//                 "sea_level": 1011,
//                 "grnd_level": 1005,
//                 "humidity": 66,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 2.66,
//                 "deg": 78,
//                 "gust": 7.67
//             },
//             "visibility": 10000,
//             "pop": 0.03,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-18 09:00:00"
//         },
//         {
//             "dt": 1666094400,
//             "main": {
//                 "temp": 289.22,
//                 "feels_like": 288.58,
//                 "temp_min": 289.22,
//                 "temp_max": 289.22,
//                 "pressure": 1014,
//                 "sea_level": 1014,
//                 "grnd_level": 1008,
//                 "humidity": 65,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 2.51,
//                 "deg": 93,
//                 "gust": 6.56
//             },
//             "visibility": 10000,
//             "pop": 0.01,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-18 12:00:00"
//         },
//         {
//             "dt": 1666105200,
//             "main": {
//                 "temp": 287.98,
//                 "feels_like": 287.42,
//                 "temp_min": 287.98,
//                 "temp_max": 287.98,
//                 "pressure": 1014,
//                 "sea_level": 1014,
//                 "grnd_level": 1007,
//                 "humidity": 73,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 1.77,
//                 "deg": 127,
//                 "gust": 5.72
//             },
//             "visibility": 10000,
//             "pop": 0.18,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-18 15:00:00"
//         },
//         {
//             "dt": 1666116000,
//             "main": {
//                 "temp": 288.9,
//                 "feels_like": 288.23,
//                 "temp_min": 288.9,
//                 "temp_max": 288.9,
//                 "pressure": 1013,
//                 "sea_level": 1013,
//                 "grnd_level": 1007,
//                 "humidity": 65,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 1.99,
//                 "deg": 100,
//                 "gust": 6.86
//             },
//             "visibility": 10000,
//             "pop": 0.32,
//             "rain": {
//                 "3h": 0.13
//             },
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-18 18:00:00"
//         },
//         {
//             "dt": 1666126800,
//             "main": {
//                 "temp": 287.07,
//                 "feels_like": 286.74,
//                 "temp_min": 287.07,
//                 "temp_max": 287.07,
//                 "pressure": 1014,
//                 "sea_level": 1014,
//                 "grnd_level": 1008,
//                 "humidity": 85,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 2.91,
//                 "deg": 101,
//                 "gust": 9.3
//             },
//             "visibility": 10000,
//             "pop": 0.74,
//             "rain": {
//                 "3h": 1.69
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-18 21:00:00"
//         },
//         {
//             "dt": 1666137600,
//             "main": {
//                 "temp": 287.62,
//                 "feels_like": 287.45,
//                 "temp_min": 287.62,
//                 "temp_max": 287.62,
//                 "pressure": 1014,
//                 "sea_level": 1014,
//                 "grnd_level": 1008,
//                 "humidity": 89,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 3.54,
//                 "deg": 122,
//                 "gust": 10.57
//             },
//             "visibility": 10000,
//             "pop": 0.77,
//             "rain": {
//                 "3h": 1.78
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-19 00:00:00"
//         },
//         {
//             "dt": 1666148400,
//             "main": {
//                 "temp": 288.31,
//                 "feels_like": 288.05,
//                 "temp_min": 288.31,
//                 "temp_max": 288.31,
//                 "pressure": 1013,
//                 "sea_level": 1013,
//                 "grnd_level": 1007,
//                 "humidity": 83,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 2.48,
//                 "deg": 142,
//                 "gust": 7.24
//             },
//             "visibility": 10000,
//             "pop": 0.51,
//             "rain": {
//                 "3h": 0.47
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-19 03:00:00"
//         },
//         {
//             "dt": 1666159200,
//             "main": {
//                 "temp": 288.87,
//                 "feels_like": 288.77,
//                 "temp_min": 288.87,
//                 "temp_max": 288.87,
//                 "pressure": 1011,
//                 "sea_level": 1011,
//                 "grnd_level": 1005,
//                 "humidity": 87,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 4.45,
//                 "deg": 135,
//                 "gust": 10.82
//             },
//             "visibility": 10000,
//             "pop": 0.65,
//             "rain": {
//                 "3h": 0.68
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-19 06:00:00"
//         },
//         {
//             "dt": 1666170000,
//             "main": {
//                 "temp": 289.01,
//                 "feels_like": 288.77,
//                 "temp_min": 289.01,
//                 "temp_max": 289.01,
//                 "pressure": 1012,
//                 "sea_level": 1012,
//                 "grnd_level": 1006,
//                 "humidity": 81,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 2.93,
//                 "deg": 144,
//                 "gust": 7.99
//             },
//             "visibility": 10000,
//             "pop": 0.01,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-19 09:00:00"
//         },
//         {
//             "dt": 1666180800,
//             "main": {
//                 "temp": 289.05,
//                 "feels_like": 288.86,
//                 "temp_min": 289.05,
//                 "temp_max": 289.05,
//                 "pressure": 1013,
//                 "sea_level": 1013,
//                 "grnd_level": 1007,
//                 "humidity": 83,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 3.28,
//                 "deg": 154,
//                 "gust": 7.98
//             },
//             "visibility": 10000,
//             "pop": 0.02,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-19 12:00:00"
//         },
//         {
//             "dt": 1666191600,
//             "main": {
//                 "temp": 288.77,
//                 "feels_like": 288.76,
//                 "temp_min": 288.77,
//                 "temp_max": 288.77,
//                 "pressure": 1011,
//                 "sea_level": 1011,
//                 "grnd_level": 1005,
//                 "humidity": 91,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 3.88,
//                 "deg": 162,
//                 "gust": 9.47
//             },
//             "visibility": 10000,
//             "pop": 0.88,
//             "rain": {
//                 "3h": 0.61
//             },
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-19 15:00:00"
//         },
//         {
//             "dt": 1666202400,
//             "main": {
//                 "temp": 288.54,
//                 "feels_like": 288.51,
//                 "temp_min": 288.54,
//                 "temp_max": 288.54,
//                 "pressure": 1009,
//                 "sea_level": 1009,
//                 "grnd_level": 1003,
//                 "humidity": 91,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 4.21,
//                 "deg": 164,
//                 "gust": 9.9
//             },
//             "visibility": 10000,
//             "pop": 0.9,
//             "rain": {
//                 "3h": 0.41
//             },
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-19 18:00:00"
//         },
//         {
//             "dt": 1666213200,
//             "main": {
//                 "temp": 288.04,
//                 "feels_like": 287.96,
//                 "temp_min": 288.04,
//                 "temp_max": 288.04,
//                 "pressure": 1010,
//                 "sea_level": 1010,
//                 "grnd_level": 1003,
//                 "humidity": 91,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 4.74,
//                 "deg": 150,
//                 "gust": 11.51
//             },
//             "visibility": 10000,
//             "pop": 0.34,
//             "rain": {
//                 "3h": 0.2
//             },
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-19 21:00:00"
//         },
//         {
//             "dt": 1666224000,
//             "main": {
//                 "temp": 288.24,
//                 "feels_like": 288.13,
//                 "temp_min": 288.24,
//                 "temp_max": 288.24,
//                 "pressure": 1010,
//                 "sea_level": 1010,
//                 "grnd_level": 1004,
//                 "humidity": 89,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 4.06,
//                 "deg": 164,
//                 "gust": 9.77
//             },
//             "visibility": 10000,
//             "pop": 0.29,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-20 00:00:00"
//         },
//         {
//             "dt": 1666234800,
//             "main": {
//                 "temp": 290.26,
//                 "feels_like": 290.06,
//                 "temp_min": 290.26,
//                 "temp_max": 290.26,
//                 "pressure": 1008,
//                 "sea_level": 1008,
//                 "grnd_level": 1002,
//                 "humidity": 78,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 95
//             },
//             "wind": {
//                 "speed": 4.65,
//                 "deg": 189,
//                 "gust": 6.52
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-20 03:00:00"
//         },
//         {
//             "dt": 1666245600,
//             "main": {
//                 "temp": 290.23,
//                 "feels_like": 290.03,
//                 "temp_min": 290.23,
//                 "temp_max": 290.23,
//                 "pressure": 1007,
//                 "sea_level": 1007,
//                 "grnd_level": 1001,
//                 "humidity": 78,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 95
//             },
//             "wind": {
//                 "speed": 4.13,
//                 "deg": 198,
//                 "gust": 5.06
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-20 06:00:00"
//         },
//         {
//             "dt": 1666256400,
//             "main": {
//                 "temp": 288.25,
//                 "feels_like": 288.06,
//                 "temp_min": 288.25,
//                 "temp_max": 288.25,
//                 "pressure": 1008,
//                 "sea_level": 1008,
//                 "grnd_level": 1002,
//                 "humidity": 86,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 93
//             },
//             "wind": {
//                 "speed": 4.57,
//                 "deg": 212,
//                 "gust": 5.81
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-20 09:00:00"
//         },
//         {
//             "dt": 1666267200,
//             "main": {
//                 "temp": 287.49,
//                 "feels_like": 287.36,
//                 "temp_min": 287.49,
//                 "temp_max": 287.49,
//                 "pressure": 1009,
//                 "sea_level": 1009,
//                 "grnd_level": 1003,
//                 "humidity": 91,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 94
//             },
//             "wind": {
//                 "speed": 3.96,
//                 "deg": 209,
//                 "gust": 7
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-20 12:00:00"
//         },
//         {
//             "dt": 1666278000,
//             "main": {
//                 "temp": 287.41,
//                 "feels_like": 287.32,
//                 "temp_min": 287.41,
//                 "temp_max": 287.41,
//                 "pressure": 1008,
//                 "sea_level": 1008,
//                 "grnd_level": 1002,
//                 "humidity": 93,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 3.9,
//                 "deg": 225,
//                 "gust": 6.59
//             },
//             "visibility": 10000,
//             "pop": 0.2,
//             "rain": {
//                 "3h": 0.11
//             },
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-20 15:00:00"
//         },
//         {
//             "dt": 1666288800,
//             "main": {
//                 "temp": 287.33,
//                 "feels_like": 287.23,
//                 "temp_min": 287.33,
//                 "temp_max": 287.33,
//                 "pressure": 1008,
//                 "sea_level": 1008,
//                 "grnd_level": 1002,
//                 "humidity": 93,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04n"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 4.32,
//                 "deg": 217,
//                 "gust": 7.57
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "n"
//             },
//             "dt_txt": "2022-10-20 18:00:00"
//         },
//         {
//             "dt": 1666299600,
//             "main": {
//                 "temp": 287.37,
//                 "feels_like": 287.25,
//                 "temp_min": 287.37,
//                 "temp_max": 287.37,
//                 "pressure": 1009,
//                 "sea_level": 1009,
//                 "grnd_level": 1003,
//                 "humidity": 92,
//                 "temp_kf": 0
//             },
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": {
//                 "all": 100
//             },
//             "wind": {
//                 "speed": 4.06,
//                 "deg": 220,
//                 "gust": 7.43
//             },
//             "visibility": 10000,
//             "pop": 0,
//             "sys": {
//                 "pod": "d"
//             },
//             "dt_txt": "2022-10-20 21:00:00"
//         }
//     ],
//     "city": {
//         "id": 2078025,
//         "name": "Adelaide",
//         "coord": {
//             "lat": -34.9333,
//             "lon": 138.6
//         },
//         "country": "AU",
//         "population": 1074159,
//         "timezone": 37800,
//         "sunrise": 1665864143,
//         "sunset": 1665910790
//     }
// }