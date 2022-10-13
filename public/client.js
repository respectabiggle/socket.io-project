const socket = io();

socket.on('numberChannel', (fooNumber) => {
    // console.log(fooNumber);                                            // <==  THIS IS WHAT YOU ARE LOOKING FOR
});




    // IMPORTANT  do not forget to add to the <body> of index.html:        <script src="../socket.io/socket.io.js"></script>   