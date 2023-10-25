//Global Variables
const searchButton = document.querySelector(".searchBtn");
const resetButton = document.querySelector(".resetBtn");
const searchedCitiesContainer = document.querySelector(".searchedCitiesContainer");
const currentCardContainer = document.querySelector(".currentCardContainer");
const cardContainer = document.querySelector(".cardContainer");

//API INFORMATION
// For symbol=
// list.weather.icon

//need to do:
//searched city button to generate temp for that city
//how to get the API weather icon
//fix the date -- how do you retrieve current day? How do you retrieve weather consistently for the next 5 days?
//style the page


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


    const cityButtonEl = document.createElement("button"); //create a button for each city searched
    cityButtonEl.textContent = userInput;
    // console.log(cityName);

    cityButtonEl.addEventListener("click",function(event){ //attach event listener for the city button
        listCityName(event.target.textContent)
    })

    searchedCitiesContainer.append(cityButtonEl);

    listCityName(userInput); //pass userInput
}


//function to fetch API data for city name
//create button for each city searched
//on click
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
            displayCity(data, filteredArray);
        })
}


//function to display the city name as list element
function displayCity(currentObject, filteredArray) {

    cardContainer.innerHTML = "";

    const cityName = currentObject.city.name;
    // console.log(cityName);
    // console.log(filteredArray);

    for (let i = 0; i < filteredArray.length; i++) { //loops through the 5 days in the array and grab what we need
        const date = filteredArray[i].dt_txt;
        const temp = filteredArray[i].main.temp;
        const wind = filteredArray[i].wind.speed;
        const humidity = filteredArray[i].main.humidity;

        const dateReformat = new Date(date); //reformat date
        const day = dateReformat.getDate();
        const month = dateReformat.getMonth() + 1;
        const year = dateReformat.getFullYear();
        const newDateFormat = `${month}/${day}/${year}`;

        const weatherCard = (
            `${newDateFormat}
                temperature: ${temp}°F
                windspeed: ${wind} MPH
                humidity: ${humidity}%`
        ); //for every entry in filteredArray, create a variable weatherCard to show this info

        const weatherCardLines = weatherCard.split('\n'); //split the weatherCard string into an array of strings using '\n' to create a new line
        const weatherCardDivs = weatherCardLines.map(line => document.createElement('p')); //create a new p element for each string in the array, map through each string

        weatherCardDivs.forEach((p, index) => { 
            p.textContent = weatherCardLines[index];
        }); //for each string in the new array, set the p to display the text

        const cardEl = document.createElement("card"); //create a card for each entry
        cardContainer.append(cardEl); //append to cardContainer
        cardEl.append(...weatherCardDivs); //append each p element to the cardEl element

        const forecastData = { //create an object with these properties so we can store to local storage
            city: cityName,
            date: newDateFormat,
            temperature: temp,
            wind: wind,
            humidity: humidity
        }

        //save the 5 days/5 objects in local storage, add to the existing array
        let weatherArray = JSON.parse(localStorage.getItem("forecast")) || [];
        weatherArray.push(forecastData);
        localStorage.setItem("forecast", JSON.stringify(weatherArray));
        // console.log(weatherArray);
    }
}


//reset local storage and clears list of searched cities
function resetLocalStorage() {
    localStorage.clear();
}


//Processes

//search city
searchButton.addEventListener("click", searchCity);

//click event handler for when you click a city in the searched list, that city's forecast data pops up

//clear local storage
resetButton.addEventListener("click", resetLocalStorage);


