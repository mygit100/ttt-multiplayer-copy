const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

const db = require('./db');

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

io.on('connection', client => {
    client.on('join', name => {
        addPlayerToList(client.id);
        console.log(db);
    })
});

const addPlayerToList = (clientId) => {
    if(db.players.length > 2) return;

    db.players.push(clientId);
}

http.listen(port, function(){
  console.log('listening on *: ' + port);
});