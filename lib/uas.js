/**
 * @file uas.js
 */

/** @private */
var API = require('./api')

/** @private */
var ENDPOINT = require('./endpoint')

/**
 * @class 본인인증서비스 APIs
 * @constructs UAS
 * @param {objects} opts
 * @param {string} opts.client_id
 * @param {string} opts.client_secret
 * @param {string} opts.redirect_uri
 * @param {string} [opts.charset] defaults: `UTF-8`
 * @param {string} [opts.agelimit]
 */
var UAS = function (opts) {
  /**
   * options
   * @member options
   * @memberof UAS.prototype
   * @private
   * @type {object}
   */
  this.options = {}

  opts = opts || {}

  // check mandatory
  API.mandatory(['client_id', 'client_secret', 'redirect_uri'], opts)

  // init
  opts.service = 'UAS'
  opts.authtype = '36'

  this.options = opts
  this.redirect_uri = {
    basic: ENDPOINT.UAS_REDIRECT,
    mobile: ENDPOINT.UAS_REDIRECT_MOBILE
  }

  /**
   * api instance
   * @member api
   * @memberof UAS.prototype
   * @type {API}
   */
  this.api = new API(ENDPOINT.UAS, opts)
}

/**
 * request tid
 * @method request
 * @memberof UAS.prototype
 * @param {string} opts.userid
 * @param {string} opts.token
 * @param {string} [opts.redirect_uri]
 * @param {Function} cb
 */
UAS.prototype.request = function (opts, cb) {
  API.mandatory(['userid', 'token'], opts)

  // fixed
  opts.txtype = 'ITEMSEND'

  return this.api.request({
    data: opts
  }, cb)
}

/**
 * final step authentication - Verify authentication information using an `tid` value
 * @method confirm
 * @memberof UAS.prototype
 * @param  {object} opts
 * @param  {string} opts.tid
 * @param  {number} [opts.idenoption] return value type - 0: `iden`, 1: `dateofbirth`, `gender`
 * @param  {string} [opts.token] token string
 * @param  {Function} cb
 */
UAS.prototype.confirm = function (opts, cb) {
  API.mandatory(['tid'], opts)

  opts.txtype = 'CONFIRM'
  opts.idenoption = opts.idenoption || 1

  if (typeof opts.token !== 'undefined') {
    opts.confirmoption = 1
  }

  return this.api.request({
    data: opts
  }, cb)
}

/**
 * return middleware for redirect
 * @method redirect
 * @memberof UAS.prototype
 * @param {string} [name] key name of res.locals for the data transfer. (default: `uas`)
 * @param {string} [redirect_uri] landing url for uas
 * @return {function} express middleware
 */
UAS.prototype.redirect = function (name, redirect_uri) {
  return this.api.redirect(name || 'uas', redirect_uri || this.redirect_uri)
}

/**
 * return middleware for receive
 * Setting the received data to the specified res.locals.`name`
 * @method receive
 * @memberof API.property
 * @param {string} name key name of res.locals for the data transfer. (default: `uas`)
 * @return {function} express middleware
 */
UAS.prototype.receive = function (name) {
  return this.api.receive(name || 'uas')
}

module.exports = UAS
