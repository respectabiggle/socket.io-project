const socket = io();

socket.on('channel1', (foo) => {
    console.log(foo);          
});




    // IMPORTANT

            // add to index.html <body> : 
            
                    // <script src="../socket.io/socket.io.js"></script>   
            
            // add to dependencies
            
                    // socket.io-client to dependencies