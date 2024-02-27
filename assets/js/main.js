let inputBtn = document.querySelector("#btn");
let forecastWrapper = document.querySelector(".forecast_wrapper");
console.log(forecastWrapper);

inputBtn.addEventListener("click", () => {
  // Input Feld auslesen
  let inputText = document.querySelector("#city").value;
  //   Input Text ersten Buchstaben to Uppercase

  if (inputText.length === 0) {
    document.querySelector("#stadt").innerHTML = "! Bitte gib eine Stadt ein !";
  }

  let uppCaseTrans = () => {
    return inputText.charAt(0).toUpperCase() + inputText.slice(1);
  };
  let inputUpperCase = uppCaseTrans();
  console.log(inputUpperCase);
  //   Geo Daten API fetchen
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${inputUpperCase}&limit=1&appid=6c489898be50aa36a7ce3b9da8d7e9f1`
  )
    .then((response) => response.json())
    .then((geoData) => {
      //   console.log(geoData);

      // lat und lon aus der API holen
      let dataLat = geoData[0].lat;
      let dataLon = geoData[0].lon;
      //   console.log(dataLat);
      //   console.log(dataLon);

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${dataLat}&lon=${dataLon}&appid=6c489898be50aa36a7ce3b9da8d7e9f1`
      )
        .then((response) => response.json())
        .then((forecastData) => {
          console.log(forecastData.list);
          console.log(forecastData.list[2].dt_txt);
          //   2024-02-26 00:00:00

          //   aktueller Tag in Zahlen
          let actualeDate = new Date().toLocaleDateString().slice(0, 2);
          console.log(actualeDate);

          forecastWrapper.style.display = "flex";

          let iconArray = [
            "assets/img/bsp_icons/images/clouds.png",
            "assets/img/bsp_icons/images/clear.png",
            "assets/img/bsp_icons/images/clouds.png",
            "assets/img/bsp_icons/images/clear.png",
            "assets/img/bsp_icons/images/clouds.png",
          ];
          console.log(iconArray[1]);
          console.log(iconArray);
          forecastWrapper.innerHTML = "";
          for (let i = 0; i < forecastData.list.length; i++) {
            let forecastTime = forecastData.list[i].dt_txt.slice(11, 13);
            let forecastDate = forecastData.list[i].dt_txt.slice(8, 10);
            let today = new Date(forecastData.list[i].dt_txt);
            let justToday = today.toLocaleString("de-DE", { weekday: "short" });
            let temperature = forecastData.list[i].main.temp - 273.15;
            let icon = forecastData.list[1].weather[0].icon.slice(1, 2);
            console.log(icon);

            if (forecastTime == 12 && forecastDate != actualeDate) {
              forecastWrapper.innerHTML += `<div>
              <p>${justToday}</p>
              <img src="${iconArray[icon]}" >
              <p>${temperature.toFixed()}°C </p> </div>
              `;
            }
          }
        });

      //   Tages-Wetter Daten mithilfe der Geo Daten fetchen
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

          if (
            formattedLocalTime > formattedSunriseTime &&
            formattedLocalTime < formattedSunsetTime
          ) {
            if (weahterData.weather[0].description == "clear sky") {
              weatherIcon.innerHTML =
                '<dotlottie-player src="https://lottie.host/076dd77a-f948-424e-be7d-96d8d98d1658/grk6M6XIvu.json" background="transparent" speed="0.5" style="width: 90px; height: 90px;" loop autoplay></dotlottie-player>';
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

                weatherIcon.innerHTML =
                  '<dotlottie-player src="https://lottie.host/ae97314f-1824-440d-bad9-3c2e9886aa45/1ZBJOzlBEf.json" background="transparent" speed="1" style="width: 90px; height: 90px" loop autoplay ></dotlottie-player>';
              } else if (weahterData.weather[0].description == "light rain") {
                headerSection.style.backgroundImage =
                  "url(assets/img/Wetterbilder/light_rain.png)";
                weatherIcon.style.backgroundImage =
                  "url(assets/img/bsp_icons/images/rain.png)";
              } else {
                headerSection.style.backgroundImage =
                  "url(assets/img/Wetterbilder/bg_bewölkt.png)";
                weatherIcon.innerHTML =
                  '<dotlottie-player src="https://lottie.host/62e5a995-f5c5-4fad-bb28-cbdcec0fe059/mWfu4wzNNB.json" background="transparent" speed="1" style="width: 90px; height: 90px;" loop autoplay></dotlottie-player>';
              }
            } else if (
              weahterData.weather[0].description == "scattered clouds" ||
              weahterData.weather[0].description == "broken clouds" ||
              weahterData.weather[0].description == "few clouds"
            ) {
              headerSection.style.backgroundImage =
                "url(assets/img/Wetterbilder/light_clouds.png)";
              weatherIcon.innerHTML =
                '<dotlottie-player src="https://lottie.host/8bec3245-f79a-42f4-9959-34f284961494/n1ATOaotcA.json" background="transparent" speed="1" style="width: 90px; height: 90px;" loop autoplay></dotlottie-player>';
              btn.style.backgroundColor = "var(--act-color)";
            } else if (
              weahterData.weather[0].description == "snow" ||
              weahterData.weather[0].description == "light snow"
            ) {
              headerSection.style.backgroundImage =
                "url(assets/img/Wetterbilder/snow.png)";
              weatherIcon.innerHTML =
                '<dotlottie-player src="https://lottie.host/40c62f64-70f8-4504-8458-7c6470b92b44/4XrElgB58D.json" background="transparent" speed="1" style="width: 90px; height: 90px;" loop autoplay></dotlottie-player>';
              btn.style.backgroundColor = "var(--snow-color)";
            }
          } else {
            headerSection.style.backgroundImage =
              "url(assets/img/Wetterbilder/night_sky2.jpg)";
            weatherIcon.innerHTML =
              '<dotlottie-player src="https://lottie.host/618e666d-33fb-44e8-b028-8483b907e141/YGjYbX7BJs.json" background="transparent" speed="1" style="width: 90px; height: 90px;" loop autoplay></dotlottie-player>';
            btn.style.backgroundColor = "var(--rain-color)";
          }
          //   let finalStyling = document.querySelector(".big_temperature");
          //   finalStyling.style.marginBottom = "-1.4rem";
          let lessPadding = document.querySelector("h2");
          lessPadding.style.paddingBlock = "1.9rem";
          document.querySelector(".top").style.marginLeft = "6.8rem";
        });
    });
});
