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

          //   Globale Uhrzeit fixen
          const timeZone = weahterData.dt;
          console.log(timeZone);
          const timeZoneOffset = weahterData.timezone;
          console.log(timeZoneOffset);

          const timeZoneMs = timeZone * 1000;
          const date = new Date(timeZoneMs);

          const localTime = new Date(date.getTime() + timeZoneOffset * 1000);
          localTime.setHours(localTime.getHours() - 1);

          const formattedLocalTime = localTime.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const sunriseTime = weahterData.sys.sunrise;
          const sunriseTimeMS = sunriseTime * 1000;
          const sunriseDate = new Date(sunriseTimeMS);
          const localSunriseTime = new Date(
            sunriseDate.getTime() + timeZoneOffset * 1000
          );
          localSunriseTime.getHours(localSunriseTime.getHours() - 1);
          const formattedSunriseTime = localSunriseTime.toLocaleTimeString(
            "de-DE",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          const sunsetTime = weahterData.sys.sunset;
          const sunsetTimeMS = sunsetTime * 1000;
          const sunsetDate = new Date(sunsetTimeMS);
          const localSunsetTime = new Date(
            sunsetDate.getTime() + timeZoneOffset * 1000
          );
          localSunsetTime.getHours(localSunsetTime.getHours() - 1);
          const formattedSunsetTime = localSunsetTime.toLocaleTimeString(
            "de-DE",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );
          //   const dateDay = date.toLocaleString("default", { weekday: "short" });
          //   console.log(dateDay);
          //   const dateDayNumber = date.getDate();
          //   console.log(dateDayNumber);
          //   const dateMonth = date.toLocaleString("default", { month: "short" });
          //   console.log(dateMonth);
          //   const dateYear = date.getFullYear();
          //   console.log(dateYear);

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
          document.querySelector(
            "#sonn_auf"
          ).innerHTML = `${formattedSunriseTime} Uhr`;
          document.querySelector(
            "#sonn_unt"
          ).innerHTML = `${formattedSunsetTime} Uhr`;
          document.querySelector("h2").innerHTML = `${formattedLocalTime} Uhr`;
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
          weatherIcon.style.height = "90px";
          let underlineP = document.querySelector(".content_wrapper p");
          console.log(underlineP);
          //   Background and colorscheme change
          if (weahterData.weather[0].description == "clear sky") {
            weatherIcon.style.backgroundImage =
              "url(assets/img/bsp_icons/images/clear.png)";
            btn.style.backgroundColor = "var(--sun-color)";
            if (weahterData.main.temp - 273.15 > 20) {
              headerSection.style.backgroundImage =
                "url(assets/img/Wetterbilder/bg_sun_beach.jpg)";
            } else {
              headerSection.style.backgroundImage =
                "url(assets/img/Wetterbilder/bg_sonne.jpg)";
            }
          } else if (
            weahterData.weather[0].description == "light rain" ||
            weahterData.weather[0].description == "rain" ||
            weahterData.weather[0].description == "overcast clouds"
          ) {
            btn.style.backgroundColor = "var(--rain-color)";
            if (weahterData.weather[0].description == "rain") {
              headerSection.style.backgroundImage =
                "url(assets/img/Wetterbilder/heavy_rain.png)";
              weatherIcon.style.backgroundImage =
                "url(assets/img/bsp_icons/images/rain.png)";
            } else if (weahterData.weather[0].description == "light rain") {
              headerSection.style.backgroundImage =
                "url(assets/img/Wetterbilder/light_rain.png)";
              weatherIcon.style.backgroundImage =
                "url(assets/img/bsp_icons/images/rain.png)";
            } else {
              headerSection.style.backgroundImage =
                "url(assets/img/Wetterbilder/bg_bewölkt.png)";
              weatherIcon.style.backgroundImage =
                "url(assets/img/bsp_icons/images/clouds.png)";
            }
          } else if (
            weahterData.weather[0].description == "scattered clouds" ||
            weahterData.weather[0].description == "broken clouds" ||
            weahterData.weather[0].description == "few clouds"
          ) {
            headerSection.style.backgroundImage =
              "url(assets/img/Wetterbilder/light_clouds.png)";
            weatherIcon.style.backgroundImage =
              "url(assets/img/bsp_icons/images/clouds.png)";
            btn.style.backgroundColor = "var(--act-color)";
          } else if (
            weahterData.weather[0].description == "snow" ||
            weahterData.weather[0].description == "light snow"
          ) {
            headerSection.style.backgroundImage =
              "url(assets/img/Wetterbilder/snow.png)";
            weatherIcon.style.backgroundImage =
              "url(assets/img/bsp_icons/images/snow.png)";
            btn.style.backgroundColor = "var(--snow-color)";
          }
        });
    });
});
