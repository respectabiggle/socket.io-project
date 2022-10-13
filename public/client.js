
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

    // #region Receiving data from server.js on socket.io channel 'numberChannel', 
    // & logging data

    // Optional:  setting up to use Data outside socket (see Section 4)
        let data;               
    

        socket.on('numberChannel', (foo) => {

            // Logging Data as a NUMBER from Inside Socket
                // console.log(foo);                                    //un-comment to see in browser console

                
            // Optional:  setting up to use Data outside socket (see Section 4)
                data = foo;

        });




    // #endregion Receiving data from server.js on socket.io channel 'numberChannel'






///////////////////    SECTION 3:  RECEIVING DATA FROM SERVER.JS [OBJECT]    ///////////////


    // #region Binance Data As OBJECT - all works except: must destructure obj inside socket (as it seems)

        // Variables
            let fooObject;
            let test0;
            let test1;
            let test2;
            let test3;
            let test4;
            let test5;

        // #region Receiving & Logging Binance Data from Server
            socket.on('objectChannel', function(fooObject) {
                
                // #region Logging Data AS AN OBJECT from Inside Socket - all below works

                    // console.log(fooObject);                                      // works, still an object
                    
                //     test0 = fooObject;

                //     test1 = (fooObject.binanceFloat);
                //     // console.log(test1);

                //     test2 = (fooObject.objNum);
                //     // console.log(test2);

                //     test3 = (test1 * 5);
                //     // console.log(test3);

                //     test4 = (test2 * 7);
                //     // console.log(test4);

                //     test5 = fooObject.binanceFloat * fooObject.objNum;
                //     // console.log(test5);

                // // #endregion Logging Data from Inside Socket
 
            });

            // #region Logging Data AS OBJECT from Outside Socket - works
                // const logObject = function (fooObject) {
                //     // console.log(fooObject);                      // does not work
                //     // console.log(test0);                          // wooooooooooorks
                //     // console.log(test1);                          // works
                //     // console.log(test2);                          // WORKS!
                //     // console.log(test3);                          // WORKS!
                //     // console.log(test4);                          // wooooorks
                //     // console.log(test5);                          // works fucker
                // }
                // setInterval(logObject, 500);
            // #endregion Logging Data AS AN OBJECT from Outside Socket

    // #endregion Binance Data as an OBJECT


// #region using data *Outside* socket

    // const logNumber = function (fooNumber) {
    //     // console.log(data);                                    // un-comment to see in browser console
    // }
    // setInterval(logNumber, 500);

// #endregion Logging Data as a NUMBER from Outside Socket




    // #endregion Receiving & Logging Binance Data from Server

// #endregion Binance Socket