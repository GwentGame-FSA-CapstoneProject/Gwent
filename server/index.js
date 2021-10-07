const server = require('express')();
const http = require('http').createServer(server);
const cors = require('cors');

const io = require('socket.io')(http, {
    cors: {
        methods: ['GET', 'POST']
    }
});

server.use(cors());

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});