let inputBtn = document.querySelector("#btn");

inputBtn.addEventListener("click", () => {
  // Input Feld auslesen
  let inputText = document.querySelector("#city").value;
  //   Input Text ersten Buchstaben to Uppercase
  let uppCaseTrans = () => {
    return inputText.charAt(0).toUpperCase() + inputText.slice(1);
  };
  let inputUpperCase = uppCaseTrans();
  console.log(inputUpperCase);
  //   Geo Daten API fetchen
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${inputUpperCase}&limit=1&appid=6c489898be50aa36a7ce3b9da8d7e9f1`
  )
    .then((response) => response.json())
    .then((geoData) => {
      //   console.log(geoData);

      // lat und lon aus der API holen
      let dataLat = geoData[0].lat;
      let dataLon = geoData[0].lon;
      //   console.log(dataLat);
      //   console.log(dataLon);

      //   Wetter Daten mithilfe der Geo Daten fetchen
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${dataLat}&lon=${dataLon}&appid=6c489898be50aa36a7ce3b9da8d7e9f1`
      )
        .then((response) => response.json())
        .then((weahterData) => {
          console.log(weahterData);

          //   Wetter Daten in mein HTML übertragen
          document.querySelector("#stadt").innerHTML = weahterData.name;
          document.querySelector("#land").innerHTML = weahterData.sys.country;
          document.querySelector(
            "#north"
          ).innerHTML = `N ${weahterData.coord.lat}`;
          document.querySelector(
            "#east"
          ).innerHTML = `N ${weahterData.coord.lon}`;
          document.querySelector("h1").innerHTML = `${(
            weahterData.main.temp - 273.15
          ).toFixed(1)} °C`;
          document.querySelector("#gef_temp").innerHTML = `${(
            weahterData.main.feels_like - 273.15
          ).toFixed(1)} °C`;
          document.querySelector("#max_temp").innerHTML = `${(
            weahterData.main.temp_max - 273.15
          ).toFixed(1)} °C`;
          document.querySelector("#min_temp").innerHTML = `${(
            weahterData.main.temp_min - 273.15
          ).toFixed(1)} °C`;
          document.querySelector("#nieder").innerHTML =
            weahterData.weather[0].description;
          document.querySelector("#sonn_auf").innerHTML = `${new Date(
            weahterData.sys.sunrise
          ).toLocaleTimeString()} Uhr`;
          document.querySelector("#sonn_unt").innerHTML = `${new Date(
            weahterData.sys.sunset
          ).toLocaleTimeString()} Uhr`;
          document.querySelector(
            "h2"
          ).innerHTML = `${new Date().toLocaleTimeString()} Uhr`;
          document.querySelector(
            "#datum"
          ).innerHTML = `${new Date().toLocaleDateString()}`;
          document.querySelector(
            "#wind_ges"
          ).innerHTML = `${weahterData.wind.speed} m/s`;
          document.querySelector(
            "#wind_ri"
          ).innerHTML = `${weahterData.wind.deg} °`;
          document.querySelector(
            "#wind_boe"
          ).innerHTML = `${weahterData.wind.gust} m/s`;
          document.querySelector(
            "#luftfeu"
          ).innerHTML = `${weahterData.main.humidity} %`;
          document.querySelector(
            "#luftdruck"
          ).innerHTML = `${weahterData.main.pressure} hPa`;

          let headerSection = document.querySelector("header");
          let weatherIcon = document.querySelector(".img_div");
          let underlineP = document.querySelector(".content_wrapper p");
          console.log(underlineP);
          //   Background and colorscheme change
          if (weahterData.weather[0].main == "Clear") {
            headerSection.style.backgroundImage =
              "url(assets/img/Wetterbilder/bg_sun_beach.jpg)";
            weatherIcon.style.backgroundImage =
              "url(assets/img/bsp_icons/images/clear.png)";
            underlineP.style.underline = "yellow";
            btn.style.backgroundColor = "var(--sun-color)";
          } else if ((weahterData.weather[0].main = "Rain")) {
            headerSection.style.backgroundImage =
              "url(assets/img/Wetterbilder/bg_rain.png)";
            weatherIcon.style.backgroundImage =
              "url(assets/img/bsp_icons/images/rain.png)";
            btn.style.backgroundColor = "var(--rain-color)";
          } else if (weahterData.weather[0].main == "Clouds") {
            headerSection.style.backgroundImage =
              "url(assets/img/Wetterbilder/bg_bewölkt.png)";
            weatherIcon.style.backgroundImage =
              "url(assets/img/bsp_icons/images/clouds.png)";
            btn.style.backgroundColor = "var(--act-color)";
          }
          console.log(weahterData.weather[0].main);
        });
    });
});
