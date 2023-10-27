//Global Variables
const searchButton = document.querySelector(".searchBtn");
const resetButton = document.querySelector(".resetBtn");
const searchedCitiesContainer = document.querySelector(".searchedCitiesContainer");
const currentCardContainer = document.querySelector(".currentCardContainer");
const cardContainer = document.querySelector(".cardContainer");


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
    cityButtonEl.setAttribute('class',"btn btn-outline-dark");
    cityButtonEl.textContent = userInput;

    cityButtonEl.addEventListener("click", function (event) { //attach event listener for the city button
        getCurrentDay(event.target.textContent)
        getFiveDay(event.target.textContent)

    })

    searchedCitiesContainer.append(cityButtonEl);

    getCurrentDay(userInput); //pass userInput
    getFiveDay(userInput); //pass userInput
}


//function to fetch API data for current weather
function getCurrentDay(userInput) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=1df7696f823ad8cc7efbb5f9a31ff2b8&units=imperial`) //anything wrapped in ${} is a variable
        .then(function (response) { //server response
            return response.json(); //what we get here, we now are going to call it data at line 66
        })
        .then(function (data) {
            // console.log(data);
            displayCurrentDay(data);
        })
}


//function to fetch API data for 5-day forecast
function getFiveDay(userInput) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=1df7696f823ad8cc7efbb5f9a31ff2b8&units=imperial`) //anything wrapped in ${} is a variable
        .then(function (response) { //server response
            return response.json(); //what we get here, we now are going to call it data at line 66
        })
        .then(function (data) {
            // console.log(data);
            const filteredArray = []
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("00:00:00")) {
                    // console.log(data.list[i]);
                    filteredArray.push(data.list[i]);
                }
            }
            displayFiveDay(data, filteredArray);
        })
}


//function to display current weather, store to local storage
function displayCurrentDay(currentDayObject) {

    currentCardContainer.innerHTML = "";
    const cityName = currentDayObject.name;
    // console.log(cityName);
    // console.log(filteredArray);
console.log(currentDayObject);

    const temp = currentDayObject.main.temp;
    const wind = currentDayObject.wind.speed;
    const humidity = currentDayObject.main.humidity;
    const icon = currentDayObject.weather[0].icon;

    console.log(icon);
    const now = new Date(); //get current date
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const newDateFormat = `${month}/${day}/${year}`;

    
    const currentCardEl = document.createElement("card"); //create a card for entry
    
    let cityHeader = document.createElement('h1') //create h2 element to append city name
    cityHeader.textContent = `${cityName} ${newDateFormat}`;
    currentCardEl.appendChild(cityHeader);
    
    let weatherIcon = document.createElement('img'); //create img element
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`; // set img src = URL
    currentCardEl.appendChild(weatherIcon);
    
    const currentWeatherCard = (
        `
        Temp: ${temp} °F
        Wind: ${wind} MPH
        Humidity: ${humidity}%`
    ); //create a variable weatherCard to show this info

    const currentWeatherCardLines = currentWeatherCard.split('\n'); //split the weatherCard string into an array of strings using '\n' to create a new line
    const currentWeatherCardP = currentWeatherCardLines.map(line => document.createElement('h4')); //create a new p element for each string in the array, map through each string

    currentWeatherCardP.forEach((h4, index) => {
        h4.textContent = currentWeatherCardLines[index];
    }); //for each string in the new array, set the p to display the text

    currentCardContainer.append(currentCardEl); //append to currentCardContainer
    currentCardEl.append(...currentWeatherCardP); //append each p element to the card element


    const currentDayData = { //create an object with these properties so we can store to local storage
        city: cityName,
        date: newDateFormat,
        temperature: temp,
        wind: wind,
        humidity: humidity
    }

    //save the current day object in local storage, add to the existing array
    let currentWeatherArray = JSON.parse(localStorage.getItem("currentWeather")) || [];
    currentWeatherArray.push(currentDayData);
    localStorage.setItem("currentWeather", JSON.stringify(currentWeatherArray));
}


//function to display the five day forecast, store to local storage
function displayFiveDay(fiveDayObject, filteredArray) {

    cardContainer.innerHTML = "";
    const cityName = fiveDayObject.city.name;
    console.log(filteredArray);

    for (let i = 0; i < filteredArray.length; i++) { //loops through the 5 days in the array and grab what we need
        const date = filteredArray[i].dt_txt;
        const temp = filteredArray[i].main.temp;
        const wind = filteredArray[i].wind.speed;
        const humidity = filteredArray[i].main.humidity;
        const icon = filteredArray[i].weather[0].icon;

        const dateReformat = new Date(date); //reformat date
        const day = dateReformat.getDate();
        const month = dateReformat.getMonth() + 1;
        const year = dateReformat.getFullYear();
        const newDateFormat = `${month}/${day}/${year}`;

        const cardEl = document.createElement("card"); //create a card for each entry
        let dateHeader = document.createElement('h4') //create h2 element to append city name
        dateHeader.textContent = `${newDateFormat}`;
        cardEl.appendChild(dateHeader);

        const weatherCard = (
            `
                Temp: ${temp}°F
                Wind: ${wind} MPH
                Humidity: ${humidity}%
                `
        ); //for every entry in filteredArray, create a variable weatherCard to show this info

        const weatherCardLines = weatherCard.split('\n'); //split the weatherCard string into an array of strings using '\n' to create a new line
        const weatherCardP = weatherCardLines.map(line => document.createElement('h5')); //create a new p element for each string in the array, map through each string

        weatherCardP.forEach((h5, index) => {
            h5.textContent = weatherCardLines[index];
        }); //for each string in the new array, set the p to display the text
        

        let weatherIcon = document.createElement('img'); //create img for every icon
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;

        cardEl.appendChild(weatherIcon);
        cardContainer.append(cardEl); //append to cardContainer
        cardEl.append(...weatherCardP); //append each p element to the cardEl element


//save to local storage
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

//clear local storage
resetButton.addEventListener("click", resetLocalStorage);


