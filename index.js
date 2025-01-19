const url =
  "https://api.weatherapi.com/v1/current.json?key=9a4ef0461e74477ea96102651251901&q="; // Base URL
const searchValue = document.querySelector("#form-container"); // Get the element input from the HTML page by its id

// Add event listener to the input value and call a function to retrieve the input
searchValue.addEventListener("submit", (e) => {
  e.preventDefault();
  retrieveInput();
});

// Using an async function as data could be not synchronized
async function retrieveInput() {
  const input = document.querySelector("input[name='place']").value; // Get the value from the input field
  if (!input) {
    console.error("Please enter a valid location.");
    return;
  }

  fetchData(input);
}

async function fetchData(query) {
  try {
    const response = await fetch(`${url}${query}&aqi=no`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const location = data.location;
    const placeName = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const weather = data.current.condition.text;
    const temperature = data.current.temp_c;
    const imageWeather = data.current.condition.icon;
    document.getElementById("searchValue").value = '' // Clean the form input if the values have been passed
    displayWeather(
      placeName,
      region,
      country,
      weather,
      temperature,
      imageWeather
    );

    // console.log("Data retrieved location: ", location);
    // console.log("Data retrieved name: ", placeName);
    // console.log("Data retrieved region: ", region);
    // console.log("Current weather: ", weather);
    // console.log(data.current.condition.icon);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

const displayWeather = (
  placeName,
  region,
  country,
  weather,
  temperature,
  imageWeather
) => {
  
  let changeImage = "./images/rainbow.png";
  console.log(weather);
  switch (weather.toLowerCase()) {
    case "sunny":
      changeImage = "./images/sunny.png";
      break;
    case "cloudy":
      changeImage = "./images/cloudy.png";
      break;
    case "rainy":
      changeImage = "./images/rainy.png";
      break;
    case "partly cloudy":
      changeImage = "./images/partly-cloudy-sky.png";
      break;
    case "fog":
      changeImage = "./images/fog.png";
      break;
    case "freezing fog":
      changeImage = "./images/freezing-fog.png";
      break;
    case "overcast":
      changeImage = "./images/an-overcast-sky.png";
      break;
    case "light rain":
      changeImage = "./images/light-rain.png";
      break;
    case "patchy rain nearby":
      changeImage = "./images/patchy-rain-nearby.png";
      break;
    case "light rain shower":
      changeImage = "./images/light-rain-shower.png";
      break;
    case "mist":
      changeImage = "./images/mist-day.png";
      break;
    default:
      changeImage = "./images/rainbow.png";
      break;
  }

  const displayResults = document.querySelector("#display-results");

  displayResults.innerHTML = ` <div class="label"><h2>Weather in ${placeName},
   ${region}, ${country}</h2>
    <p>Temperature: ${temperature}°C </p> 
    <p>Condition: ${weather}</p>
     <img src="${changeImage}" alt="${weather}" id="weatherImage">
     </div>`;
};
