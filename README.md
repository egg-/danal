# danal

danal module for Node.js

[![version](https://img.shields.io/npm/v/danal.svg) ![download](https://img.shields.io/npm/dm/danal.svg)](https://www.npmjs.com/package/danal)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Usage

```javascript
var http = require('http')
var express = require('express')
var danal = require('../')
var config = require('./config.json')

var uas = new danal.UAS(config.uas)

var app = express()

app.get('/uas',
  function (req, res, next) {
    var token = {
      userid: 'userid',
      session: 'session'
    }
    uas.request(token, function (err, data) {
      if (err) {
        res.json(err)
      }

      // @todo
      // set the tid in the token data
      // ex) updateUser(user, data.tid)

      danal.API.defaults(data, {
        cancel_uri: 'http://127.0.0.1:3001/uas/cancel'
      })
      danal.API.defaults(data, {
        ci_url: config.ci_url
      })
      danal.API.defaults(data, config.user)

      res.locals.uas = data
      next()
    })
  },
  uas.redirect()
)
app.post('/uas/callback',
  uas.receive(),
  function (req, res, next) {
    uas.confirm({
      tid: res.locals.uas.tid,
      userid: 'userid'
    }, function (err, result) {
      res.json({
        uas: res.locals.uas,
        error: err,
        result: result
      })
    })
  }
)
app.post('/uas/cancel',
  uas.receive(),
  function (req, res, next) {
    res.json(res.locals)
  }
)

var port = process.env.PORT || '3001'

app.set(port)
http.createServer(app).listen(port)
```
```javascript
// config.json
{
  "ci_url": {
    "basic": "ci logo url : size 115 x 47",
    "mobile": "ci logo url : size 77 x 29"
  },
  "uas": {
    "client_id": "CPID",
    "client_secret": "CPPWD",
    "redirect_uri": "http://127.0.0.1:3001/uas/callback"
  },
  "user": { // optional
    "carrier": "SKT",
    "phonenum": "010-0000-0000",
    "passvalue": "passvalue",
    "yearofbirth": 1982
  }
}
```
```javascript
// return data: /uas/callback
{
  "uas": {
    "code": "0000",
    "message": "No information",
    "tid": "201601131221348871382010",
    "cancel_uri": "http://127.0.0.1:3001/uas/cancel",
    "ci_url": "ci logo url",
    "passvalue": "passvalue",
    "yearofbirth": "1982",
    "use_ci": "Y"
  },
  "error": null,
  "result": {
    "code": "0000",
    "message": "No information",
    "ci": "ci string",
    "name": "user name",
    "token": "token",
    "tid": "201601131221348871382010",
    "dateofbirth": "19820504",
    "gender": "1",
    "di": "di string",
    "userid": "userid"
  }
}
// return data: /uas/cancel
{
  "uas": {
    "code": "0000",
    "message": "No information",
    "tid": "201601131224209429051010",
    "cancel_uri": "http://127.0.0.1:3001/uas/cancel",
    "ci_url": "ci logo url",
    "passvalue": "passvalue",
    "yearofbirth": "1982",
    "use_ci": "Y"
  }
}
```

### carrier
* SKT
* KTF
* LGT
* MVNO


## Documentation

See the [documentation](Documentation.md)

## Release History

See the [changelog](CHANGELOG.md)


## LICENSE

danal is licensed under the MIT license.
