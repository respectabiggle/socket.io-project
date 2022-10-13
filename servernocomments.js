
const express = require('express');
const app = express();
const server = require('http').createServer(app); 
server.listen(3512, () => console.log("Express running! on port 3512")); 
app.use(express.static('publicnocomments'));



const { Server } = require('socket.io'); 
const io = new Server(server);         


    // io.on('connection', (socket) => { 
    //         console.log('a user connected');
    //         socket.on('disconnect', () => {
    //             console.log('user disconnected');
    //         });
    //         socket.on('hello test', (msg) => {
    //             console.log('message: ' + msg);
    //         });
    //         socket.emit('hello test', 'Hi from Server :))');      
    // });


const { WebSocket } = require('ws');
const externalClient = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

    let data;
    let externalDataInAnObject;  
    let exampleVariable = 11;

    externalClient.on('message', (event) => {

    externalData = (event); 
    externalDataParsed = JSON.parse(event); 
    externalDataExtractedValue = parseFloat(externalDataParsed.p)
    externalDataExtractedValueFixed = parseFloat(externalDataParsed.p).toFixed(2); 
    externalDataExtractedValueFixedAsFloat = parseFloat(externalDataExtractedValueFixed);    
    data = externalDataExtractedValueFixedAsFloat;

    io.emit('numberChannel', data);                              

        // letexternalDataInAnObject = { data, exampleVariable }; 
        // io.emit('objectChannel', externalDataInAnObject); 

    });


        // const sendDataToClient = function (){  
        //     io.emit('numberChannel', data);
        // };
        // setInterval(sendDataToClient, 500);
