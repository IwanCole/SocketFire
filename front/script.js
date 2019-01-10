var lineNum = 1;

var handler_config_clear = function() {
    $("button.config-clear").click(function () {
        $(".terminal-anchor").empty();
        lineNum = 1;
    });
}


var handler_send = function() {
    $(".terminal-input").on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code==13){
            var input = $(".terminal-input").val();

            console.log(input);
            var entry = `<div class="terminal-entry">
            <p class="terminal-num"><b>${lineNum}</b></p>
            <p class="terminal-text">${input}</p>
            </div>`

            $(entry).appendTo(".terminal-anchor");
            lineNum += 1;
            $(".terminal-input").val("");// Enter pressed... do anything here...
        }
    });

}

var main = function () {
    handler_send();
    handler_config_clear();
    $(".terminal-input").focus();
};

$("document").ready(main);
