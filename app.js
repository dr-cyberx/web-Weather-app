const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');

// const hostname = '127.0.0.1';
const port = 3000;


const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

const url0 = 'https://api.openweathermap.org/data/2.5/weather?q=london&appid=027df142e5b67a54015b3e224ea626cb&units=metric';
const url1 = 'https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=027df142e5b67a54015b3e224ea626cb&units=metric';
const url2 = 'https://api.openweathermap.org/data/2.5/weather?q=paris&appid=027df142e5b67a54015b3e224ea626cb&units=metric';
const url3 = 'https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=027df142e5b67a54015b3e224ea626cb&units=metric';

let city0 = '';
let city1 = '';
let city2 = '';
let city3 = '';

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

app.get('/', (req, res) => {
   res.render('home', {
      mycity1: city0.name,
      mycity2: city1.name,
      mycity3: city2.name,
      mycity4: city3.name,

      temp1: city0.main.temp + ' *C',
      temp2: city1.main.temp + ' *C',
      temp3: city2.main.temp + ' *C',
      temp4: city3.main.temp + ' *C',

      maxtemp1: city0.main.temp_max + ' *C',
      maxtemp2: city1.main.temp_max + ' *C',
      maxtemp3: city2.main.temp_max,
      maxtemp4: city3.main.temp_max,

      mintemp1: city0.main.temp_min + ' *C',
      mintemp2: city1.main.temp_min + ' *C',
      mintemp3: city2.main.temp_min + ' *C',
      mintemp4: city3.main.temp_min + ' *C',

      windspeed1: city0.wind.speed + 'km/hr',
      windspeed2: city1.wind.speed + 'km/hr',
      windspeed3: city2.wind.speed + 'km/hr',
      windspeed4: city3.wind.speed + 'km/hr'

   });
});

app.listen(process.env.PORT || port);
