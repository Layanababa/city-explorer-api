'use strict';

module.exports = weatherHandler
const axios = require('axios');


async function weatherHandler(req, res) {
    
    let locationNameData = req.query.locationName;
    let lat='';
    let lon='';
    let key= process.env.WEATHER_API_KEY;

let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${locationNameData}&key=${key}&days=4`;


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