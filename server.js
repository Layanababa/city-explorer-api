'use strict';

require('dotenv').config();

const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
const server = express();
server.use(cors());
const Weather=require('./Weather');
const Movies=require('./Movies');


const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})


// http://localhost:3001/weather?locationName=amman

// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

//https://api.themoviedb.org/3/search/movie?api_key=22627247051500a55dbaa4f1bbd8f97d&query=amman
server.get('/weather', Weather)
server.get('/', (req, res) => {
    res.status(200).send('home route')
})




server.get('/movies', Movies)
//http://localhost:3001/movies?locationName=seattle


server.get('*', (req, res) => {
    res.status(500).send('Not Found!!!');
})