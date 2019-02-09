const https = require('https');
var Twit = require('twit');

setTimeout(function(){
  //https.get('https://www.becreativeeveryday.com/unsuretrump/node_test.php');
  console.log('pinged');
}, 1000 * 60 * 2);


var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});


var stream = T.stream('statuses/filter',  { follow: "1093963120412971009" })

stream.on('tweet', function (tweet) {
  console.log(tweet);
  https.get('https://www.becreativeeveryday.com/unsuretrump/node_test.php');
});