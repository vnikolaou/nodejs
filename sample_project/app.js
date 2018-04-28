const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const mustache = require("mustache-express");
const mongo = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const mongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

//app.engine('html', mustache());
//app.set('view engine', 'html');
//app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); // important for handling json 

app.use(express.static(__dirname + "/public"));

app.get("/animals", function(req, res) {
	mongoClient.connect(url, function(error, client) {
		if(error) {
			console.log(error);
			res.json({err: error});
		} else {
			console.log("Connection to mongo is established");
			const db = client.db(dbName);
			let animals = db.collection("animals");
			animals.find({}).toArray(function(err, results) {
		  		if(err) {
					console.log(err);
					res.json({err: err});
				} else {
					res.json(results);
				}
				client.close();
			});
		}
	});
	//res.render("index");
});	


app.post("/animals", function(req,res) {
    mongoClient.connect(url, function(error, client) {
	if(error) {
			console.log(error);
			res.json({err: error});
	} else {
		console.log("Connection to mongo is established");
		const db = client.db(dbName);
		let animals = db.collection("animals");
		let params = req.body; // this is json object 
		animals.insert({species:params.species, weight:params.weight}, function(err, result){
          		if(err) {
				console.log(err);
				res.json({err: err});
			} else {
				console.log(JSON.stringify(result));
				res.json({id: result.ops[0]._id});
			}
			client.close();
		});
		
	}
	
    });
});


app.put("/animals/:id", function(req,res) {
    mongoClient.connect(url, function(error, client) {
	if(error) {
			console.log(error);
			res.json({err: error});
	} else {
		console.log("Connection to mongo is established");
		const db = client.db(dbName);
		let animals = db.collection("animals");
		let params = req.body; // this is json object 
		animals.update({_id:new ObjectId(req.params.id)}, {$set: {species: params.species, weight:params.weight}}, function(err, result){
          		if(err) {
				console.log(err);
				res.json({err: err});
			} else {
				console.log(JSON.stringify(result));
				res.json({id: req.params.id});
			}
			client.close();
		});
		
	}
	
    });
});

app.delete("/animals/:id", function(req,res) {
    mongoClient.connect(url, function(error, client) {
	if(error) {
			console.log(error);
			res.json({err: error});
	} else {
		console.log("Connection to mongo is established");
		const db = client.db(dbName);
		let animals = db.collection("animals");
		let params = req.body; // this is json object 
		animals.remove({_id:new ObjectId(req.params.id)}, function(err, result){
          		if(err) {
				console.log(err);
				res.json({err: err});
			} else {
				console.log(JSON.stringify(result));
				res.json({id: req.params.id});
			}
			client.close();
		});
		
	}
	
    });
});

app.listen(3000, function(err) {
	if(err) {
		console.log("An error occured");
	} else {
		console.log("The app is listening now on 3000");
	}
});



