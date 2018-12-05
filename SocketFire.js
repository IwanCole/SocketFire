// Script to fire STDIN at a socket connection

var net = require('net');
var ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
  version: '1.0.0',
  addHelp:true,
  description: 'Simple script to fire STDIN at a socket, useful for testing'
});

parser.addArgument(
  [ '--ip' ],
  {
    help: 'IP - The address to connect to',
    required: true
  }
);
parser.addArgument(
  [ '--port' ],
  {
    help: 'PORT - The port to connect to',
    required: true,
    type: 'int'
  }
);

function validPort(port) {
    if (port >= 0 && port <= 65535) {
        return port;
    }
    else {
        console.log(`Invalid PORT value ${port}, must be in range 0 - 65535`);
        process.exit();
    }
}


function main() {
    var args = parser.parseArgs();

    var PORT = validPort(args.port);
    var IP   = args.ip;

    var client = new net.Socket();
    client.connect(PORT, IP, function() {
    	console.log(`Connected to ${IP} on port ${PORT}! Enter data to send, followed by ENTER`);
        var stdin = process.openStdin();

        stdin.addListener("data", function(d) {
            console.log("you entered: '" +
                d.toString().trim() + "'");
                client.write(d.toString().trim());
          });
    });

    client.on('data', function(data) {
    	console.log('Received: ' + data);
    });

    client.on('close', function() {
    	console.log('Connection closed');
    });

    client.on('error', function(err) {
        console.log('Error on socket:');
        console.log(err);
    });
}

main();
