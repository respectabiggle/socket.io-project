
const express = require('express');
const app = express();
const server = require('http').createServer(app); 
server.listen(3513, () => console.log("Express running! on port 3513")); 
app.use(express.static('publicsupersimplified'));


const { Server } = require('socket.io'); 
const io = new Server(server);      


const { WebSocket } = require('ws');
const externalClient = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

    externalClient.on('message', (event) => {

        let parse = JSON.parse(event); 
        let data = parseFloat(parse.p)
        // console.log(data)                        
        io.emit('numberChannel', data);   

    });
