//Global Variables
const searchButton = document.querySelector(".searchBtn");
const searchedCitiesContainer = document.querySelector(".searchedCitiesContainer");
const currentCardContainer = document.querySelector(".currentCardContainer");
const cardContainer = document.querySelector(".cardContainer");

//API INFORMATION
// For symbol=
// list.weather.icon


//Functions

//function to observe search click behavior
function searchCity(event) {
    event.preventDefault();

    const inputField = document.querySelector("#searchCardInput");
    const userInput = inputField.value.trim();

    if (userInput === "") {
        alert("You must enter a city to perform a search.");

        return;
    }

    inputField.value = "";

    listCityName(userInput); //pass userInput
}

//function to fetch API data for city name
function listCityName(userInput) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=1df7696f823ad8cc7efbb5f9a31ff2b8&units=imperial`) //anything wrapped in ${} is a variable
        .then(function (response) { //server response
            return response.json(); //what we get here, we now are going to call it data at line 66
        })
        .then(function (data) {
            console.log(data);
            const filteredArray = []
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("00:00:00")) {
                    console.log(data.list[i]);
                    filteredArray.push(data.list[i]);
                }
            }
            displayCityName(data, filteredArray);
        })
}


//function to display the city name as list element
function displayCityName(currentObject, filteredArray) {
    //currentCityInformationContainer.innerHTML = "";
    // cityInformationContainer.innerHTML = "";
    const cityName = currentObject.city.name;
    console.log(cityName);

    for (let i = 0; i < filteredArray.length; i++) {
        const date = filteredArray[i].dt_txt;
        const temp = filteredArray[i].main.temp;
        const wind = filteredArray[i].wind.speed;
        const humidity = filteredArray[i].main.humidity;

        const dateDisplay = date;
        const tempDisplay = temp + ' °F';
        const windDisplay = wind + ' MPH';
        const humidityDisplay = humidity + ' %';

        const forecastData = {
            city: cityName,
            date: dateDisplay,
            temperature: tempDisplay,
            wind: windDisplay,
            humidity: humidityDisplay
        }

        let weatherArray = JSON.parse(localStorage.getItem("forecast")) || [];
        weatherArray.push(forecastData);
        localStorage.setItem("forecast", JSON.stringify(weatherArray));


        for (const entry of weatherArray) { //for every entry in weatherArray
            const weatherCard = (`${entry.date}, ${entry.temperature}, ${entry.wind}, ${entry.humidity}`);

            const cardEl = document.createElement("card");
            cardEl.textContent = weatherCard;
            cardContainer.append(cardEl);
        }

        console.log(dateDisplay, tempDisplay, windDisplay, humidityDisplay);
    }
}




//Processes


//search city
searchButton.addEventListener("click", searchCity);


/*
target the listitems in the results div, listen for submit to run the second function
fetch the data related to the selected city, date, temp, wind, humidity
on the click event from the selected city, clear out the previous city's displayed data, show the new city
run the renderDivs function
*/



// plug in bootstrap later
/*
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
    crossorigin="anonymous"></script>
*/

