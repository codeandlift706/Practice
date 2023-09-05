//Global Variables
const searchButton = document.querySelector(".searchBtn");

const searchedCitiesContainer = document.querySelector(".searchedCitiesContainer");
//WE WILL CREATE A LIST EL AND APPEND TO THIS

const currentCardContainer = document.querySelector(".currentCardContainer");
//WE WILL CREATE A CARD EL AND APPEND TO THIS

const fiveCardContainer = document.querySelector(".fiveCardContainer");
//WE WILL CREATE A CARD EL AND APPEND TO THIS

const cityInformationContainer = document.querySelector(".cityInformationContainer");
//WE WILL CREATE AND APPEND LIST EL TO THIS - DISPLAY DATE, TEMP, WIND, HUMIDITY

//API INFORMATION
/*
For city:
city.name

For temperature: in Fahrenheit 
list.main.temp
units=imperial

For wind speed: 
list.wind.speed
use units=imperial

For humidity=
list.main.humidity

For symbol=
list.weather.icon

const temperatureDisplay = data[i].list.main.temp;
const windDisplay = data[i].list.wind.speed;
const humidityDisplay = data[i].list.main.humidity;
const symbolDisplay = data[i].list.weather.icon;
*/

//---------------------------------------------------------------------------------------------
//Functions

//function for observe button clicks behavior --when you input text in the form bar-captures the input field value
function searchCity(event) {
    event.preventDefault();

    const inputField = document.querySelector("#searchCardInput");
    const userInput = inputField.value.trim();

    if (userInput === "") {
        alert("You must enter a city to perform a search.");

        return;
    }

    inputField.value = "";

    listCityName(userInput); //we are going to supply userInput
}


//function to fetch API data
function listCityName(userInput) { //userInput was not defined in this function's scope but we need it. We are telling it to expect userInput
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=1df7696f823ad8cc7efbb5f9a31ff2b8`) //anything wrapped in ${} is a variable
        .then(function (response) { //server response
            return response.json(); //what we get here, we now are going to call it data at line 66
        })
        .then(function (data) {
            console.log(data);


            for (let i = 0; i < data.length; i++) {
                displayCityName(data[i]); //we need to tell the function what is each data object, each data object occupies an index of the data array. This tells the function what argument we're passing
            }

        })
}


//function to display the city name as a list element
function displayCityName (currentObject) { //renderDivs function, we're aliasing the previous data point as currentObject. It does not have to be called the same value it is passed as. It is essentially var currentObject = data[i]. We tell this function to catch that current object before it will be logged

    const cityName = currentObject.city.name;

    console.log(cityName); // WHY ISN'T THIS SHOWING UP???????

    //create list item, click event on list item?
    // searchedCitiesContainer div
    const cityList = document.createElement("li");

    cityList.textContent = `${cityName}`;
    searchedCitiesContainer.appendChild(cityList);
    displayCityInfo(cityList);
}

/*
function to display the city weather details
    if current day,
    create current day card element
    attach attr so that this shows on single line
    Display city name first + update text content to show
    append the current day card element to the head empty card container
    create list el of city data:
    -Date
    -Emoji-weather attribute-sunny, cloudy, rainy, etc
    -Temp: ____ F
    -Wind: __ MPH
    -Humidity: __%
    display: text from data API fetch call
    append to the individual card
    
    if NOT current day,
    create the 5 day cards  - 
    attach attr so that these are inline
    update text to show
    append the 5 day cards element to the 5 card empty container
    create list el of city data:
    -Date
    -Emoji-weather attribute-sunny, cloudy, rainy, etc
    -Temp: ____ F
    -Wind: __ MPH
    -Humidity: __%
    display: text from data API fetch call
    append to each individual card
*/
function displayCityInfo (cityList) { // renderDivs function

    const tempDisplay = list.list.main.temp;
    const windDisplay = cityList.list.wind.speed;
    const humidityDisplay = cityList.list.main.humidity;
    const symbolDisplay = cityList.list.weather.icon;

    const cityFullInfo = document.createElement("li");

    cityFullInfo.textContent = `${cityName}`, `${tempDisplay}`, `${windDisplay}`, `${humidityDisplay}`,`${symbolDisplay}`;
    cityInformationContainer.appendChild(cityFullInfo);
}

/*
-----------------------------------------------------------------------------------------------
//Processes
/*

target the search button, listen for submit to run the first function
on the click event, make API call to fetch data from the city
so that the city/geographical pops up
the previously searched for cities will be saved in the list into local storage, and then retrieved from local storage to stay in display on the list

*/
searchButton.addEventListener("click", searchCity);


/*
target the listitems in the results div, listen for submit to run the second function
fetch the data related to the selected city, date, temp, wind, humidity
on the click event from the selected city, clear out the previous city's displayed data, show the new city
run the renderDivs function
*/

searchedCitiesContainer.addEventListener("click", displayCityInfo);





// plug in bootstrap later
/*
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
    crossorigin="anonymous"></script>
*/

