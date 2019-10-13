var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 5000;

var coordinatesRouter = require('./routes/coordinates.js');
var CRUDRouter = require('./routes/CRUD.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/coordinates', coordinatesRouter);
app.use('/CRUD', CRUDRouter);

app.listen(port, function() {
	console.log('Im listening on', port);
})
