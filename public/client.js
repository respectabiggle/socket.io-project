

    // IMPORTANT  do not forget to add to the <body> of index.html:        <script src="../socket.io/socket.io.js"></script>       



///////////////////   SECTION 1:  SETTING UP SOCKET.IO INTERNAL WEBSOCKET  IN CLIENT.JS    /////////////////////
// #region Setting up internal socket.io websocket 


    // Initializing socket.io client
    const socket = io();


    // #region Demonstrating that server.js and client.js are connected
        // See also console in the browser
        //  Testing "Hi"
            socket.emit('hello test', "Hi from Client :)");

            socket.on('hello test', function(helloThere) {
                console.log(helloThere);
            });

    //#endregion Demonstrating that server.js and client.js are connected


// #endregion Setting up internal socket.io websocket 


///////////////////    SECTION 2:  RECEIVING DATA FROM SERVER.JS [SINGLE NUMBER]    ///////////////
// #region Receiving Data as a Number

    // #region Receiving data from server.js on socket.io channel 'numberChannel', 

            let dataNumber;                                                       // Optional:  needed to use data outside socket (see Section 4)
        

            socket.on('numberChannel', (fooNumber) => {

                    // console.log(fooNumber);                                    //un-comment to see in console   <===  SUCCESS!!!  HERE IS WHAT ALL YOUR HARD WORK WAS FOR

                    
                    // Optional:  needed to use data outside socket (see Section 4)
                        dataNumber = fooNumber;

            });



// #endregion Receiving data from server.js


///////////////////    SECTION 3:  RECEIVING DATA FROM SERVER.JS [OBJECT]    ///////////////
// #region Receiving Data as an Object

        // Variables

            let dataObject;

    // #region Receiving data Object from server.js on socket.io channel 'objectChannel', 

            socket.on('objectChannel', function(fooObject) {                
                        // console.log(fooObject);                                      // un-comment to see in browser

                // Optional:  needed to use data outside socket (Section 4)    
                    dataObject = fooObject;
             });
             
// #region Receiving Data as an Object




///////////////////    SECTION 4:   USING "DATA" OUTSIDE THE SOCKET.IO CHANNEL    ///////////////
// #region using data *Outside* socket

    // note:  see comments at server.js, Section 7, for notes on why setInterval is used here


        // un-comment section to activate function

                    // const logNumber = () => {
                    //     console.log(dataNumber); 
                    // };
                    // setInterval(logNumber, 500);


        // un-comment section to activate function

                // const logObject = () => {
                //     console.log(dataObject);  
                // };
                // setInterval(logObject, 500);


            



// #endregion using data *Outside* socket