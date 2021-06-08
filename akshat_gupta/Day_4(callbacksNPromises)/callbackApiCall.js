var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.instantwebtools.net/v1/airlines/8',
  'headers': {}
};

const callback1 = function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));
}

request(options, callback1);

var options2 = {
  'method': 'GET',
  'url': 'https://api.instantwebtools.net/v1/airlines/9',
  'headers': {}
};

request(options2, function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));
});