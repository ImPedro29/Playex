//Variaveis
var statusnome;
var statususuarioinfo = false;

//Start
window.addEventListener("load", inicial);

function inicial(){	
	eventos();
}

function eventos(){
	document.getElementById("usuario-info-nome").addEventListener("click", nomeClick);
	document.getElementById("usuario-acao-mudarsenha").addEventListener("click", mudarSenha);
	document.getElementById("usuario-acao-nome").addEventListener("blur", onBlur);
	document.getElementById("usuario-acao-nome").addEventListener("change", onChange);
	document.getElementById("usuario-info-foto").onclick = function(){document.getElementById("usuario-acao-foto").click();};
	document.getElementById("usuario-acao-foto").onchange = function(){document.getElementById("usuario-submit-foto").click();};
	setInterval(MYSQLapelido, 5000);
	setTimeout(function(){ if(document.getElementById("aviso")){document.getElementById("aviso").style.bottom = "0px";} }, 200);
}

//Ações
function nomeClick(){
	var tex1 = document.getElementById("usuario-traco-nome");
	tex1.style.width = "260px";
	tex1.style.marginLeft = "115px";
	var tex2 = document.getElementById("usuario-acao-nome");
	tex2.style.display = "initial";
	tex2.focus();
	var tex3 = document.getElementById("usuario-info-nome");
	tex3.style.display = "none";
	statusnome = true;
}

function onChange(){
	var tex2 = document.getElementById("usuario-acao-nome");
	var tex3 = document.getElementById("usuario-info-nome");
	tex3.innerHTML = tex2.value;
	MYSQLapelido();
}
//Animações
function onBlur(){
	var tex1 = document.getElementById("usuario-traco-nome");
	tex1.style.width = "0px";
	tex1.style.marginLeft = "245px";
	var tex2 = document.getElementById("usuario-acao-nome");
	tex2.style.display = "none";
	var tex3 = document.getElementById("usuario-info-nome");
	tex3.style.display = "initial";
	statusnome = false;
}
//Aviso
function aviso(texto, cor){
	var texto;
	var cor;
	var dv = document.createElement('div');
	document.body.appendChild(dv);
	dv.id = "aviso";
	dv.innerHTML = texto;
	dv.style.backgroundColor = "rgba(253, 44, 44, 0.83)";
}
//MudarSenha
function mudarSenha(){
	var usuarioi = document.getElementById("usuario-info");
	var usuarioiframe = document.getElementById("usuario-iframe-mudarsenha");
	if(statususuarioinfo){
		usuarioi.style.height = "auto";
		usuarioiframe.style.display = "none";
		statususuarioinfo = false;
	}else{
		usuarioi.style.height = "280px";
		usuarioiframe.style.display = "initial";
		statususuarioinfo = true;
	}
}
//MYSQL
function MYSQLapelido(){
	if(statusnome){
		var iframe = document.createElement('iframe');
		iframe.style.display = "none";
		iframe.src = "https://playex.link/acoes/apelido.php?apelido=" + document.getElementById("usuario-acao-nome").value;
		document.body.appendChild(iframe);
		setTimeout(function(){ document.body.removeChild(iframe); }, 1000);
	}
}