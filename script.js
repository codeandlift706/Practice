//Global Variables
const searchButton = document.querySelector(".searchBtn");

const searchedCitiesContainer = document.querySelector(".searchedCitiesContainer");
//WE WILL CREATE A LIST EL AND APPEND TO THIS

const currentCardContainer = document.querySelector(".currentCardContainer");
//WE WILL CREATE A CARD EL AND APPEND TO THIS

const fiveCardContainer = document.querySelector(".fiveCardContainer");
//WE WILL CREATE A CARD EL AND APPEND TO THIS

const cityInformationContainer = document.querySelector(".cityInformationContainer");
//WE WILL CREATE AND APPEND 5 LIST EL TO THIS - DISPLAY DATE, TEMP, WIND, HUMIDITY

const currentCityInformationContainer = document.querySelector(".currentCityInformationContainer");


//API INFORMATION
// For symbol=
// list.weather.icon


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
function displayCityName(currentObject, filteredArray) { //renderDivs function, we're aliasing the previous data point as currentObject. It does not have to be called the same value it is passed as. It is essentially var currentObject = data[i]. We tell this function to catch that current object before it will be logged
    //currentCityInformationContainer.innerHTML = "";
    cityInformationContainer.innerHTML = "";
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

        //create array
        //store all items in array in local storage
        //so we can retrieve these back out
        //then append each object on a card
    localStorage.setItem("cityName",cityName); //currently replacing in local storage
    console.log(dateDisplay, tempDisplay, windDisplay, humidityDisplay);
        }
}



// //target fiveCardContainer
//     function renderCard(details){
//     return `
//         <div class="card">
//             <img src="${(details.Poster != "N/A") ? details.Poster: "resources/img-not-found.png"}" alt="" class="card-img" />
//             <div class="card-description">
//                 <p class="card-title">${details.Title}</p>
//                 <p> ${(details.Plot)} </p>
//             </div>
//         </div>
//         `;
//     }
//     let detailArray = [
//         {
//             Poster: "Poster1",
//             Title: "Title1",
//             Plot: "Plot1"
//         },
//         {
//             Poster: "Poster2",
//             Title: "Title2",
//             Plot: "Plot2"
//         },
//         {
//             Poster: "Poster2",
//             Title: "Title2",
//             Plot: "Plot2"
//         },
//     ];
    
//     cardsGroupFlex.innerHTML = detailArray.map(item => getContentDetails(item)).join("");





/*
function to display the city weather details
    if current day, create current day card element
    attach attr so that this shows on single line
    Display city name first + update text content to show
    append the current day card element to the head empty card container
    create list el of city data:
        Date; Emoji-weather attribute; Temp: ____ F; Wind: __ MPH; Humidity: __%;
    display: text from data API fetch call, append to each individual card
    
    if NOT current day, create the 5 day cards 
    attach attr so that these are inline
    update text to show
    append the 5 day cards element to the 5 card empty container
    create list el of city data:
        Date; Emoji-weather attribute; Temp: ____ F; Wind: __ MPH; Humidity: __%;
    display: text from data API fetch call, append to each individual card
*/

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



// plug in bootstrap later
/*
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
    crossorigin="anonymous"></script>
*/

