///////////////////   SECTION 1:  EXPRESS  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #region
const express = require('express');
const app = express();
const server = require('http').createServer(app);   // OR
server.listen(3511, () => console.log("Express running! on port 3511")); 
app.use(express.static('public'));
// #endregion

///////////////////    SECTION 2:  SOCKET.IO - INTERNAL WEBSOCKET - (using Express server to connect server.js and client.js)   ///////////////////////////////////
// #region Socket.io Express Server

        // Settin up Socket.io Express Server
        const { Server } = require('socket.io'); 
        const io = new Server(server);                      // socket.io is using the same server that was created by Express (don't know if I'm saying this right)
                                                            // iirc, this works because "Express is using the http protocol, and socket.io is using the wss protocol"


        // Instantiating? Socket.io Express Server
        io.on('connection', (socket) => { 


        // Demonstrating that server.js and client.js are connected.  
        // See also console in the browser

            // Confirm Client Connected, Version 1
                console.log('a user connected');
                socket.on('disconnect', () => {
                    console.log('user disconnected');
                });

            // Confirm Client Connected, Version 2
                socket.on('hello test', (msg) => {
                    console.log('message: ' + msg);
                });

                socket.emit('hello test', 'Hi from Server :))');
                        
        });

// #endregion Socket.io Express Server


///////////////////    SECTION 3:  WS - EXTERNAL WEBSOCKET - (connecting to external source using the "ws" library)    ////////////////////////////////////////////
// #region External Websocket

// creating a new Websocket - to connect to External Data source 
    const { WebSocket } = require('ws');
    const externalClient = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
    
// #endregion External Websocket


///////////////////    SECTION 4:  PROCESSING THE DATA RECEIVED FROM THE EXTERNAL WEBSOCKET    ////////////////////////////////////////////////////////////////////
// #region Processing the data

// Variable for:  sending simple data from External Websocket to client.js 

    let data;               // we will use both within, but also outside the "externalClient.on" function,
                            // so we're declaring it outside the function


// Variables for: Optional Case Example - see Section 6 below - if we want to send multiple values together as an object to client.js 
// #region
    let externalDataInAnObject;                         // we may want the option to use these variables at another time outside the "externalClient.on" function,
    let exampleVariable = 11;                                    // so we're declaring them here
// #endregion


// the Websocket we named "externalClient" is triggered whenever
// our External Websocket receives new data from the source (wss://stream.binance.com..etc)

    externalClient.on('message', (event) => {


    // Receiving Data from the External Websocket, and Extracting and Processing Desired Value from Data 

        externalData = (event);                                             // this returns the data as a Buffer of raw binary data.  this is not what we want
        // console.log(externalData);                                       // un-comment to see
                                                                            // ref:  https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/
                                                                            // ref:  https://stackoverflow.com/a/69485504/19651059

        externalDataParsed = JSON.parse(event);                             // JSON.parse turns the data into a JSON object that we can deal with
                                                                            // however, the data is an array of key:value pairs.
                                                                            //  we may only be interested in one of the values
        // console.log(externalDataParsed);                                 // un-comment to see

        externalDataExtractedValue = parseFloat(externalDataParsed.p)       // we can extract the desired value from data
                                                                            // in this case, the desired key is "p" (price)
                                                                            // important note: at this point p is still a number, however, see next
        // console.log(externalDataExtractedValue);                         // un-comment to see


        externalDataExtractedValueFixed = parseFloat(externalDataParsed.p).toFixed(2);              // for some reason, .toFixed(2) turns the value for p into a string
        // console.log(typeof externalDataExtractedValueFixed);                                     // un-comment to see
        
        externalDataExtractedValueFixedAsFloat = parseFloat(externalDataExtractedValueFixed);            // so we re-convert the value to a (floating-point) number
        // console.log(externalDataExtractedValueFixedAsFloat);                                          // un-comment to see

        data = externalDataExtractedValueFixedAsFloat;                      // and finally, we rename this to make it easier to deal with
        // console.log(data);                                               // un-comment to see



// #endregion Processing the data


///////////////////    SECTION 5:  SOCKET.IO - INTERNAL WEBSOCKET - (passing data along internal websocket, from server.js to client.js )  ////////////////////////
// #region Passing a Number as Data

    // we use socket.io's "emit" method 
    // we will create a socket.io channel named 'numberChannel' 
    // it can now be "heard" at client.js, on a channel there with the same name

         io.emit('numberChannel', data);                              


// #endregion Passing Data


///////////////////    SECTION 6:  SOCKET.IO - INTERNAL WEBSOCKET - (passing AN OBJECT along internal websocket, from server.js to client.js )  ///////////////////
// #region Passing an Object as Data

    // in some scenarios, we may want to send a multiple values at the same time, on the same channel, from server.js to client.js
    // we can bundle them into a JSON object and pass the whole object via the internal stream

    // for this purpose, we will create a new, separate socket.io channel named 'objectChannel'
    
        // because client.js will need to handle the incoming stream differently -- 
        // it will be expecting an object, consisting of key-value pairs


            // Building the object, which includes the "data", above, plus another imaginary value   
                externalDataInAnObject = { data, exampleVariable }; 

            // emitting the object 
                io.emit('objectChannel', externalDataInAnObject); 



});

// #endregion Passing an Object as Data
 

///////////////////    SECTION 7:  OPTIONAL:  PASSING DATA FROM *OUTSIDE* THE "EXTERNALCLIENT.ON" FUNCTION  ///////////////////////////////////////////////////////
// #region  working with "data" outside the main function

    // #region Explanation and Justification

    // Here I demonstrate that "data" is available outside the "externalClient.on" function.

        // The value of "data" is refreshed constantly.
        // You can call on "data" elsewhere in the program and it will be updated/current/refreshed

        
            // However, to send it to client.js,
            // unless you have a trigger to push data down the stream, such as .on('message') (Section 4)
            // the data will only be sent to the client once        
            
            // Solution:  you can set up a different method of "pushing" the data with the setInterval() method


    // #endregion Explanation and Justification


            // const sendDataToClient = function (){                    // uncomment this entire section - lines 160-167 - to see/use the function 

            //     io.emit('numberChannel', data);
                
                //     // console.log(data);                            // uncomment to see that the value of "data" is being refreshed      
            
                // };
            // setInterval(sendDataToClient, 500);


    // Note - this method of pushing data may be chosen for number of reasons, amongst which:
        // using this method this may or may not save network resources (depending on Interval frequency), 
        // compared to an always-open stream
        // I honestly don't know



// #endregion -  working with "data" outside the main function

