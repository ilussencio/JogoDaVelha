user = localStorage.getItem("user")
console.log(user)
if(user == null){
    window.open("index.html")
}