var https = require('https');
var later = require('later');
var fs = require('fs');
var appID = require('./config').appID;
var appSecret = require('./config').appSecret;
function getToken(){
	return new Promise(function(resole,reject){
		var token = "";
		//先判断token.json是否存在
		if (fs.existsSync('./token.json')) {
			token = JSON.parse(fs.readFileSync('./token.json'));
		}else{
			
		}
	});
}

module.exports = {
	getToken : getToken
}