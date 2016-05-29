var http = require('http');
var getToken = require('./token').getToken;
var https = require('https');
function getUserInfo(openID){
	return getToken().then(function(res){
		var token = res.access_token;
		return new Promise(function(resolve,reject){
			var url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token="+token+"&openid="+openID+"&lang=zh_CN";
			https.get(url,function(res){
				var resdata = "";
				var userInfo;
				res.on('data',function(chunk){
					resdata += chunk;
				});
				res.on('end',function(){
					// console.log("in user resdata======:"+resdata);
					userInfo = JSON.parse(resdata);
					resolve(userInfo);
				});
			});
		});
	});
}
module.exports  = {
	getUserInfo : getUserInfo
};