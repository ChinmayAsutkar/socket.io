import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express(); 
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A new user connected:', socket.id);

    socket.on('user-message', (msg) => {
        console.log('message to backend :', msg);
    });
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

server.listen(9000, () => console.log('Server started on port 9000'));
