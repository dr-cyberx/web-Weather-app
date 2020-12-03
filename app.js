const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');
const { response } = require('express');
const { hostname } = require('os');

// const hostname = '127.0.0.1';
const port = 3000;

// Initialize app here
const app = express();

// Using some essential middleware
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

var worldCities = []
function randomCity(){
   let x = Math.floor((Math.random() * 100) + 1);
   return x;
}

const url0 = 'https://api.openweathermap.org/data/2.5/weather?q=london&appid=027df142e5b67a54015b3e224ea626cb&units=metric';
const url1 = 'https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=027df142e5b67a54015b3e224ea626cb&units=metric';
const url2 = 'https://api.openweathermap.org/data/2.5/weather?q=paris&appid=027df142e5b67a54015b3e224ea626cb&units=metric';
const url3 = 'https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=027df142e5b67a54015b3e224ea626cb&units=metric';

let city0 = '';
let city1 = '';
let city2 = '';
let city3 = '';

// getting data with api url assined above
https.get(url0, (response0) => {
   response0.on('data', (data) => {
      city0 = JSON.parse(data);
   });
});

https.get(url1, (response1) => {
   response1.on('data', (data) => {
      city1 = JSON.parse(data);
   });
});

https.get(url2, (response2) => {
   response2.on('data', (data) => {
      city2 = JSON.parse(data);
   });
});

https.get(url3, (response3) => {
   response3.on('data', (data) => {
      city3 = JSON.parse(data);
   });
});

// Making get request on home  route
app.get('/', (req, res) => {
   res.render('home', {

      // City name here
      mycity1: city0.name,
      mycity2: city1.name,
      mycity3: city2.name,
      mycity4: city3.name,

      // Temperature here
      temp1: city0.main.temp + ' *C',
      temp2: city1.main.temp + ' *C',
      temp3: city2.main.temp + ' *C',
      temp4: city3.main.temp + ' *C',

      // Max Temperature here
      maxtemp1: city0.main.temp_max + ' *C',
      maxtemp2: city1.main.temp_max + ' *C',
      maxtemp3: city2.main.temp_max + ' *C',
      maxtemp4: city3.main.temp_max + ' *C',

      // Min temperature here
      mintemp1: city0.main.temp_min + ' *C',
      mintemp2: city1.main.temp_min + ' *C',
      mintemp3: city2.main.temp_min + ' *C',
      mintemp4: city3.main.temp_min + ' *C',

      // Wind speed here
      windspeed1: city0.wind.speed + 'km/hr',
      windspeed2: city1.wind.speed + 'km/hr',
      windspeed3: city2.wind.speed + 'km/hr',
      windspeed4: city3.wind.speed + 'km/hr',

      // WEather icon here
      weatherIcon0 : city0.weather[0].icon,
      weatherIcon1 : city1.weather[0].icon,
      weatherIcon2 : city2.weather[0].icon,
      weatherIcon3 : city3.weather[0].icon,

   });
});

app.post('/', function (req, res) {
   let customCity = req.body.cCity;
   let customurl = 'https://api.openweathermap.org/data/2.5/weather?q=' + customCity + '&appid=027df142e5b67a54015b3e224ea626cb&units=metric';
   https.get(customurl, (responsex) => {
      responsex.on('data', (data) => {
         customCityData = JSON.parse(data);
         res.render('result', {
            customCityName: customCityData.name,
            customCityTemp: customCityData.main.temp + ' *C',
            customCityMaxTemp: customCityData.main.temp_max + ' *C',
            customCityMinTemp: customCityData.main.temp_min + ' *C',
            customCityWindSpeed: customCityData.wind.speed + 'km/hr',
            CustomWeatherIcon : customCityData.weather[0].icon
         });
      });
   });
});


// Litening app here
app.listen(process.env.PORT || port,  () => {
   // console.log(`The server is running at http://${hostname}:${port}`);
});
