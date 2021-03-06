var http = require('http');
var util = require('util');

/**
 * Formats an http.IncomingMessage like curl does
 * @param {http.IncomingMessage}
 * @param {Array.<Buffer>} body
 * @returns {String}
 */

exports.request = function (req, body) {
  var out = util.format('< %s %s HTTP/%s\n',
    req.method,
    req.url,
    req.httpVersion);

  Object.keys(req.headers).forEach(function (name) {
    out += util.format('< %s: %s\n', name, req.headers[name]);
  });

  if (body.length && body.length > 0) {
      out += '< Body: \n';
      var bodyString = '';
      body.forEach(function(data) {
        bodyString += data.toString();
      });
  
      out += decodeURIComponent(bodyString) + '\n';
  }

  return out + '<';
};

/**
 * Formats an http.ServerResponse like curl does
 * @param {http.ServerResponse}
 * @returns {String}
 */

exports.response = function (req, res) {
  var out = util.format('> HTTP/%s %s %s\n',
    req.httpVersion,
    res.statusCode,
    http.STATUS_CODES[res.statusCode]);

  Object.keys(res._headers).forEach(function (name) {
    out += util.format('> %s: %s\n', name, res._headers[name]);
  });

  return out + '>';
};
