const express = require('express');
const app = express();
const fs = require('file-system');
const bodyParser = require('body-parser');
let all_status = [];
let new_status;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/post/new",function(req,res){
	fs.readFile(__dirname + '/postform.html',null,function(err,data){
		if(!err){
			res.writeHead(200,{"Content-Type" : "text/html"});
			res.write(data);
			res.end();
		}
	})
})

app.post("/post/new",function(req,res){
	console.log(req["body"]["status"]);
	console.log(req["body"]["name"]);

	fs.readFile(__dirname + '/status.json',null,function(err,data){
		if(!err){
			all_status = JSON.parse(data);
			new_status = {
				[req["body"]["name"]]:req["body"]["status"]
			}
			all_status.push(new_status);

			fs.writeFile(__dirname + '/status.json',JSON.stringify(all_status),function(err){
				if(err){
					console.log(err);
				}
			})
		}
	})
})

app.get("/",function(req,res){
	fs.readFile(__dirname + '/status.json',function(err,data){
		if(!err){
			res.send(JSON.parse(data));
		}
	})
})

app.listen(3000,function(error){
	if(error == true){
		console.log("some error occurred");
	}else{
		console.log("listening on localhost:3000");
	}
})