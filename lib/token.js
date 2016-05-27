var https = require('https');
var later = require('later');
var fs = require('fs');
var appID = require('./config').appID;
var appSecret = require('./config').appSecret;
function getToken(){
	return new Promise(function(resolve,reject){
		var token = "";
		//先判断token.json是否存在
		if (fs.existsSync('./token.json')) {
			token = JSON.parse(fs.readFileSync('./token.json'));
		}else{
			later.date.localTime();
			var sched = later.parse.recur().every(2).hour();
			var timer = later.setInterval(startRequest,sched);
			setTimeout(startRequest,2000);
		} 
		resolve(token); 
	});
	function startRequest(){
		var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appID+"&secret="+appSecret;
		https.get(url,function(res){
			var resdata = "";
			res.on('data',function(chunk){
				resdata += chunk;
			});
			res.on('end',function(){
				fs.writeFileSync('token.json',resdata);
			});
		});
	}
}

module.exports = {
	getToken : getToken
}