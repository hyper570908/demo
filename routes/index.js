var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var LocalClient =  require('../models/localClient.js');
var settings = require('../settings');

module.exports = function(app) {
  app.get('/', function (req, res) {
		res.render('index', { title: '首頁', 
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
  });

  app.get('/update', function (req, res) {
	UserModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, user) {
		console.log( "last record : "+user );
		res.render('update', { title: '更新',
			user: user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	
  });  

  app.get('/post', function (req, res) {
	console.log('render to post.ejs');
	res.render('post', { title: '上傳',
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
	
	LocalClient.publish(settings.mytopic, message);
	LocalClient.end();
	req.flash('success', '上傳完成!');
	return res.redirect('/');
  });

  app.get('/find', function (req, res) {
	console.log('render to post.ejs');
	var find_name = req.flash('name').toString();
	var find_age = req.flash('age').toString();
	var successMessae,errorMessae;
	console.log('name:'+find_name);
	console.log('age:'+find_age);
	
	if(find_name.length>0){
		console.log('find_name.length>0');
		UserModel.find({ name: find_name }, function(err,users){
			if(err){
				console.log('find name:'+find_name);  
				req.flash('error', err);
				return res.redirect('/find');
			}
			console.log("find all of user "+find_name+" : "+users);
			users.forEach(function(user) {
				console.log('name:'+user.name + ', age :' +user.age);
			});
	  
			if (users.length>0) {
				console.log('find '+users.length+' records');
				successMessae = '找到'+users.length+'筆資料';
				res.render('find', { title: '查詢',
					datas: users,
					success: successMessae,
					error: errorMessae
				});
			}else{
				console.log('找不到資料!');
				errorMessae = '找不到資料!';
				req.flash('error', err);
      			return res.redirect('/find');
	  		}
	  		
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