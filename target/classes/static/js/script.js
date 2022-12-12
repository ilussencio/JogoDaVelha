var stompClient = null;
var player = ""
var room = ""

game = {
    'pl1':'null',
    'pl2':'null',
    'tab':[],
    'win':'null'
}
function init(){
    room = document.getElementById("sala").innerHTML;
    connect();
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe(`/topic/lobby/${room}/game`, function (game) {
            lobby(JSON.parse(game.body).content);
        });

        stompClient.subscribe(`/topic/lobby/${room}/state`, function (game) {
            lobby(JSON.parse(game.body).content);
            update()
        });

    });
}
function update(){
    stompClient.send(`/app/lobby/${room}/game`, {}, JSON.stringify(game));
}
function state(mensagem){
    console.log("state -> "+mensagem);
}

function lobby(mensagem){
    console.log("-> "+mensagem)
}

function inicio(){
    stompClient.send(`/app/lobby/${room}`, {}, JSON.stringify({'pl1':game}));
}
function teste(){
    stompClient.send(`/app/lobby/${room}/state`, {});
}