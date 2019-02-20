const https = require('https');
var Twit = require('twit');

setTimeout(function(){

  //console.log('pinged');
}, 1000 * 60 * 5);

console.log('up');
var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});
//"25073877";
var trump_id = "1093963120412971009"

var stream = T.stream('statuses/filter',  { follow: trump_id})

stream.on('tweet', function (tweet) {
  //CHECK based on object
  console.log('tweet');
  console.log(tweet);

  return false;

  if(tweet.user.id_str !== trump_id) {
    console.log('not trump');
    return ;
  }
  if(tweet.in_reply_to_status_id) {
    console.log('blocked reply');
    return;

  }
  if(tweet.retweeted_status) {
    return;

  }
  var text = (tweet.truncated) ? tweet.extended_tweet.full_text : tweet.text;
  console.log(text);
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
    tweetString += e.replace(/!/g, '?')+" ";
  });
  tweetString = tweetString.replace(/&amp;/g,"&");
  if(!exclaimed) {
    return;
  }
  console.log(tweetString);
  https.get(process.env.test_string + encodeURIComponent(tweetString));
  T.post('statuses/update', { status: tweetString }, function(err, data, response) {
    console.log(data)
  });


});