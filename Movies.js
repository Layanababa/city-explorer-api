'use strict';


const axios = require('axios');
module.exports = movieHandler;

let movieMemory = {};



async function movieHandler(req, res) {

    let movieNameData = req.query.locationName;
    // let lat='';
    // let lon='';
    let key = process.env.MOVIE_API_KEY;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieNameData}&page=1`;

    if (movieMemory[movieNameData] !== undefined) {
        console.log('get the data from the Memory')
        res.send(movieMemory[movieNameData])
    }

    else {
        console.log('get the data from the API');
        try {

            let result = await axios.get(url);


            let movieArr = result.data.results.map(item => {
                return new Movie(item);
            })
            movieMemory[movieNameData] = movieArr;
            // locationArr.push({lat});
            // locationArr.push({lon});
            res.send(movieArr);
            //    res.send('movie')
        } catch (err) {
            res.status(500).send(`Error in getting the movie data ==> ${err}`);
        }
    }
    
}

let imgUrl = 'https://image.tmdb.org/t/p/w500'

class Movie {
    constructor(daily) {
        this.title = daily.title;
        this.overview = daily.overview;
        this.average_votes = daily.vote_average;
        this.total_votes = daily.vote_count;
        this.image_url = imgUrl + daily.poster_path;
        this.popularity = daily.popularity;
        this.released_on = daily.release_date

    }

}



