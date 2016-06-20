var express = require('express')
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public'));
var cors = require('cors')

var corsOptions = {
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://192.168.2.125:8080']
}

var disabled = require('./public/disabled/server.js');
app.use('/',disabled);

// ////////////////////////////////////////////////////
app.set('port', (process.env.PORT || 10000))
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})
