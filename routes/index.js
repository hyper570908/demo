var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var mqtt = require('mqtt');

var hostname = 'localhost';
var portNumber = 1884;
var mytopic= 'mqtt';
var mUsers;

var options = {
	port:portNumber,
    host: hostname,
	protocolId: 'MQIsdp',
	protocolVersion: 3
};


/* 1 */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

/* 2 */
module.exports = function(app) {
  app.get('/', function (req, res) {
		res.render('index', { title: '首頁', 
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
  });
  app.get('/post', function (req, res) {
	console.log('render to post.ejs');
	res.render('post', { title: '推播',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
  });

  app.post('/post', function (req, res) {
	var	 post_name = req.body.name,
		 post_age  = req.body.age;
	
	var message = '{"name":"'+post_name+'","age":"'+post_age+'"}';
	console.log('message:'+message);
	
	var client = mqtt.connect(options);

	// publish 'Hello mqtt' to 'test'
	client.publish(mytopic, message);

	// terminate the client
	client.end();
	req.flash('success', '新增成功!');
	return res.redirect('/');
  });

  app.get('/find', function (req, res) {
	console.log('render to post.ejs');
	var find_name = req.flash('name').toString();
	var find_age = req.flash('age').toString();
	var successMessae,errorMessae;
	console.log('查詢 name:'+find_name);
	console.log('查詢 age:'+find_age);
	
	if(find_name.length>0){
		console.log('find_name.length>0');
		UserModel.find({ name: find_name }, function(err,users){
			//查詢到的所有user
			if(err){
				console.log('查詢錯誤');  
				req.flash('error', err);
				return res.redirect('/find');
			}
			console.log("查詢到user "+find_name+" : "+users);
			users.forEach(function(user) {
				console.log('name:'+user.name + ', age :' +user.age);
			});
	  
			if (users.length>0) {
				console.log('查詢到'+users.length+'筆資料');
				successMessae = '查詢到'+users.length+'筆資料';
			}else{
				console.log('查無資料');
				errorMessae = '查無資料';
				req.flash('error', err);
      			return res.redirect('/find');
	  		}
	  		res.render('find', { title: '查詢',
					datas: users,
					success: successMessae,
					error: errorMessae
	  		});
    	});
	}else{
		console.log('find_name.length=0');
		res.render('find', { title: '查詢',
			datas: null,
			success: successMessae,
			error: errorMessae
	  });
	}
	
	
  });
  app.post('/find', function (req, res) {
	var	 post_name = req.body.name,
		 post_age  = req.body.age;

	console.log('find name:'+post_name);
	console.log('find age:'+post_age);

	req.flash('name', post_name);
	req.flash('age', post_age);
	return res.redirect('/find');
  });
};