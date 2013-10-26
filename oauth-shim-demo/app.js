var oauthshim = require('oauth-shim'), express = require('express');

var app = express();
app.all('/oauthproxy', oauthshim.request);

oauthshim.init({
  '381d50981e77a1f39273' : '781b9bb5417cf36e6f970bc1f5d1b88669e9442a',
  '573051753062-8sn5iockdcvo8d7i0q5rkh3pj5mfkg4h.apps.googleusercontent.com': 'vkcj5b0sc9cFQu10jFbOv5uB',
  'z908ybfcvlw4': '9FgKSFAQVtwmZMBO',
  '0000000044106549': 'G0zcoMzUEMm6uIBDyj8gLRaCbkY9J08W'
});

oauthshim.debug = false;

app.listen(3000);
console.log('Listening on port 3000...');