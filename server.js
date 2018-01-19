
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
// var database = require('./config/database');'mongodb://localhost/myapp
mongoose.connect('mongodb://localhost:27017/weather');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override');
var port     = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Employee = require('./models/cityWeather');

// mongoose.connect(database.url);
//api routes


//get all employee data from db

app.get('/api/employees', function(req, res) {
	// use mongoose to get all todos in the database
	Employee.find(function(err, employees) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(employees); // return all employees in JSON format
	});
});



// get a employee with ID of 1
app.get('/api/employees/:employee_id', function(req, res) {
	var id = req.params.employee_id;
	Employee.findById(id, function(err, employee) {
		if (err)
			res.send(err)

		res.json(employee);
	});

});



// create employee and send back all employees after creation
app.post('/api/employees', function(req, res) {
  console.log(req.body);
  var data = req.body;
	// create mongose method to create a new record into collection
	// Employee.create({
     Employee.create(data, function (err, doc) {
	// 	name : req.body.name,
	// 	salary : req.body.salary,
	// 	age : req.body.age
	// }, function(err, employee) {
		if (err){
			res.send(err);}else{
			res.json(doc);
}      		
	});

});



// devare a employee by id
app.delete('/api/employees/:employee_id', function(req, res) {
	console.log(req.params.employee_id);
	var id = req.params.employee_id;
	Employee.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Devared.');	
	});
});


app.listen(port);
console.log("App listening on port : " + port);