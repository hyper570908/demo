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

// publish 'Hello mqtt' to 'test'
client.publish('mqtt', 'Hell Mqtt!');

// terminate the client
client.end();
