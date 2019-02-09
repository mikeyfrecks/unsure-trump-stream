const https = require('https');
var Twit = require('twit');

setTimeout(function(){
//  https.get('https://www.becreativeeveryday.com/unsuretrump/node_test.php?t=daggasdgasdg');
  //console.log('pinged');
}, 1000 * 60 * 5);


var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});


var stream = T.stream('statuses/filter',  { follow: "25073877" })

stream.on('tweet', function (tweet) {
  //CHECK based on object
  if(tweet.in_reply_to_status_id) {
    return;
  }
  if(tweet.retweeted_status) {
    return;
  }
  var text = (tweet.truncated) ? tweet.extended_tweet.full_text : tweet.text;
  var t_exploded = text.split(" ");
  //MANUAL RETWEET
  if(t_exploded[0] === "RT") {
    return;
  }
  if(t_exploded[0].indexOf('"@') > -1) {
    return;
  }
  var exclaimed = false;
  var tweetString = "";
  t_exploded.forEach(function(e,i){
    if(e.indexOf("!") > -1 && e.indexOf('http') < 0) {
      exclaimed = true;
    }
    tweetString += e.replace(/!/g, '?');
  });
  tweetString = tweetString.replace(/&amp;/g,"&");
  if(!exclaimed) {
    return;
  }
  //https.get('https://www.becreativeeveryday.com/unsuretrump/node_test.php?t='+encodeURIComponent(tweetString));
  //https.get('https://www.becreativeeveryday.com/unsuretrump/node_test.php');
});