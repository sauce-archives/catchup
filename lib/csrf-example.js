var https = require('https');

function parseCsrf(response, cb){
  response.rawHeaders.forEach(function(header){
    if (header.indexOf('csrf_token=') > -1) {
      cb(header);
    }
  });
}

https.get('https://saucelabs.com/beta/signup', function callback (response) {
  parseCsrf(response, function (token) {
    // CSRF Cookie:
    console.log(token);
  });
});

