var mobDetect = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
setTimeout(inicial, 0);

//Desativar funções para desenvolver no navegador
var pc = true;

if(!mobDetect){
	if(!pc){
		window.location = "https://playex.link";
	}
}
//Coisas Iniciais
function inicial(){
	variaveis();
	eventos();
	setEp();
}

//Variaveis
function variaveis(){
	mobile_div_principal = document.getElementById("mobile-div-principal");
	mobile_voltar_botao = document.getElementById("mobile-voltar-botao");
	mobile_voltar_assistir = document.getElementById("mobile-voltar-assistir");
	mobile_serie_temporada = document.getElementById("mobile-serie-temporada");
	mobile_serie_episodio = document.getElementById("mobile-serie-episodio");
	mobile_iframe_fechar = document.getElementById("mobile-iframe-fechar");
	
	mobile_div_temporada_1 = document.getElementById("mobile-div-temporada-1");
	mobile_div_temporada_2 = document.getElementById("mobile-div-temporada-2");
	mobile_div_temporada_3 = document.getElementById("mobile-div-temporada-3");
	mobile_div_temporada_4 = document.getElementById("mobile-div-temporada-4");
	mobile_div_temporada_5 = document.getElementById("mobile-div-temporada-5");
	mobile_div_temporada_6 = document.getElementById("mobile-div-temporada-6");
	mobile_div_temporada_7 = document.getElementById("mobile-div-temporada-7");
	mobile_div_temporada_8 = document.getElementById("mobile-div-temporada-8");
	mobile_div_temporada_9 = document.getElementById("mobile-div-temporada-9");
	
	mobile_temporada_botao_1 = document.getElementById("mobile-div-temporada-1-botao");
	mobile_temporada_botao_2 = document.getElementById("mobile-div-temporada-2-botao");
	mobile_temporada_botao_3 = document.getElementById("mobile-div-temporada-3-botao");
	mobile_temporada_botao_4 = document.getElementById("mobile-div-temporada-4-botao");
	mobile_temporada_botao_5 = document.getElementById("mobile-div-temporada-5-botao");
	mobile_temporada_botao_6 = document.getElementById("mobile-div-temporada-6-botao");
	mobile_temporada_botao_7 = document.getElementById("mobile-div-temporada-7-botao");
	mobile_temporada_botao_8 = document.getElementById("mobile-div-temporada-8-botao");
	mobile_temporada_botao_9 = document.getElementById("mobile-div-temporada-9-botao");
}

//Eventos
function eventos(){
	document.body.addEventListener("load", onLoad);
	mobile_voltar_botao.addEventListener("click", voltarAssistir);
	
	mobile_temporada_botao_1.addEventListener("click", temporadaum);
	mobile_temporada_botao_2.addEventListener("click", temporadadois);
	mobile_temporada_botao_3.addEventListener("click", temporadatres);
	mobile_temporada_botao_4.addEventListener("click", temporadaquatro);
	mobile_temporada_botao_5.addEventListener("click", temporadacinco);
	mobile_temporada_botao_6.addEventListener("click", temporadaseis);
	mobile_temporada_botao_7.addEventListener("click", temporadasete);
	mobile_temporada_botao_8.addEventListener("click", temporadaoito);
	mobile_temporada_botao_9.addEventListener("click", temporadanove);
}

//Quando carregar acontece isso
function onLoad(){
	animacaoInicial();
}

//Animação de quando voltar para tela inicial
function animacaoInicial(){
	
}

//Assistir ultimo
function voltarAssistir(){
	mobile_voltar_assistir.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
	setTimeout(function(){
		mobile_voltar_assistir.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
		var videoIfr = document.createElement("iframe");
		videoIfr.id = "mobile-iframe";
		videoIfr.src = "https://playex.link/player?tipo=serie&serie=himym&ep=" + getCookie("episodio") + "&temp" + getCookie("temporada");
		document.body.appendChild(videoIfr);
		mobile_div_temporada_9.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
		var videoIfrFechar = document.createElement("button");
		videoIfrFechar.id = "mobile-iframe-fechar";
		videoIfrFechar.innerHTML = "<";
		document.body.appendChild(videoIfrFechar);
		videoIfrFechar.addEventListener("click", ifrFechar);
	}, 150);
}

//Pegar episodio que a pessoa ta assistindo
function setEp(){
	if(getCookie("episodio") == "" || getCookie("temporada") == ""){
		setCookie("episodio", 1, 90);
		setCookie("temporada", 1, 90);
	}else{
		mobile_serie_episodio.innerHTML = getCookie("episodio") + "° Episodio";
		mobile_serie_temporada.innerHTML = getCookie("temporada") + "° Temporada";
	}
}

function temporadaum(){temporada(1);}
function temporadadois(){temporada(2);}
function temporadatres(){temporada(3);}
function temporadaquatro(){temporada(4);}
function temporadacinco(){temporada(5);}
function temporadaseis(){temporada(6);}
function temporadasete(){temporada(7);}
function temporadaoito(){temporada(8);}
function temporadanove(){temporada(9);}

//Troca de Temporada
function temporada(temp){
	var temp;
	if(temp == 1){
		mobile_div_temporada_1.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_1.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/1.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 2){
		mobile_div_temporada_2.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_2.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/2.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 3){
		mobile_div_temporada_3.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_3.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/3.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 4){
		mobile_div_temporada_4.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_4.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/4.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 5){
		mobile_div_temporada_5.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_5.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/5.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 6){
		mobile_div_temporada_6.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_6.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/6.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 7){
		mobile_div_temporada_7.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_7.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/7.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 8){
		mobile_div_temporada_8.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_8.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/8.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}else if(temp == 9){
		mobile_div_temporada_9.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.55)";
		setTimeout(function(){
			mobile_div_temporada_9.style.boxShadow = "0px 0px 25px rgba(255,255,255,0)";
			var videoIfr = document.createElement("iframe");
			var videoIfrFechar = document.createElement("button");
			videoIfr.id = "mobile-iframe";
			videoIfrFechar.id = "mobile-iframe-fechar";
			videoIfr.src = "/mobile/temporada/9.php";
			videoIfrFechar.innerHTML = "<";
			document.body.appendChild(videoIfr);
			document.body.appendChild(videoIfrFechar);
			videoIfrFechar.addEventListener("click", ifrFechar);
		}, 150);
	}
}

//Fechar iframe
function ifrFechar(){
	document.body.removeChild(document.getElementById("mobile-iframe"));
	document.body.removeChild(document.getElementById("mobile-iframe-fechar"));
}

//Funções add
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}