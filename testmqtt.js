var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://svcmqtt.ncc9.com');
 
client.on('connect', function () {
  client.subscribe('temperature')
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log("Topic = " + topic + "Message = " + message.toString());
})

