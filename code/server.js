var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors');

let cards = [];

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/listcard', function (req, res) {
   fs.readFile( __dirname + "/" + "card.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get("/",(req,res) => {
   res.json({ message:"welcome to bhavesh sadhu application" });
});


app.post('/listcard', (req, res) => {
   
   //console.log(req);
   const cardinfo = req.body;
   
   //console.log(cardinfo);
   cards.push(cardinfo.amount);
   cards.push(cardinfo.currency);
   cards.push(cardinfo.type);
   cards.push(cardinfo.card.number);
      
   function authcode(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
   let auth_code = authcode(12)

   let status_code_sucess = "sucess";
   let status_code_fail = "fail";

   let card_length = cardinfo.card.number.toString().length
   let cvv_length = cardinfo.card.cvv.toString().length

   var card_month = cardinfo.card.expirationMonth;
   var current_month = (date_ob.getMonth() + 1);
   var card_year = cardinfo.card.expirationYear;
   
   if((parseInt(card_month) >= current_month || parseInt(card_month) <= current_month || parseInt(card_month) === current_month) && parseInt(card_year) >= year && card_length === 16 && cvv_length === 3){
      res.json({ amount: cardinfo.amount, currency:cardinfo.currency, type:cardinfo.type, card:{number: cardinfo.card.number},status:status_code_sucess,authorizationcode:auth_code,time:timestamp})
   }
   else{
      res.json({status : status_code_fail})
   }   
});

var server = app.listen(3000, function () {
   console.log("Sever Runing on http://127.0.0.1:3000");
})

module.exports = app;