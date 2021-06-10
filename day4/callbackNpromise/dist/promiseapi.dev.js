"use strict";

var axios = require('axios');

var option1 = {
  'method': 'GET',
  'url': 'https://api.instantwebtools.net/v1/airlines/8',
  'headers': {}
};
var option2 = {
  'method': 'GET',
  'url': 'https://api.instantwebtools.net/v1/airlines/9',
  'headers': {}
};
axios(option1).then(function (response) {
  console.log(response.data);
  return axios(option2);
}).then(function (response) {
  console.log(response.data);
})["catch"](function (err) {
  console.log(err);
});