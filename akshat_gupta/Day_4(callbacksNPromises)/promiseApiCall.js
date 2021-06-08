var axios = require('axios');
var options = {
  'method': 'GET',
  'url': 'https://api.instantwebtools.net/v1/airlines/8',
  'headers': {}
};

const response1 = function (response) {
  console.log(response);
}

const error1 = function (error) {
  console.log(error);
}

axios(options)
.then(response1)
.catch(error1);

// var options2 = {
//   'method': 'GET',
//   'url': 'https://api.instantwebtools.net/v1/airlines/9',
//   'headers': {}
// };

// axios(options2)
// .then(function (response) {
//   console.log(response);
// },
// function (error) {
//   console.log(error);
// });