require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const myKey = process.env.API_KEY;

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/stat", function(req, res){
    res.sendFile(__dirname + "/stat.html");
});

app.get("/forecast", function(req, res){
    res.sendFile(__dirname + "/forecast.html");
});

app.post("/stat", function(req, res){
    const location = req.body.location;
    const url1 = "https://api.openweathermap.org/data/2.5/weather?q="+ location + "&appid="+ myKey;
    https.get(url1, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp + " " + weatherData.weather[0].description;
            res.send("<h1>Hello, The current weather data for "+location+" is "+temp+"</h1>");
        }); 
        })
    });

 app.post("/forecast", function(req, res){
    const location = req.body.location;
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q="+ location + "&cnt=3&appid="+ myKey;

    https.get(url2, function(resp){
        resp.on("data", function(data){
            const forecastData = JSON.parse(data);
            const temp2 =forecastData.list[0].main.temp + " " + forecastData.list[0].weather[0].description;
            res.send("<h1>Hello, Five days weather forecast data for "+location+" is "+temp2+"</h1>");
        });
    });
 })


app.listen(process.env.PORT || 3000, function(){
    console.log("App is up and running on port 3000");
});