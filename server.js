var express = require('express')
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public'));

var disabled = require('./public/disabled/server.js')
app.use('/',disabled)

// ////////////////////////////////////////////////////
app.set('port', (process.env.PORT || 10000))
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})
