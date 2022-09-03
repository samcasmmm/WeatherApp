let weather = {
  apikey: "a0d0437359614a2aed2ad457d9293c50",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = ` Weather in ${name}`;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = ` Humidity : ${humidity}%`;
    document.querySelector(".wind").innerText = ` Wind Speed ${speed} km/h`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
    
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  document.querySelector("body").style.backgroundImage = 
      "url(http://source.unsplash.com/1980x1080/?" + document.querySelector(".searchbar").value + "+city)";
});

// function changeBG() {
//   console.log(document.querySelector(".searchbar").value);
// }
