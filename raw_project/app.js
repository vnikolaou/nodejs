const http = require("http");
const fs = require("file-system");

http.createServer(function(req,res) {
	try {
		let file = fs.readFileSync("." + req["url"] + ".txt", "utf8");
		res.write(file);
	} catch(err) {
		if(err) {
			res.write("404 file not found");
		}
	}
	res.end();
}).listen(3000);
