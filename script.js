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
    plug our input field value into a fetch call-the searched city name will appear underneath as a list element

    create li element
    attach attribute
    append the li to the empty list container


function searchCity () {





}


We need to have the list item click handler
    when you click on a list item that populated
    pass this info to the page url as query string
    the city's weather for the current day pops up with city name / date / emoji to match
    the city's weather for the next 5 days pops up with date / emoji to match the weather

    create current day card element
    attach header element?
    append the current day card element to the head empty card container
    
    create the 5 day cards element
    attach h3 element? 
    append the 5 day cards element to the 5 card empty container



-----------------------------------------------------------------------------------------------
*/
//Processes - how the items on the page will execute
/*

target the search button, listen for submit run the first function
on the click event, make API call to fetch data from the city
so that the city/geographical pops up
the previously searched for cities will be saved in the list into local storage, and then retrieved from local storage to stay in display on the list

searchButton.addEventListener("submit", event) {

}




target the listitems in the results div
on the click event from the selected city, fetch data from the city: date, temp, wind, humidity
on the click event from the selected city, clear out the previous city's displayed data, show the new city


*/