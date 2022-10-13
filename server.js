
const express = require('express');
const app = express();
const server = require('http').createServer(app); 
server.listen(3000, () => console.log("Express running! on port 3000")); 
app.use(express.static('public'));


const { Server } = require('socket.io'); 
const io = new Server(server);       


const { WebSocket } = require('ws');
const client = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    client.on('message', (event) => {

        let parse = JSON.parse(event); 
        let data = parseFloat(parse.p)
        // console.log(data)                        
        io.emit('channel1', data);   

    });
