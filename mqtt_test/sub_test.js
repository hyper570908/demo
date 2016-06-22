var mqtt = require('mqtt');
var hostname = 'localhost';
var portNumber = 1884;
var mytopic= 'mqtt';
var options = {
    port:portNumber,
    host: hostname,
	protocolId: 'MQIsdp',
	protocolVersion: 3
};

var client = mqtt.connect(options);

client.on('connect', function()  {
	console.log('Connect to mqtt topic:'+mytopic);
  	client.subscribe(mytopic);
});

client.on('message', function(topic, message) {
	console.log('topic:'+topic.toString());
	console.log('message:'+message.toString());
});
