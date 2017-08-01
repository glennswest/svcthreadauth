var coap        = require('coap');
var server      = coap.createServer();
var mqtt        = require('mqtt');
var util        = require('util');
var conv        = require('binstring');


var client  = mqtt.connect('mqtt://svcmqtt.ncc9.com');
client.on('connect', function(){
       console.log("Connected to mqtt\n");
       });

server.listen( { type: 'udp6' } );
server.on('request', function(req, res) {
  console.log(util.inspect(req));
  urlparts = req.url.split('/');
  switch(urlparts[1]){
     case 'device':
          topic = urlparts[2];
          console.log("Topic: " + topic);
          var message = req.payload.toString();
          console.log(conv(message, {in:'hex'}));
          client.publish(topic,message);
          break;
     case 'mqtt':
          topic = urlparts[2];
          console.log("Topic: " + topic);
          var message = req.payload.toString();
          console.log(conv(message, {in:'hex'}));
          client.publish(topic,message);
          break;
     default:
          console.log("Invalid Message: " + urlparts[1]);
          break;
     }
})


