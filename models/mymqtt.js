var mqtt = require('mqtt');
function Mymqtt(user){
	this.name = user.name,
	this.age = user.age
};

module.export = Mymqtt;

var hostname = 'localhost';
var portNumber = 1884;
var mytopic= 'mqtt';
var options = {
    port:portNumber,
    host: hostname,
	protocolId: 'MQIsdp',
	protocolVersion: 3
};


Mymqtt.sub = function (){
	var client1 = mqtt.connect(options);
	client1.on('connect', function()  {
		console.log('Connect to mqtt topic:'+mytopic);
		client.subscribe(mytopic);
	});

	client1.on('message', function(topic, message) {
		console.log('topic:'+topic.toString());
		console.log('message:'+message.toString());
		return message.toString();
	});
};

Mymqtt.pub = function (){
	// publish 'Hello mqtt' to 'test'
	var client = mqtt.connect(options);
	var message = { 
					name:this.name,
					age:thhi.sag
				  }; 
	client.publish(mytopic, message);

	// terminate the client
	client.end();
};