var coap        = require('coap');
var server      = coap.createServer();
var mqtt        = require('mqtt');
var util        = require('util');

server.on('request', function(req, res) {
  console.log(util.inspect(req));
  res.end('Hello ' + req.url.split('/')[1] + '\n')
})

// the default CoAP port is 5683
server.listen(function() {
  var req = coap.request('coap://localhost/device/temperature')

  req.on('response', function(res) {
    res.pipe(process.stdout)
    res.on('end', function() {
      process.exit(0)
    })
  })

  req.end()
})

