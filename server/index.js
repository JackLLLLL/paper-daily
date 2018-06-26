const http = require('http');
      config = require('./config');

// get port number from config
var port = config.SERVER_PORT;

var start = function() {

    var server = http.createServer(function(require, response) {
        response.writeHead('200', {'Content-Type': 'text/plain'});
        response.end("my first web");
    });
    
    server.listen(port, function(){
        console.log('server now listening on port ' + port);
    });
}

module.exports = {
    start:start,
}
