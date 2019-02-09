const https = require('https');

setTimeout(function(){
  https.get('https://www.becreativeeveryday.com/unsuretrump/node_test.php');
}, 1000 * 60 * 2);