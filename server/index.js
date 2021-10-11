const express = require('express')
const app = require('express')();
const cors = require('cors');
const path = require('path');


// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('*', (req, res)=> res.sendFile(path.join(__dirname, '..', 'dist/index.html')));

// app.use(cors());

const server = app.listen(5000, function () {
    console.log('Server started at port 5000!');
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
    });
});
