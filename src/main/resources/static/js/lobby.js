var stompClient = null;
var room = ''
var player = ''
var host = window.location.host; 

function jogar(){
    pl1 = document.getElementById("player1");
    pl2 = document.getElementById("player2");

    if(pl1.value === ""){
        msg("Jogador 1 invalido","error")
        pl1.focus()
    }else if(pl2.value === ""){
        msg("Jogador 2 invalido","error")
        pl2.focus()
    }else{
        localStorage.setItem("pl1",pl1.value)
        localStorage.setItem("pl2",pl2.value)
        window.open(`http://${host}/game/${room}/${player}`,"_self")
    }
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //console.log('Connected: ' + frame);
        room = document.getElementById("sala").innerHTML;
        player = document.getElementById("player").innerHTML;
        document.getElementById("token").setAttribute("href",`${host}?token=${room}`)
        document.getElementById("token").innerHTML = "LINK PARA PLAYER2"
        
        
        stompClient.subscribe(`/topic/lobby/${room}/player1`, function (name) {
            player1(JSON.parse(JSON.parse(name.body).mensagem));
        });
        stompClient.subscribe(`/topic/lobby/${room}/player2`, function (name) {
            player2(JSON.parse(JSON.parse(name.body).mensagem));
        });
    });
}

function player1(mensagem){
    document.getElementById(`player1`).value = JSON.parse(mensagem).name;
    localStorage.setItem('pl1',JSON.parse(mensagem).name);
}

function player2(mensagem){
    document.getElementById(`player2`).value = JSON.parse(mensagem).name;
    localStorage.setItem('pl2',JSON.parse(mensagem).name);
}

function iniciar() {
    console.log(player)
    if(player === 'player1'){
        stompClient.send(`/app/lobby/${room}/player1`, {}, JSON.stringify({'name':user}));
    }else if(player === 'player2'){
        stompClient.send(`/app/lobby/${room}/player2`, {}, JSON.stringify({'name':user}));
    }
}

setInterval( () => {
    iniciar();
},1000);