var express = require('express');
var app = express();
const cors = require('cors'); 


app.use(cors());
var lugar_routes = require('./routes/lugar');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', lugar_routes);

module.exports = app;
