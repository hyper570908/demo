var mqtt = require('mqtt');
var settings = require('../settings');

var hostname = '52.193.146.103';
var portNumber = 80;
var client_Id = '200000017-generic-service';
var name = '200000017';
var pw = '44554652';
var mytopic = 'client/200000017/200000017-GIOT-MAKER';

var options = {
	port:settings.gIotPort,
    host: settings.host,
    clientId:settings.client_Id,
    username:settings.name,
    password:settings.pw,
    keepalive: 60,
	reconnectPeriod: 1000,
	protocolId: 'MQIsdp',
	protocolVersion: 3,
	//clean: true,
	encoding: 'utf8'
};

var GIotClient = mqtt.connect(options);

module.exports = GIotClient;