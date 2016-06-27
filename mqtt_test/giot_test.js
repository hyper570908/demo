var mqtt = require('mqtt');

var hostname = '52.193.146.103';
var portNumber = 80;
var client_Id = '200000107-generic-service';
var name = '200000107';
var pw = '09255143';
var mytopic = 'client/200000107/200000107-GIOT-MAKER';
var settings = require('../settings');

var options = {
    port:portNumber,
    host: hostname,
    clientId:client_Id,
    username:name,
    password:pw,
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    //clean: true,
    encoding: 'utf8'
};


var client = mqtt.connect(options);


client.on('connect', function()  {
	console.log('Connect to mqtt topic:'+mytopic);
  	client.subscribe(mytopic);
});

client.on('message', function(topic, message) {
	console.log('topic:'+topic.toString());
  	if(topic == mytopic) {
    		console.log('message:'+message.toString());
    		var obj = JSON.parse(message);
         	console.log('macAddr:'+obj.macAddr+', data:'+obj.data + '>> receive time : '+obj.recv);
         
         }
});

