function msg(mensagem,tipo){
    div = document.createElement('div')
    div.setAttribute("class",`msg ${tipo}`);
    div.innerHTML = mensagem;
    document.body.appendChild(div);
    cron = setTimeout(()=> {
        
        msgs = document.getElementsByClassName('msg');
        for(i = 0; i <= msgs.length-1; i++)
            document.body.removeChild(msgs[i])

        clearInterval(cron);
    },5000);
}