require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

//error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

//start server
app.listen(process.env.PORT, () => console.log(`Server started at port:  ${process.env.PORT}`));

//Websockets
const socketIO = require('socket.io');
const http = require('http');
const serveSocket = http.createServer(app);
const io = socketIO(serveSocket);

// io.emit('some event', { for: 'everyone' });

io.on('connection', (socket) => {
    // io.emit('response', {username: socket.handshake.query.name, message: " has joined the channel."});
    socket.on('message', (message) =>{
        io.emit('response', message);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected'); 
    });
})

serveSocket.listen(3001, __ =>{
    console.log('Socket.io port listening on: 3001');
});

