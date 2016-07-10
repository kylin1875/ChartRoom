var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile("index.html", {"root": __dirname});
});

var userNumber=1;
io.on('connection', function(socket){
	var myNumber = userNumber++;
	var myName = 'user#' + myNumber;
	
	socket.broadcast.emit('chat message', myName+' has connected');
	console.log(myName+ ' connected');
	socket.on('chat message', function(msg){
		io.emit('chat message',myName+" : "+msg);
	});	
	socket.on('disconnect', function(){
		socket.broadcast.emit('chat message',myName+' has disconnected');
		console.log(myName+ ' disconnected');
	});
});

var port = process.env.PORT || 3000;
http.listen(port, function(){ console.log('listening on *'+port);
});