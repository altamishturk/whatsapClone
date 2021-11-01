const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const messageFormet = require('./util/messages');
const { userJoin, getCurrentUser, leavedUser, getRoomUsers } = require('./util/users');

// this is tha port on whict our server is running 
const port = process.env.PORT || 3000;

// to use ststics files
app.use(express.static(path.join(__dirname, 'public')));

// creating server 
const server = http.createServer(app);



// using socket io 
const io = socketio(server);
io.on('connection', socket => {

    // join room  
    socket.on('join_room', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // this will broadcast only to one client 
        // welcome message to user
        socket.emit('message', messageFormet(user.username, 'WELCOME TO MY WHATSAP'));

        // this will broadcast to all the client except sender
        // when new user connected 
        socket.broadcast.to(user.room).emit('message', messageFormet(user.username, `HAS JOINED CHAT`));

        // to send information about room and users 
        io.to(user.room).emit('roomUsers',
            {
                room: user.room,
                users: getRoomUsers(user.room)
            });
    })



    // when user send message
    socket.on('chatMessage', message => {

        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', messageFormet(user.username, message));

    })

    // when user disconnect 
    socket.on('disconnect', () => {

        const user = leavedUser(socket.id);

        if (user) {
            // this will broadcast to everyone in that room
            io.to(user.room).emit('message', messageFormet(user.username, 'LEAVED THE CHAT'));

            // to send information about room and users 
            io.to(user.room).emit('roomUsers',
                {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
        }

    });


})





server.listen(port, () => {
    console.log(`your server is running at ${port} post`);
});