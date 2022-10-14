
var today = moment().format('LLL');
var apiKey = "403d92c0f500944e93ced3dd4c0c88f8";
var searchButton = document.querySelector("#searchButton");
var cityName = document.querySelector("#cityName");


function weatherDetails(cityName){
    var webUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(webUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })

        $("#currentWeather").removeClass("hidden");
        // $("p").removeClass("intro");
        $("currentCityDetail").empty();

        var icon = data.weather[0].icon;
        console.log(icon);


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