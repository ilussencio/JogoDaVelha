var imagens = ['imgXis','imgCircle']
var pl = []
var imgAtual = 0;
var matriz;
var stompClient = null;
var room = ''
var player = ''

function criarTabuleiro(){
    criarMatriz();
    for(var i = 0 ; i < 3 ;i++){
        for(var j = 0; j < 3; j++){
            var div = document.createElement("div");
            if(i === 2 && j === 2){
                div.setAttribute("class","boxTabuleiro boxTabuleiroLeft boxTabuleiroBottom imgTabuleiro");
            }else if(j === 2){
                div.setAttribute("class","boxTabuleiro boxTabuleiroLeft imgTabuleiro");
            }else if(i === 2){
                div.setAttribute("class","boxTabuleiro boxTabuleiroBottom imgTabuleiro");
            }else{
                div.setAttribute("class","boxTabuleiro imgTabuleiro");
            }
            div.setAttribute("id",`${i}_${j}`)
            div.addEventListener("click",inserirImg);
            document.getElementById("tabuleiro").appendChild(div);
            matriz[i][j] = 9;
        }
    }
}

function criarMatriz(){
    matriz = new Array(3); //Criando 3 posicoes
    for ( var i = 0; i < 3; i++ ){
        matriz[i] = new Array(3);
    }
}

function reset(){
    document.getElementById("tabuleiro").innerHTML = "";
    document.getElementById("ganhador").style.visibility = 'hidden';
    document.getElementById("velha").style.visibility = 'hidden';
    criarTabuleiro();
}

function inserirImg(evento){
    list = document.getElementById(evento.currentTarget.id).classList
    if(list.contains('imgCircle') || list.contains('imgXis')){
        msg("Por favor selecione uma posição vazia!","error")
        return
    }
    document.getElementById(evento.currentTarget.id).classList.add(imagens[imgAtual]);
    vetIndices = evento.currentTarget.id.split("_");
    matriz[vetIndices[0]][vetIndices[1]] = imgAtual;
    (imgAtual >= 1)? imgAtual = 0  : imgAtual ++
    document.getElementById("platual").innerHTML = pl[imgAtual]
}

function vencedor(player){
    console.log(player)
    if(player == pl[0])
        document.getElementById("pl1_placar").innerHTML = parseInt(document.getElementById("pl1_placar").innerHTML)+1
    if(player == pl[1])
        document.getElementById("pl2_placar").innerHTML = parseInt(document.getElementById("pl2_placar").innerHTML)+1

    if(player != "velha"){
        document.getElementById("ganhador").style.visibility = 'visible';
        document.getElementById("ganhador_nome").innerHTML = player;
    }else{
        document.getElementById("velha").style.visibility = 'visible';
    }
}

function checkGanhador(){
    linha = ""
    for(var i = 0; i < 3; i++){
        //VERIFICA LINHA
        for(var j = 0; j < 3; j++){
           linha += matriz[i][j]
        }
        if(linha === '000')   {vencedor(pl[0]); return;}
        if(linha === '111')   {vencedor(pl[1]); return;}
        linha = ""
    }

    coluna = ""
    for(var j = 0; j < 3; j++){
        //VERIFICA COLUNA
        for(var i = 0; i < 3; i++){
            coluna += matriz[i][j]
        }
        if(coluna === '000')   {vencedor(pl[0]); return;}
        if(coluna === '111')   {vencedor(pl[1]); return;}
        coluna = ""
    }

    diagonalPrincipal = ""
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(i == j)
                diagonalPrincipal += matriz[i][j]
        }
        if(diagonalPrincipal === '000')   {vencedor(pl[0]); return;}
        if(diagonalPrincipal === '111')   {vencedor(pl[1]); return;}
    }
    diagonalPrincipal = ""

    diagonalSec = ""
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(i == 0 && j == 2)
                diagonalSec += matriz[i][j]
            if(i == 1 && j == 1)
                diagonalSec += matriz[i][j]
            if(i == 2 && j == 0)
                diagonalSec += matriz[i][j]
        }
        if(diagonalSec === '000')   {vencedor(pl[0]); return;}
        if(diagonalSec === '111')   {vencedor(pl[1]); return;}
    }
    diagonalSec = ""

    velha = 0
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(matriz[i][j] === 0 || matriz[i][j] === 1){
                velha += 1
            }            
        }
    }
    if(velha === 9)   {vencedor("velha"); return;}
    velha = 0
}

function setJogador(){
    pl1 = localStorage.getItem("pl1")
    pl2 = localStorage.getItem("pl2")
    pl.push(pl1)
    pl.push(pl2)
    document.getElementById("pl1_nome").innerHTML = pl1
    document.getElementById("pl2_nome").innerHTML = pl2
    document.getElementById("pl1").innerHTML = pl1
    document.getElementById("pl2").innerHTML = pl2
    document.getElementById("platual").innerHTML = pl1
    document.getElementById("pl1_placar").innerHTML = 0
    document.getElementById("pl2_placar").innerHTML = 0
}
