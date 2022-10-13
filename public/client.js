
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

            let data;                                                       // Optional:  needed to use data outside socket (see Section 4)
        

            socket.on('numberChannel', (foo) => {

                    // console.log(foo);                                    //un-comment to see in console   <===  SUCCESS!!!  HERE IS WHAT ALL YOUR HARD WORK WAS FOR

                    
                    // Optional:  needed to use data outside socket (see Section 4)
                        data = foo;

            });



// #endregion Receiving data from server.js


///////////////////    SECTION 3:  RECEIVING DATA FROM SERVER.JS [OBJECT]    ///////////////
// #region Receiving Data as an Object

        // Variables
            let fooObject;
            let dataObject;

    // #region Receiving data Object from server.js on socket.io channel 'objectChannel', 

            socket.on('objectChannel', function(fooObject) {
                
                        // console.log(fooObject);                                      // un-comment to see in browser


                // Optional:  needed to use data outside socket (see Section 4)    
                    dataObject = fooObject;

             });
             
// #region Receiving Data as an Object




///////////////////    SECTION 4:  RECEIVING DATA FROM SERVER.JS [OBJECT]    ///////////////
// #region using data *Outside* socket

    // note:  see comments at server.js, Section 7, for notes on why setInterval is used here


        // un-comment section to activate function

            // const logNumber = function (fooNumber) {
            //     console.log(data);                                                       // un-comment to see in browser console
            // }
            // setInterval(logNumber, 500);


        // un-comment section to activate function

            // const logObject = function (fooObject) {
            //     console.log(dataObject);                                               // un-comment to see in browser console
            // };
            // setInterval(logObject, 500);

            



// #endregion using data *Outside* socket