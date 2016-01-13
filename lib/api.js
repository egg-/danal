/**
 * @file api.js
 */

/** @private */
var request = require('request')

/** @private */
var stream = require('stream')

/** @private */
var fs = require('fs')

/** @private */
var useragent = require('express-useragent')

/** @private */
var qs = require('querystring')

/** @private */
var mandatory = function (fields, opts) {
  for (var i = 0; i < fields.length; i++) {
    if (!opts[fields[i]]) {
      throw new Error('require api option value: ' + fields[i])
    }
  }
}

/** @private */
var defaults = function (data, defaults) {
  for (var key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      data[key] = defaults[key]
    }
  }
}

/** @private */
var NAMES = require('./names')

/** @private */
var KEYS = {}
for (var name in NAMES) {
  if (NAMES.hasOwnProperty(name)) {
    KEYS[NAMES[name]] = name
  }
}

/** @private */
var MANDATORY_FIELDS = ['client_id', 'client_secret', 'service']

/**
 * @class Core class for danal API.
 * @constructs API
 * @param  {string} endpoint
 * @param  {object} opts
 * @example
 * var api = new API('https://...', {...})
 */
var API = function (endpoint, opts) {
  /**
   * options
   * @member options
   * @memberof API.prototype
   * @private
   * @type {object}
   */
  this.options = {}

  opts = opts || {}

  // defaults
  opts.charset = opts.charset || 'UTF-8'

  // check mandatory
  mandatory(MANDATORY_FIELDS, opts)

  // init
  this.options = opts

  /**
   * return api endpiont
   * @method getEndpoint
   * @memberof API.prototype
   * @return {string}
   */
  this.getEndpoint = function () {
    return endpoint
  }
}

/**
 * request
 * @method request
 * @memberof API.prototype
 * @param  {object} opts
 * @param  {object} opts.method `POST`, `GET` default is `POST`
 * @param  {object} opts.data
 * @param  {object} opts.headers
 * @param  {function} cb cb(err, data)
 */
API.prototype.request = function (opts, cb) {
  var param = {
    url: this.getEndpoint(),
    method: opts.method || 'POST',
    headers: opts.headers || {}
  }

  // set defaults value
  opts.data = opts.data || {}
  defaults(opts.data, this.options)

  // convert names
  var data = {}
  for (var key in opts.data) {
    if (opts.data.hasOwnProperty(key)) {
      if (typeof NAMES[key] === 'undefined') {
        throw new Error('does not support key: ' + key)
      }
      data[NAMES[key]] = opts.data[key]
    }
  }

  if (param.method === 'GET') {
    param.qs = data
  } else {
    param.form = data
  }

  return request(param, function (err, res) {
    if (err) {
      return cb(err)
    }

    try {
      var result = res.body.split('&')
      var data = {}

      for (var i = 0, val = null; i < result.length; i++) {
        val = result[i].split('=', 1)
        data[KEYS[val[0]]] = result[i].replace(val[0] + '=', '')
      }

      if (data.code !== '0000') {
        return cb({
          code: data.code,
          message: data.message
        })
      }

      delete data.returncode
      delete data.returnmsg

      cb(null, data)
    } catch (e) {
      cb(e)
    }
  })
}

API.mandatory = mandatory
API.defaults = defaults

/**
 * return middleware for redirect
 * @method redirect
 * @memberof API.property
 * @param {string} name key name of res.locals for the data transfer.
 * @return {function} express middleware
 */
API.prototype.redirect = function (name, redirect_uri) {
  return function (req, res, next) {
    if (!name || !res.locals[name]) {
      throw new Error('missing name parameter.')
    }

    var ua = useragent.parse(req.headers['user-agent'])
    var data = res.locals[name]

    var uri = null
    if (typeof redirect_uri === 'string') {
      uri = redirect_uri
    } else {
      uri = redirect_uri[ua.isMobile ? 'mobile' : 'basic']
    }

    // populate ci_url
    if (typeof data.ci_url !== 'string') {
      if (ua.isMobile) {
        data.ci_url = data.ci_url.mobile
      } else {
        data.ci_url = data.ci_url.basic
      }
    }

    if (typeof data.ci_url) {
      data.use_ci = 'Y'
    } else {
      data.use_ci = 'N'
    }

    // load template file.
    var file = fs.createReadStream(__dirname + '/redirect.html')

    // convert names
    var param = {}
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof NAMES[key] === 'undefined') {
          throw new Error('does not support key: ' + key)
        }
        param[NAMES[key]] = data[key]
      }
    }

    var token = new stream.Transform({ objectMode: true })
    token._transform = function (chunk, encoding, done) {
      var str = chunk.toString()
      str = str.replace('{{uri}}', uri)
      str = str.replace('{{data}}', JSON.stringify(param))
      this.push(str)
      done()
    }

    // make sure the page is being sent as html
    res.set('Content-Type', 'text/html;charset=utf-8')
    file.pipe(token).pipe(res)
  }
}

/**
 * return middleware for receive
 * Setting the received data to the specified res.locals.`name`
 * @method receive
 * @memberof API.property
 * @param {string} name key name of res.locals for the data transfer.
 * @return {function} express middleware
 */
API.prototype.receive = function (name) {
  return function (req, res, next) {
    var done = function (raw) {
      var data = {}
      for (var key in raw) {
        if (raw.hasOwnProperty(key) && KEYS[key]) {
          data[KEYS[key]] = raw[key]
        }
      }

      res.locals[name] = data
      next()
    }

    if (typeof req.body === 'undefined') {
      // not use body-parser
      var body = []
      req.on('data', function (data) {
        body.push(data)
      })
      req.on('end', function (data) {
        done(qs.parse(body.join('')))
      })
    } else {
      done(req.body)
    }
  }
}

module.exports = API
