const express = require('express');
const multer = require('multer');
const fs = require('fs');

var upload = multer({dest : 'uploads/'}).single('file');

var app = express();

app.use(express.static('public'));

app.post('/get-file-size', function(req, res) {
	upload(req, res, function(err) {
		if(err) {
			console.log(err);
		} 
		if(req.file) {
			console.log(req.file.path);
			var size = req.file.size;
			fs.stat(req.file.path, function(err, stats) {
				if(err) return console.log(err);
				fs.unlink(req.file.path, function(err) {
					if(err) return console.log(err);
				});
			});
			res.json({size: size});
		} else {
			res.json({error:"Error"});
		}
	});	
});

var port = process.env.PORT || 4040;
app.listen(port, function() {
	console.log("Ready to rock on port "+port);
});