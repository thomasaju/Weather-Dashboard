
var cityEl = document.querySelector("#cityName");
var todaysWeather = document.querySelector("#todaysWeather");
var searchButton = document.querySelector("#searchButton");
var today = moment().format('L');
var apiKey = "403d92c0f500944e93ced3dd4c0c88f8";


function weatherDetails(cityName){
    var webUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(webUrl)
        .then(function (response){
            todaysWeather.classList.remove("hidden");
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })





}

searchButton.addEventListener("click", function(){
    var searchCity = cityEl.value;
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