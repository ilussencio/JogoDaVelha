function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //console.log('Connected: ' + frame);
        room = document.getElementById("sala").innerHTML;
        player = document.getElementById("player").innerHTML;        
        
        stompClient.subscribe(`/topic/lobby/${room}/player1`, function (name) {
            player1(JSON.parse(JSON.parse(name.body).mensagem));
        });
        stompClient.subscribe(`/topic/lobby/${room}/player2`, function (name) {
            player2(JSON.parse(JSON.parse(name.body).mensagem));
        });
        stompClient.subscribe(`/topic/game/${room}/player1`, function (name) {
            updateTable(JSON.parse(JSON.parse(name.body).mensagem));
        });
        stompClient.subscribe(`/topic/game/${room}/player2`, function (name) {
            updateTable(JSON.parse(JSON.parse(name.body).mensagem));
        });

    });
}
function updateTable(mensagem){
    console.log("========")
    console.log(mensagem.tab);
    for(i = 0; i < 3; i ++){
        for(j = 0; j < 3; j ++){
            document.getElementById(`${i}_${j}`).classList.add(imagens[mensagem.tab[i][j]]);
        }
    }
    checkGanhador();
}

function player1(mensagem){
    document.getElementById(`pl1`).value = JSON.parse(mensagem).name;
    document.getElementById("pl1_nome").innerHTML = JSON.parse(mensagem).name;
}

function player2(mensagem){
    document.getElementById(`pl1`).value = JSON.parse(mensagem).name;
    document.getElementById("pl2_nome").innerHTML = JSON.parse(mensagem).name;
}

function iniciar() {
    console.log(player)
    if(player === 'player1'){
        stompClient.send(`/app/lobby/${room}/player1`, {}, JSON.stringify({'name':user}));
    }else if(player === 'player2'){
        stompClient.send(`/app/lobby/${room}/player2`, {}, JSON.stringify({'name':user}));
    }
}

function updateTab() {
    if(player === 'player1'){
        stompClient.send(`/app/game/${room}/player1`, {}, JSON.stringify({'pl':user, 'tab':matriz}));
    }else if(player === 'player2'){
        stompClient.send(`/app/game/${room}/player2`, {}, JSON.stringify({'pl':user, 'tab':matriz}));
    }
}


setInterval( () => {
    iniciar();
    updateTab();
},1000);