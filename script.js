//Global Variables -globally accessible
const searchButton = document.querySelector(".searchBtn");

const searchedCitiesContainer = document.querySelector(".searchedCitiesContainer");
//WE WILL CREATE A LIST EL AND APPEND TO THIS

const currentCardContainer = document.querySelector(".currentCardContainer");
//WE WILL CREATE A CARD EL AND APPEND TO THIS

const fiveCardContainer = document.querySelector(".fiveCardContainer");
//WE WILL CREATE A CARD EL AND APPEND TO THIS

const cityInformationContainer = document.querySelector(".cityInformationContainer");
//WE WILL CREATE AND APPEND LIST EL TO THIS - DISPLAY DATE, TEMP, WIND, HUMIDITY

const APIKey = "1df7696f823ad8cc7efbb5f9a31ff2b8"

const requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=APIKey&units=imperial"

const cityNameSearch =
//THIS IS 5 DAY FORECAST - REQUEST BY CITY NAME

/*
base URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
var APIKey = "1df7696f823ad8cc7efbb5f9a31ff2b8"
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
Remember that the query URL won't work automatically as it's written. You'll need to adjust your application to accept user input, to store in the city variable that you've created.

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


-----------------------------------------------------------------------------------------------
*/
//Functions
/*

We need an observe button clicks behavior
    when you input text in the form bar-captures the input field value
    plug our input field value into a fetch call-dynamically display results-the searched city name will appear underneath as a list element

    create li element
    attach attribute
    append the li to the empty list container

*/
function searchCity (event) {
    event.preventDefault();

    const inputField = document.querySelector("#searchCardInput");
    const userInput = inputField.value.trim();

    if (userInput === "") {
        alert("You must enter a city to perform a search.");
        
        return;
    }
    
    inputField.value = "";


    fetch() //request URL
    .then(function(response) { //server response
    return response.json(); //what we get here, we now are going to call it data at line 66

    })
    .then(function(data) {
        console.log(data);
    })
}



/*
We need to have the list item click handler function
    we'll need to give this function the data from the fetch/API call
    when you click on a list item that populated
    pass this info to the page url as query string
*/

function listCity (event) {

}

/*
We need to have a renderDivs function
    for all queries data, create:

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


function displayCityInfo (event) { //renderDivs function
//need to know what the current search value is - know which element was clicked on so we can get its text content
//update the page to reflect the currently selected value
console.log("Your searchedCities button was clicked");

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

