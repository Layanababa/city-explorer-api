'use strict';

require('dotenv').config();

const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
const server = express();
server.use(cors());

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})


// http://localhost:3001/weather?locationName=amman

// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

//https://api.themoviedb.org/3/search/movie?api_key=22627247051500a55dbaa4f1bbd8f97d&query=amman
server.get('/weather', weatherHandler)
server.get('/', (req, res) => {
    res.status(200).send('home route')
})

async function weatherHandler(req, res) {
    
        let locationNameData = req.query.locationName;
        let lat='';
        let lon='';
        let key= process.env.WEATHER_API_KEY;
   
    let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${locationNameData}&key=${key}`;

   
    try{
       
        let result=await axios.get(url);
            
            
            let locationArr = result.data.data.map(item => {
                return new Forecast(item);
            })
            // locationArr.push({lat});
            // locationArr.push({lon});
            res.send(locationArr);
       
    }catch(err){
    res.status(500).send(`Error in getting the weather data ==> ${err}`);
}


}



class Forecast {
    constructor(daily) {
        this.date = daily.valid_date;
        this.description =`Low of ${daily.low_temp},high of ${daily.max_temp} with ${daily.weather.description}`
        // daily.weather.description
        
        
    }
}

let imgUrl='https://image.tmdb.org/t/p/w500'
class Movie{
    constructor(daily){
        this.title=daily.title;
        this.overview=daily.overview;
        this.average_votes=daily.vote_average;
        this.total_votes=daily.vote_count;
        this.image_url= imgUrl+daily.poster_path;
        this.popularity=daily.popularity;
        this.released_on=daily.release_date

    }
}
server.get('/movies', movieHandler)
//http://localhost:3001/movies?locationName=seattle
async function movieHandler(req, res) {
    
        let movieNameData = req.query.locationName;
        // let lat='';
        // let lon='';
        let key= process.env.MOVIE_API_KEY;
   
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieNameData}&page=1`;

   
    try{
       
        let result=await axios.get(url);
            
            
            let movieArr = result.data.results.map(item => {
                return new Movie(item);
            })
            // locationArr.push({lat});
            // locationArr.push({lon});
            res.send(movieArr);
    //    res.send('movie')
    }catch(err){
    res.status(500).send(`Error in getting the movie data ==> ${err}`);
}


}


server.get('*', (req, res) => {
    res.status(500).send('Not Found!!!');
})