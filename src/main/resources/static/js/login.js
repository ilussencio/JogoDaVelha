const rand = () => {
return Math.random().toString(36).substr(2);
};
  
const token = () => {
    return rand() + rand();
};

function validateLogin(){
    user= document.getElementById("user");
    const urlParams = new URLSearchParams(window.location.search);
    const tk = urlParams.get("token")

    if(!user.value){
        msg("Usuário em branco. Informe um usuário","error");
    }else if(tk != null){
        localStorage.setItem("user",user.value);
        window.open(`lobby/${tk}/player2`,"_self");
    }
    else{
        localStorage.setItem("user",user.value);
        window.open(`lobby/${token()}/player1`,"_self");
    }
}