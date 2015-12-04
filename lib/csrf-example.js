var request = require('request');

function parseCsrf (response, cb) {
  response.rawHeaders.forEach(function (header) {
    console.log(header);
    if (header.indexOf('csrftoken=') > -1) {
      cb(header.replace('csrftoken=', ''));      
    }
  });
}

request({url: 'https://saucelabs.com/beta/signup'}, function (error, response, body) {
  
  parseCsrf(response, function (token) {

    response.headers['X-CSRFToken'] = token;

    request.post({url: 'https://saucelabs.com/beta/api/signup', headers: response.headers }, function (error, response, body) {
      console.log(response);
    });

  });

});
