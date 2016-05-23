var wxPort = require('./lib/config').wxPort;
var express = require('express');
var checkSignature = require('./utils/checkSignatureUtil');
var app = express();

//设置静态文件路径
app.use(express.static(__dirname + '/client'));

app.use(function(req,res){
	console.log("1111");
	console.log(req.query);
	if (req.method == 'GET') {
		console.log("222");		
		//get方法
		if (req.body.signature) {
			//微信验证
			
		}else{
			console.log("333");
			//网页接入			
			res.sendFile(__dirname + '/client/index.html');	
		}
	}else{
		//post方法
	}
});

app.listen(wxPort,function(){
	console.log('app is running at port : ' + wxPort);
});