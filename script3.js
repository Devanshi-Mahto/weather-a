const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWheather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    

    console.log(data.weather[0].main);
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "assets/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "assets/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "assets/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    getHourlyForecast(city);
  }
}
async function getHourlyForecast(city) {
    const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
    
    if (!response.ok) {
      console.error("Error fetching hourly forecast data");
      return;
    }
  
    const data = await response.json();
    console.log("Hourly Forecast Data:", data); 
  
    const hourlyForecastContainer = document.querySelector(".hourly-forecast");
    
   
    hourlyForecastContainer.innerHTML="";
  
   
    data.list.forEach(hourData => {
      const hourElement = document.createElement("div");
      hourElement.classList.add("hourly-item");
  
      const time = new Date(hourData.dt * 1000); 
      const hours = time.getHours().toString().padStart(2, '0'); 
      const temperature = Math.round(hourData.main.temp);
      const weatherIcon = `https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`;
  
      hourElement.innerHTML = `
        <p class="hour">${hours}:00</p>
        <img src="${weatherIcon}" class="forecast-icon" />
        <p class="forecast-temp">${temperature}°C</p>
      `;
  
      hourlyForecastContainer.appendChild(hourElement);
    });
  }

searchBtn.addEventListener("click", () => {
  checkWheather(searchBox.value);
});

checkWheather();
