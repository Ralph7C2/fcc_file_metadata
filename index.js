const express = require('express');
const multer = require('multer');

var upload = multer({dest : 'uploads/'}).single('file');

var app = express();

app.use(express.static('public'));

app.post('/get-file-size', function(req, res) {
	upload(req, res, function(err) {
		if(err) {
			console.log(err);
		} 
		if(req.file) {
			res.json({size: req.file.size});
		} else {
			res.json({error:"Error"});
		}
	});	
});

var port = process.env.PORT || 4040;
app.listen(port, function() {
	console.log("Ready to rock on port "+port);
});