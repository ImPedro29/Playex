/* Opah eaê men

Ta ligado que esse código foi feito pelo ImPedro?

Ta ligado que isso tem copyright?

Ta ligado no site Playex.link?

Não? Fique!

 */
setInterval(verificarModulo, 200);

var x = document.getElementsByClassName(""+
""+
"    EdgeButton"+
"    EdgeButton--secondary"+
"    EdgeButton--small "+
"    "+
"    button-text"+
"    follow-text");

var st = false;
var cp = 0;
var inter;
var rp = true;
var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
var limite = 0;
var intervalo = false;
	
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 65:
			if(intervalo){
				alert("Intervalo em andamento");
				return;
			}
			if(!st){
				alert("Aperte S para iniciar o programa.");
				return;
			}
			if(cp == 2){
				alert("O Programa já esta em parado.");
				return;
			}
			cp = 2;
            parar();
			alert("Parou!");
            break;
		case 68:
			if(intervalo){
				alert("Intervalo em andamento");
				return;
			}
			if(!st){
				alert("Aperte S para iniciar o programa.");
				return;
			}
			if(cp == 1){
				alert("O Programa já esta em funcionamento");
				return;
			}
			cp = 1;
			comecar();
			alert("Comecou");
            break;
		case 83:
			if(intervalo){
				alert("Intervalo em andamento");
				return;
			}
			if(st){
				alert("Programa já está em andamento");
				return;
			}
			st = true;
			cp = 1;
			inter = setInterval(seguir, Math.floor((Math.random() * 7000) + 4000));
			alert("Iniciou o programa");
            break;
		case 87:
			if(intervalo){
				alert("Intervalo em andamento");
				return;
			}
			if(!st){
				alert("Aperte S para iniciar o programa.");
				return;
			}
			if(!rp){
				alert("Scrool automatico ativado.");
				rp = true;
				return;
			}else{
				alert("Scrool automatico desativado.");
				rp = false;
				return;
			}
            break;
    }
};
 
var numerola = 0;
 
function seguir(){
	while(!x[numerola] && x.innerHTML != "Seguindo"){
 		numerola = numerola + 1;
 	}
 	x[numerola].click();
	
	if(rp){
		x[numerola].focus();
	}
	
	console.log("Intervalo limite: " + limite);
	if(limite == Math.floor((Math.random() * 20) + 10)){
		parar();
		intervalo = true;
		intervalof();
		return;
	}
	limite = limite + 1;
}

function parar(){
	if(intervalo){
				alert("Intervalo em andamento");
				return;
	}
	clearInterval(inter);
}
function comecar(){
	if(intervalo){
				alert("Intervalo em andamento");
				return;
	}
	inter = setInterval(seguir, Math.floor((Math.random() * 7000) + 4000));
}
function intervalof(){
	setTimeout(comecarIn, Math.floor((Math.random() * 100000) + 50000));
}
function comecarIn(){
	inter = setInterval(seguir, Math.floor((Math.random() * 7000) + 4000));
	intervalo = false;
	limite = 0;
}
function verificarModulo(){
    document.getElementsByClassName("SidebarCommonModules")[0].innerHTML = "";
}