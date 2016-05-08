    var socket;

        function init() {
            var host = ("ws://127.0.0.1:65533/");
            try {
                socket =new WebSocket(host);
                socket.onopen = function (msg) {
					if(msg.toString().substring(14,21)="sucess"){
						socket.send("hello");
					}
                };
                socket.onmessage = function (msg) {
                    log(msg.data);
                };
                socket.onclose = function (msg) {
                    log("Lose Connection!");
                };
            }
            catch (ex) {
                log(ex);
            }
            $("msg").focus();
        }

        function send() {
            var txt, msg;
            txt = $("msg");
            msg = txt.value;
            if (!msg) {
                alert("Message can not be empty");
                return;
            }
            txt.value = "";
            txt.focus();
            try {
                socket.send(msg);
            } catch (ex) {
                log(ex);
            }
        }

        window.onbeforeunload = function () {
            try {
                socket.send('quit');
                socket.close();
                socket = null;
            }
            catch (ex) {
                log(ex);
            }
        };
        function onkey(event) {
            if (event.keyCode == 13) {
                send();
            }
        }
