var mosca = require('mosca');
var MqttServer = new mosca.Server({
    port: 8000
});

MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
});

/**
 * 监听MQTT主题消息
 **/
MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;	
    switch(topic){
	case 'pubMsg':
	    console.log('message-publish', packet.payload.toString());
	    //MQTT转发主题消息
	    MqttServer.publish({topic: 'other', payload: 'sssss'});
	    //发送消息NODEJS
	    //console.log('HD: '+ YHSocketMap.get('1000'));
	    //发送socket.io消息
	    //io.sockets.socket(YHSocketMap.get('1000')).emit('subState', packet);
	break;
	case 'other':
	    console.log('message-123', packet.payload.toString());
	break;
    }
});

MqttServer.on('ready', function(){
    console.log('mqtt is running...');
});