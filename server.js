// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var dns = require("dns");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(bodyParser.urlencoded({extended:false}))

const mySecret = process.env['DB_URL']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });


const Schema = mongoose.Schema;
const urlSchema = new Schema({
  original:{type:String,required:true},
  short:Number
});
const Url = mongoose.model('Url',urlSchema);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Timestamp api
/*
app.get("/api/:date?", function (req, res)
{
  let dateString = req.params.date
  if(dateString == null)
  {
    res.json({unix:new Date().getTime(), utc:new Date().getTime()});
  }
  //5 digits or more must be a unix time, until we reach a year 10,000 
  if(/\d{5,}/.test(dateString)) 
  {
    let dateInteger = parseInt(dateString);
    res.json({unix: Number(dateString), utc: new Date(dateInteger).toUTCString()});
  }
  let dateObj = new Date(dateString);
  if(dateObj.toString() === 'Invalid Date')
  {
    res.json({error: 'Invalid Date'});
  }
  else
  {
    res.json({ unix: dateObj.valueOf(), utc: dateObj.toUTCString()      });
  }
});
*/

//request header parser API
/*
app.get("/api/whoami",function(req,res){
  res.json({ipaddress:req.ip,language:req.headers['accept-language'],software:"node js"});
});
*/

let responseObject = {};
app.post("/api/shorturl/new",function(req,res){
  let inputUrl = req.body.url;
  responseObject['original_url'] = inputUrl;
  res.json(responseObject);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
