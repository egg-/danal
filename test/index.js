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
      token: 'token'
    }
    uas.request(token, function (err, data) {
      if (err) {
        res.json(err)
      }

      // @todo
      // set the tid in the token data
      // ex) updateToken(token, data.tid)

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
      token: 'token' // optional
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
