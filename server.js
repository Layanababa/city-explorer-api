'use strict';

require('dotenv').config();

const express =require('express');
const weatherData=require('./data/weather.json');
const cors=require('cors');

const server = express();
server.use(cors());

const PORT= process.env.PORT;

// http://localhost:3001/
server.get('/', (req, res) => {
    res.send('Home')
})

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

server.get('/weather', (request, response) => {
    let str = 'Hello From back-end!!!';
    response.status(200).send(str);
})

server.get('/weather',(req,res)=>{
    let locationNameData=req.searchQuery.locationName
    let locationItem=weatherData.data.find(item=>{
        if(item.city_name==locationNameData)
        return item
    })
    res.send(locationItem)
})

// server.get('/weather',(req,res)=>{
//     let locationLatData=req.lat.locationName
//     let locationItem=weatherData.data.find(item=>{
//         if(item.city_name==locationLatData)
//         return item.lat
//     })
//     res.send(locationItem)
// })

server.get('*', (req, res) => {
    res.send('Not Found!!!');
})

server.listen(PORT,()=>{
    
})