
var today = moment().format('L');
var apiKey = "403d92c0f500944e93ced3dd4c0c88f8";
var searchButton = document.querySelector("#searchButton");
var cityName = document.querySelector("#cityName");
var currentCityDetail = document.querySelector("#currentCityDetail");


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
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat="+ latitude + "&lon=" + longitude + "&appid=" + apiKey;
            
            console.log(uvUrl); //it needs subscription


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



                    // const para = document.createElement("p");
                    // const node = document.createTextNode("UV.");
                    // $("p").append($(`<span id="uvColor"> uvRate </span>`));
                    // para.appendChild(node);

                    // var uvRatePara = ("<p> UV= <span id= uvColor> "uvRate" </span> </p>");

             $("#currentCityDetail").append(uvPara);
             fiveDayForecast(latitude,longitude);

                    if(uvRate >8){
                        $("#uvColor").css("background-color","#DC143C")
                    } else if (uvRate>4 && uvRate < 8){
                        $("#uvColor").css("background-color","#FF7F50")
                    }else {
                        $("#uvColor").css("background-color","#FFF8DC")
                    }
            
                })

        // var enteredCity = $(`<h2 id="enteredCity">
        //         ${data.name} ${today} <img src="${iconPicture}" alt="${data.weather[0].description}" />
        //     </h2>
        //     <p>Temperature: ${data.main.temp} °F</p>
        //     <p>Humidity: ${data.main.humidity}\%</p>
        //     <p>Wind Speed: ${data.wind.speed} MPH</p>
        //     console.log(enteredCity);
        // `);

            // console.log(enteredCity);

        // $("#currentCityDetail").append(enteredCity);


        // ( ".inner" ).append( "<p>Test</p>" );

        }) 
}

function fiveDayForecast(latitude,longitude){

    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+ latitude+ "&lon=" + longitude + "&appid=" + apiKey;
    console.log(fiveDayUrl);

    fetch(fiveDayUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })









    





}









searchButton.addEventListener("click", function(){
    var searchCity = cityName.value;
    weatherDetails(searchCity);
})


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