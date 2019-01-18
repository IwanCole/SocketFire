var lineNum = 1;
var socketAddr = "";
var connected = false;

var globalSock;

/*
Message types:
0 - Normal,  white
1 - Info,    grey
2 - Warning, yellow
3 - Error,   red
*/
var new_message = function(message, msgType) {
    msgType = msgType || 0;
    var type = "terminal-text-normal";
    if (msgType == 1) {      type = "terminal-text-info"; } 
    else if (msgType == 2) { type = "terminal-text-warning"; } 
    else if (msgType == 3) { type = "terminal-text-error"; }
    
    var entry = `<div class="terminal-entry">
                <p class="terminal-num"><b>${lineNum}</b></p>
                <p class="terminal-text ${type}">${message}</p>
                </div>`

    $(entry).appendTo(".terminal-anchor");
    lineNum += 1;
}


var handler_config_clear = function() {
    $(".config-clear").on('click', function () {
        $(".terminal-anchor").empty();
        lineNum = 1;
    });
}



var validate_port = function(port) {
    port = parseInt(port);
    if (Number.isInteger(port)) {
        if (port >= 0 && port <= 65535) { return port.toString(); }
        else { return -1; }
    }
    else { return -1; }   
}


//https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
var get_address_port = function() {
    var address = $(".config-ip").val();
    var port    = $(".config-port").val();
    
    port = validate_port(port);
    
    return [address, port];
}

var toggle_address = function(enable) {
    if (enable) {
        $(".config-ip, .config-port, .config-go").prop('disabled', true);
    }
    else {
        $(".config-ip, .config-port, .config-go").prop('disabled', false);
    }
}


var socket_create = function() {
    toggle_address(true);
    var address, port;
    [address, port] = get_address_port();
    
    if (port == -1) {
        new_message("Invalid port value", 2);
        toggle_address(false);
        return;
    }
    
    socketAddr = `ws://${address}:${port}`;
    var info = `Attempting connection to ${socketAddr}`;
    new_message(info, 1);

    try {
        globalSock = new WebSocket(socketAddr);
        globalSock.onerror = function(event) {
            var info = `An error occurred${connected ? "" : " while establishing a connection"}`;
            new_message(info, 3);
            console.log(event);
        };

        globalSock.onclose = function(event) {
            if (connected) {
                $(".config-stop").prop('disabled', true);
                connected = false;
                var info = `Connection to ${socketAddr} closed${(event.wasClean) ? "" : " unexpectedly"}`;
                new_message(info, (event.wasClean ? 2 : 3));
                globalSock = null;
            }
            toggle_address(false);
        };
        
        globalSock.onopen = function(event) {
            $(".config-stop").prop('disabled', false);
            connected = true;
            var info = `Connection to ${socketAddr} established`;
            new_message(info, 1);    
        }
        
        globalSock.onmessage = function(event) {
            console.log(event.data);
            var info = event.data.toString();
            new_message(info, 0);    
        }
    
    }
    catch {
        new_message("Unexpected error", 3);
        toggle_address(false);
    }
}


var handler_connect = function() {
    $(".config-stop").prop('disabled', true);
    
    
    $(".config-go").on('click', function() {
        socket_create();        
    });
    
    $(".config-ip, .config-port").on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code==13){
            socket_create();
        }
    });
    
    $(".config-stop").on('click', function() {
        globalSock.close();
    });
}


var handler_send = function() {
    $(".terminal-input").on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code==13){
            var input = $(".terminal-input").val();

            new_message(input, 0);
            if (globalSock) { globalSock.send(input); }
            $(".terminal-input").val("");// Enter pressed... do anything here...
        }
    });

}

var main = function () {
    handler_connect();
    handler_send();
    handler_config_clear();
    $(".terminal-input").focus();
};

$("document").ready(main);
