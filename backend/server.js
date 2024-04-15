const app = require('express')();
const server = require('http').createServer(app);
const { server } = require('socket.io');

const io = new Server(server);
io.on('connection', (socket) => { 
    console.log("User Connected") });

const port = process.env.PORT || 5000;
server.listen(port, ()=>
console.log("Server running on http://localhost:5000"));