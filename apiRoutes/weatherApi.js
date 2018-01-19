var express = require('express');
var app = express();
let request = require('request');
const argv = require('yargs').argv;
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cityWeather = require('./models/cityWeather');

// [localhost:27017]
mongoose.connect('mongodb://localhost/weather');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected top db");
});

app.set('view engine', 'ejs')
app.use(express.static('public'));
// app.use('/', weatherApi);

app.use(bodyParser.urlencoded({
  extended: true
}));

let apiKey = "bd5e378503939ddaee76f12ad7a97608";

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  });

app.post('/', function (req, res) {
let city =  req.body.city;
    console.log(city);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    request(url, function (err, response, body) {
      if(err){
          console.log("49",err)
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        
        console.log("55",weather)
        
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          console.log(weatherText);
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })

 
//  cityRoutes.route('/add').post(function (req, res) {
app.post('/cityList/data', function (req, res) {
  var data = req.body;
  console.log("data in this function")
  console.log(data)
     cityWeather.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
        }
        else
        {
            console.log("saved")
            let weatherText = doc;
          console.log(weatherText);
          res.render('index', {data: weatherText, error: null});
        }
    });
});


// cityRoutes.route('/all/cities').get(function (req, res) {

app.get('/cityList', function (req, res) {
  // console.log("inside this function")
  // city.find(function (err, data){
  //   if(err){
  //     console.log(err);
  //   }
  //   else {
  //     console.log(data);
  //     res.json(data);
  //   }
  // });
  cityWeather.find(function (err, data){
    if(err){
      console.log(err);
    }
    else {
      console.log(data);
      res.json(data);
    }
  });
    // .then(function(userList){                              
    //     if (userList){
    //         res.send(userList);
    //     }else {
    //         res.sendStatus(404);
    //     }
    // })
    // .catch(function (err){
    //     console.log("exception" + err);
    //     res.status(500).send(err);
    // });
});



var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})