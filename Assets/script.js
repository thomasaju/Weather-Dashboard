
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
        $("#currentCityDetail").empty();

        var iconId = data.weather[0].icon;
        console.log(iconId);
        var iconPicture = "http://openweathermap.org/img/w/"+ iconId + ".png"

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
                   <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12em;>
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
    <li class="list-group-item">${searchCity}</li>
    `);
    $("#history").append(cityList);
}

localStorage.setItem("name", JSON.stringify(searchList));
console.log(searchList);


});

//search history
$(document).on("click", ".list-group-item", function(){
    var currCity = $(this).text();
    weatherDetails(currCity);
})


//last searched city
$(document).ready(function(){
    var searchListArray = JSON.parse(localStorage.getItem("name"));
    
    if (searchListArray !== null) {
       var lastIndex = searchListArray.length - 1;
       var lastCity = searchListArray[lastIndex];
       weatherDetails(lastCity);
    }



});

