var http = require('http');
var ent = require('ent');
var fs = require('fs');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var users = [];
var url = "mongodb://localhost:8080/mydb";
var server = require("http").createServer(app);


app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/public/chat.html");
});
app.use(express.static('public'));
// Chargement de socket.io
var io = require('socket.io').listen(server);



// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {

	console.log("arrive");
    socket.emit('message', 'Vous êtes bien connecté !');

    socket.on('newUser', function (message) {
        console.log('new user' );
        users[message]=socket;
        socket["nom"]=message;
        socket["status"]="online";
        console.log(message+" est la");

    });	


    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log('Un client me parle ! cest  : '+message.msg );
    });	

    // message a qq
    socket.on('messageToSomeone', function (message) {
        date = new Date();
        current_hour = date.getHours();
        current_minute = date.getMinutes();
        hour = current_hour+" : "+current_minute;
	   	console.log("jai recu un message de qq : "+message.msg);
        if(message.dest in users){
            if(users[message.dest]["status"]=="online"){
                console.log("il est en ligne");
                users[message.dest].emit('messageToSomeone', {msg : message.msg, dest : message.dest, from : message.from, heure : hour});
            }
            else{
                console.log("Il n'est pas en ligne");
                fs.mkdir("waiting/"+message.dest,function(){
                    console.log("test");
                });
                fs.open('waiting/'+message.dest+'/'+message.from+'.json', 'w', function (err, file) {
                  if (err) throw err;
                  console.log(file);
                });
                contents = fs.readFileSync('waiting/'+message.dest+'/'+message.from+'.json');
                jsonContent = JSON.parse(contents);
                console.log(jsonContent);

            }
        users[message.dest].emit('endTyping', message.from);
        }
        
    });	

    //Quand qq écrit
    socket.on('typing', function (message) { 
        console.log(message.from+ " ecrit");
        if(message.dest in users)
         users[message.dest].emit('typing', message.from);
    });

    //Quand qq écrit
    socket.on('endTyping', function (message) { 
        console.log(message.from+ " fin ecriture");
         users[message.dest].emit('endTyping', message.from);
    });


    //Quand qq se déconnetce
    socket.on('disconnect', function () { 
        socket["status"]="offline";
        console.log(socket['nom']+" est parti");
    	console.log("deconnexion");
    	socket.emit('deconnecter');

    });
});


server.listen(8080);