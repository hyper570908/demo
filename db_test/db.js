var mongoose = require( 'mongoose' );

mongoose.connect('mongodb://localhost/demo');

var userSchema = new mongoose.Schema({
    name:        { type: String},
	age:        { type: Number}
});

mongoose.model('User', userSchema);

var UserModel = mongoose.model('User');


var mUser = 'jason'; 
var userEntity = new UserModel({name:mUser,age:20});

console.log(userEntity.name);

userEntity.save(function(error){
	if(error){
		console.log('save fail!');
	}	
		console.log('save success!');
});

UserModel.find(function(err,users){
      //查询到的所有person
	  if(err){
		  console.log("查询到所有user err!\n")
	  }
	  console.log("查询到所有user");
	  console.log(users+"\n");
    });

UserModel.find({ name: mUser }, function(err,users){
      //查询到的所有person
	  if(err){
		  console.log("查詢到user "+mUser+" err!")
	  }
	  console.log("查詢到user "+mUser+" : "+users);
    });
	
	
	
