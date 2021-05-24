'use strict';

require('dotenv').config();

const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})

// http://localhost:3001/
// server.get('/', (req, res) => {
//     res.send('Home')
// })

// http://localhost:3001/weather
// server.get('/weather',(req,res)=>{
//    let locationName=weatherData.data.map(item=>{
//     return item.city_name
// })
// // let locationLat=weatherData.data.map(item=>{
// //     return item.lat
// // })
// // let locationLon=weatherData.data.map(item=>{
// //     return item.lon
// // })
//     res.send(locationName);
//     // res.send(locationLat);
//     // res.send(locationLon);
// })

// server.get('/weather', (request, response) => {
//     let str = 'Hello From back-end!!!';
//     response.status(200).send(str);
// })
// http://localhost:3001/weather?locationName=amman
server.get('/weather', (req, res) => {
    let locationNameData = req.query.locationName;

    let requiredLocation = ['amman', 'seattle', 'paris'];

    if (requiredLocation.includes(locationNameData.toLowerCase())) {

        let locationItem = weatherData.find(item => {
            if (item.city_name.toLowerCase() == locationNameData)
                
            return item;
        })
        let locationArr = locationItem.data.map(item => {
            return new Forecast(item);
        })
        res.send(locationArr);

    } else {
        res.send('Not Found!!!');
    }


})

class Forecast {
    constructor(daily) {
        this.date = daily.valid_date;
        this.description = `Low of ${daily.low_temp},high of ${daily.max_temp} with ${daily.weather.description}`
    }
}

// server.get('/weather',(req,res)=>{
//     let locationLatData=req.lat.locationName
//     let locationItem=weatherData.data.find(item=>{
//         if(item.city_name==locationLatData)
//         return item.lat
//     })
//     res.send(locationItem)
// })

server.get('*', (req, res) => {
    res.status(200).send('Not Found!!!');
})
