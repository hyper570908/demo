var mqtt = require('mqtt');
var settings = require('../settings');

var hostname = settings.host;
var portNumber = settings.myport;
var mytopic= settings.mytopic;;

var options = {
	port:portNumber,
    host: hostname,
	protocolId: 'MQIsdp',
	protocolVersion: 3
};

var LocalClient = mqtt.connect(options);

module.exports = LocalClient;