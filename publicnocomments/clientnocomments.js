
    // IMPORTANT  do not forget to add to the <body> of index.html:        <script src="../socket.io/socket.io.js"></script>   


const socket = io();


                // socket.on('hello test', function(helloThere) {
                //     console.log(helloThere);
                // });
                // socket.emit('hello test', "Hi from Client :)");
            


    socket.on('numberChannel', (fooNumber) => {
        // console.log(fooNumber);                                            // <==  THIS IS WHAT YOU ARE LOOKING FOR
        dataNumber = fooNumber;
    });


    socket.on('objectChannel', function(fooObject) {
        // console.log(fooObject);
        dataObject = fooObject;
    });




    // OPTIONAL FUNCTIONS

        let dataNumber;   
        // const logNumber = () => {
        //     console.log(dataNumber); 
        // };
        // setInterval(logNumber, 500);



        let dataObject;
        // const logObject = () => {
        //     console.log(dataObject);  
        // };
        // setInterval(logObject, 500);

