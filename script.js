//Global Variables -globally accessible
/*
card - that'll hold the date, temp, wind, humidity
empty card container for selected city, current day
empty card container for 5 day
empty list container for generated cities
base URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
var APIKey = "1df7696f823ad8cc7efbb5f9a31ff2b8"
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var searchButton = querySelector("#searchBtn");

fetch(queryURL)
Remember that the query URL won't work automatically as it's written. You'll need to adjust your application to accept user input, to store in the city variable that you've created.

-----------------------------------------------------------------------------------------------
*/
//Functions - tell your sibling what the items on the page do
/*

We need an observe button clicks behavior
    when you input text in the form bar-captures the input field value
    plug our input field value into a fetch call-dynamically display results-the searched city name will appear underneath as a list element

    create li element
    attach attribute
    append the li to the empty list container


function searchCity () {

}


We need to have the list item click handler function
    we'll need to give this function the data from the fetch/API call
    when you click on a list item that populated
    pass this info to the page url as query string


function listCity () {

}


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



function displayCityInfo () {

}


-----------------------------------------------------------------------------------------------
*/
//Processes - how the items on the page will execute
/*

target the search button, listen for submit to run the first function
on the click event, make API call to fetch data from the city
so that the city/geographical pops up
the previously searched for cities will be saved in the list into local storage, and then retrieved from local storage to stay in display on the list

searchButton.addEventListener("submit", event) {

}


target the listitems in the results div, listen for submit to run the second function
fetch the data related to the selected city, date, temp, wind, humidity
on the click event from the selected city, clear out the previous city's displayed data, show the new city
run the renderDivs function





*/