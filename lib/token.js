var https = require('https');
var later = require('later');
var fs = require('fs');
var appID = require('./config').appID;
var appSecret = require('./config').appSecret;


function getToken(){
	return new Promise(function(resolve,reject){
		var token = "";
		if (fs.existsSync('token.json')) {
			token = fs.readFileSync('token.json');
			resolve(JSON.parse(token));
		}else{
			var sched = later.parse.recur().every(2).hour();
			later.setInterval(getRequest,sched);
			getRequest();
			function getRequest(){
				var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appID+"&secret="+appSecret;
				https.get(url,function(res){
					var resdata = "";
					res.on('data',function(chunk){
						resdata += chunk;
					});
					res.on('end',function () {
						console.log("in token resdata ====:"+resdata);
						token = JSON.parse(resdata);
						fs.writeFileSync('token.json',resdata);
						resolve(token);
					});
				});
			}
		}

	});
}
module.exports = {
	getToken : getToken
}