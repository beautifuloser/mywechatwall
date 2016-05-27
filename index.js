var wxPort = require('./lib/config').wxPort;
var token = require('./lib/config').token;
var express = require('express');
var qs = require('qs');
var url = require('url');
var http = require('http');
var xml2js = require('xml2js');
var socketio = require('socket.io');
var getUserInfo = require('./lib/user').getUserInfo;
var checkSignature = require('./utils/checkSignatureUtil').checkSignature;

var app = express();
//验证微信服务器
app.use(function(req,res,next){
	var query = url.parse(req.url).query;
	var params = qs.parse(query);
	if (req.method == 'GET'&& params.signature) {
		if (!checkSignature(params,token)) {
			return false;
		}else{
			res.end(params.echostr); 
		}
	}else{
		next();
	}
});
//设置静态文件路径
app.use(express.static(__dirname + '/client'));
app.use(function(req,res){
	if (req.method == 'GET') {
		res.sendFile(__dirname + '/client/index.html');	
	}else{
		var query = url.parse(req.url).query;
		var params = qs.parse(query);
		//验证消息是否来自微信服务器
		if (checkSignature(params,token)) {
			var postData = "";
			req.addListener("data",function(chunk){
				postData += chunk;
			});
			req.addListener("end",function(){
				var parseString = xml2js.parseString;
				parseString(postData,function(err,result){
					if (!err) {
						getUserInfo(result.xml.FromUserName[0]).then(function(userInfo){
							result.userInfo = userInfo;
						});
					}
				});
			});
		}
	}
});
var server = http.createServer(app);
//socketio
var io = socketio.listen(server);
io.on('connection',function(){

});
server.listen(wxPort);
console.log("the server is listen at port :"+wxPort);


























