var stompClient = null;
var nome = window.localStorage.getItem("nome");
var mesa = [
];

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings/sala01', function (greeting) {
            lobby(JSON.parse(greeting.body).content);
        });
    });
}
function lobby(mensagem){
    console.log(mesa);
}
function send(){
    mesa.jogador = nome;
    stompClient.send(`/app/hello/sala01`, {}, JSON.stringify({'jogador': mesa}));
}

async function init(){
    await connect();
}
