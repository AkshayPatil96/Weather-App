// weather url = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// weather api key = 1e1c472893db4f05acfc6fb3b6588870
// map url = https://maps.google.com/maps?q=mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed
// map API KEY = AIzaSyD5fzKo4Kxi3qxi40rMyHkNP73xUIL90vs

let wApiKey = "1e1c472893db4f05acfc6fb3b6588870";
let foracastDays = 7;

let mApiKey = "AIzaSyD5fzKo4Kxi3qxi40rMyHkNP73xUIL90vs";

let day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

// let data;
// let data2;

async function getData() {
    try {
        let city = document.querySelector("#city").value;

        let res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${wApiKey}&units=metric`
        );
        let data = await res.json();
        console.log("data: ", data);

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let res2 = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${wApiKey}&units=metric`
        );
        let data2 = await res2.json();
        console.log("data2: ", data2);

        getWeather(data, data2);
        // function foracastSDays(data2)
    } catch (error) {
        console.log("error: ", error);
    }
}

function getWeather(data, data2) {
    let display = (document.querySelector("#display-weather").innerHTML = null);
    let div = document.createElement("div");
    div.id = "display-info";

    let div2 = document.createElement("div");
    div2.id = "map-info";
    div2.innerHTML = `<div class="cross"><div><i class="fa-solid fa-angles-right" onclick="openMap()"></i></div><div><i class="fa-solid fa-xmark"  onclick="closeMap()"></i></div></div><div class="mapouter"><iframe id="gmap_canvas" src="https://maps.google.com/maps?q=${data.name}&t=&z=11&ie=UTF8&iwloc=&output=embed"></iframe></div>`;

    let name = document.createElement("h3");
    name.innerHTML = `<div>
          <i class="fa-solid fa-location-dot"></i><span> ${data.name}</span>
        </div>`;
    name.classList.add("name");

    let temp = document.createElement("p");
    temp.innerHTML = `<div><i class="fa-solid fa-temperature-half"></i>
          <span>${data.main.temp} <span><sup>o</sup>C</span></span>
        </div>`;
    temp.classList.add("temp");

    let minMaxTemp = document.createElement("p");
    minMaxTemp.innerHTML = `<div>
          <p>Range: (<i class="fa-solid fa-temperature-low"></i>${data.main.temp_min} <span><sup>o</sup>C</span> - <i class="fa-solid fa-temperature-high"></i>${data.main.temp_max} <span><sup>o</sup>C</span>)</p>
        </div>`;
    minMaxTemp.classList.add("minMax");

    let wind = document.createElement("p");
    wind.innerHTML = `<div>
          <i class="fa-solid fa-wind"></i><span>Wind: (speed- ${data.wind.speed}m/s, deg- ${data.wind.deg}<span><sup>o</sup>)</span></span>
        </div>`;
    wind.classList.add("wind");

    let icon = data.weather[0].icon;
    let clouds = document.createElement("div");
    clouds.innerHTML = `<div><img src="http://openweathermap.org/img/wn/${icon}.png" alt="${data.weather[0].description}"></div>`;
    clouds.classList.add("clouds");

    let cloudDetails = document.createElement("p");
    cloudDetails.innerText = data.weather[0].description;
    cloudDetails.classList.add("cloudDetails");

    let sRise = new Date(data.sys.sunrise * 1000);
    let sunrise = document.createElement("p");
    sunrise.innerText = `Sunrise: ${sRise}`;
    sunrise.classList.add("sunrise");

    let sSet = new Date(data.sys.sunset * 1000);
    let sunset = document.createElement("p");
    sunset.innerText = `Sunset: ${sSet}`;
    sunset.classList.add("sunset");

    // let time = new Date();
    // console.log('time: ', time);
    let div3 = document.createElement("div");
    div3.id = "more-details";
    div3.classList.add("more-details");

    let forecastStr = "";
    console.log("forecastStr: ", forecastStr);

    data2.daily.forEach(function (element) {
        let sevenDayData = document.createElement("div");
        sevenDayData.id = "seven";

        let sDate = new Date(element.dt * 1000);
        // console.log(sDate);

        let weeks = sDate.getDay();
        console.log("weeks: ", day[weeks]);

        let months = sDate.getMonth();
        console.log("months: ", month[months]);

        forecastStr += `<div id="weather-forecast">
            <div class="forecast1">
                <div>${day[weeks]}</div>
                <div><img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="${element.weather[0].description}"></div>
                <div></div>
                <div>${element.temp.min}</div>
                <div>${element.temp.max}</div>
            </div>
        </div>`;
    });

    let div4 = document.createElement("div");
    div4.id = "forecast-details";
    div4.innerHTML = forecastStr;
    div4.classList.add("forecast-details");

    div3.append(wind, sunrise, sunset);

    div.append(name, temp, minMaxTemp, clouds, cloudDetails, div3, div4);

    document.querySelector("#display-weather").append(div, div2);
}

// function to close map

function closeMap() {
    document.querySelector("iframe").style.display = "none";
    document.querySelector(".fa-xmark").style.display = "none";
    document.querySelector(".fa-angles-right").style.display = "flex";
    document.querySelector(".fa-angles-right").style.fontSize = "60px";
    // document.querySelector("#display-weather").style.display = "grid";
    // document.querySelector("#display-weather").style.gridtemplatecolumns =
    //     "8fr 1fr";
    // document.querySelector("#display-weather").style.padding = "10px";
    // document.querySelector("#display-weather").style.alignitems = "center";
    // document.querySelector("#display-weather").style.justifyContent = "center";

    // document.querySelector("#display-info").style.padding = "5%";
    // document.querySelector("#display-info").style.backgroundColor =
    //     "rgb(87, 154, 212)";
    // document.querySelector("#display-info").style.color = "#fff";
    // document.querySelector("#display-info").style.margin = "10% 0% 5% 10%";
    // document.querySelector("#display-info").style.borderRadius = "25px";
}

// function to open map

function openMap() {
    document.querySelector("iframe").style.display = "block";
    document.querySelector(".fa-xmark").style.display = "flex";
    document.querySelector(".fa-angles-right").style.fontSize = "0px";
}
