//Variaveis
var email;
var senha1;
var senha2;
var erro;
var recaptcha;

var traco = 1;

//Start
window.addEventListener("load", inicial);

function inicial(){
	eventos();
	variaveis();
	SeErro();
	Mobile();
}

function eventos(){
	document.getElementById("form-email").addEventListener("focus", Focus);
	document.getElementById("form-senha1").addEventListener("focus", Focus);
	document.getElementById("form-senha2").addEventListener("focus", Focus);
	document.getElementById("form-email").addEventListener("blur", Blur);
	document.getElementById("form-senha1").addEventListener("blur", Blur);
	document.getElementById("form-senha2").addEventListener("blur", Blur);
}
function variaveis(){
	email = document.getElementById('form-email');
	senha1 = document.getElementById('form-senha1');
	senha2 = document.getElementById('form-senha2');
	recaptcha = document.getElementById("captcha-div");
	erro = document.getElementById('form-erro');
}
function SeErro(){
	if(document.getElementById("form-erro-detect") != "null"){
		Erro(document.getElementById("form-erro-detect").innerHTML);
	}
}
function Mobile(){
	if(typeof window.orientation !== 'undefined'){
		traco = 0;
		document.getElementById("caixa-cadastro").style.width = "750px";
		document.getElementById("caixa-cadastro").style.height = "850px";
		document.getElementById("form-senha1-texto").style.marginLeft = "125px";
		document.getElementById("form-senha2-texto").style.marginLeft = "125px";
		document.getElementById("form-email-texto").style.marginLeft = "125px";
		document.getElementById("form-senha1-texto").style.fontSize = "20px";
		document.getElementById("form-senha2-texto").style.fontSize = "20px";
		document.getElementById("form-email-texto").style.fontSize = "20px";
		document.getElementById("titulo").style.fontSize = "34px";
		document.getElementById("subtitulo").style.fontSize = "20px";
		
		document.getElementById("form-email").style.width = "500px";
		document.getElementById("form-senha1").style.width = "500px";
		document.getElementById("form-senha2").style.width = "500px";
			
		document.getElementById("form-email").style.height = "50px";
		document.getElementById("form-senha1").style.height = "50px";
		document.getElementById("form-senha2").style.height = "50px";
		
		document.getElementById("form-email").style.fontSize = "30px";
		document.getElementById("form-senha1").style.fontSize = "30px";
		document.getElementById("form-senha2").style.fontSize = "30px";
		
		document.getElementById("form-botao").style.width = "350px";
		document.getElementById("form-botao").style.height = "60px";
		document.getElementById("form-botao").style.fontSize = "28px";
		
		document.getElementById("form-botao").style.marginTop = "80px";
	}
}


//Animações
function Focus(){
	var tex1 = document.getElementById("form-email-traco");
	var tex2 = document.getElementById("form-senha1-traco");
	var tex3 = document.getElementById("form-senha2-traco");
	if(this.id == "form-email"){
		if(traco == 0){tex1.style.width = "500px";}else{
			tex1.style.width = "270px";}
	}else if(this.id == "form-senha1"){
		if(traco == 0){tex2.style.width = "500px";}else{
			tex2.style.width = "270px";}
	}else if(this.id == "form-senha2"){
		if(traco == 0){tex3.style.width = "500px";}else{
			tex3.style.width = "270px";}
	}
}
function Blur(){
	var tex1 = document.getElementById("form-email-traco");
	var tex2 = document.getElementById("form-senha1-traco");
	var tex3 = document.getElementById("form-senha2-traco");
	if(this.id == "form-email"){
		tex1.style.width = "0px";
	}else if(this.id == "form-senha1"){
		tex2.style.width = "0px";
	}else if(this.id == "form-senha2"){
		tex3.style.width = "0px";
	}
}

//Funcao de Erro

function Erro(a){
	if(a == '1'){
		email.style.borderColor = 'rgba(253, 44, 44, 0.83)';
		senha1.style.borderColor = 'rgba(253, 44, 44, 0.83)';
		senha2.style.borderColor = 'rgba(253, 44, 44, 0.83)';
		erro.innerHTML = "Falta de informações.";
	}else if(a == '2'){
		recaptcha.style.borderColor = 'rgba(253, 44, 44, 0.83)';
		recaptcha.style.borderWidth = '1px';
		recaptcha.style.borderStyle = 'solid';
		erro.innerHTML = "Recaptcha em branco.";
	}else if(a == '3'){
		email.style.borderColor = 'rgba(253, 44, 44, 0.83)';
		erro.innerHTML = "Email já cadastrado.";
	}else if(a == '4'){
		senha1.style.borderColor = 'rgba(253, 44, 44, 0.83)';
		senha2.style.borderColor = 'rgba(253, 44, 44, 0.83)';
		erro.innerHTML = "Senhas não correspondem.";
	}
}

//Android Rotacao
if(typeof window.orientation !== 'undefined'){
	var previousOrientation = window.orientation;
	var checkOrientation = function(){
		if(window.orientation !== previousOrientation){
			previousOrientation = window.orientation;
			if(screen.width > screen.height){
				traco = 1;
				document.getElementById("caixa-cadastro").style.width = "325px";
				document.getElementById("caixa-cadastro").style.height = "425px";
				document.getElementById("form-senha1-texto").style.marginLeft = "25px";
				document.getElementById("form-senha2-texto").style.marginLeft = "25px";
				document.getElementById("form-email-texto").style.marginLeft = "25px";
				document.getElementById("form-senha1-texto").style.fontSize = "11px";
				document.getElementById("form-senha2-texto").style.fontSize = "11px";
				document.getElementById("form-email-texto").style.fontSize = "11px";
				document.getElementById("titulo").style.fontSize = "20px";
				document.getElementById("subtitulo").style.fontSize = "12px";
				document.getElementById("form-email").style.width = "270px";
				document.getElementById("form-senha1").style.width = "270px";
				document.getElementById("form-senha2").style.width = "270px";
				
				document.getElementById("form-email").style.height = "30px";
				document.getElementById("form-senha1").style.height = "30px";
				document.getElementById("form-senha2").style.height = "30px";
			
				document.getElementById("form-email").style.fontSize = "17px";
				document.getElementById("form-senha1").style.fontSize = "17px";
				document.getElementById("form-senha2").style.fontSize = "17px";
			
				document.getElementById("form-botao").style.width = "120px";
				document.getElementById("form-botao").style.height = "30px";
				document.getElementById("form-botao").style.fontSize = "initial";
			
				document.getElementById("form-botao").style.marginTop = "25px";
			}else{
				traco = 0;
				document.getElementById("caixa-cadastro").style.width = "750px";
				document.getElementById("caixa-cadastro").style.height = "850px";
				document.getElementById("form-senha1-texto").style.marginLeft = "125px";
				document.getElementById("form-senha2-texto").style.marginLeft = "125px";
				document.getElementById("form-email-texto").style.marginLeft = "125px";
				document.getElementById("form-senha1-texto").style.fontSize = "20px";
				document.getElementById("form-senha2-texto").style.fontSize = "20px";
				document.getElementById("form-email-texto").style.fontSize = "20px";
				document.getElementById("titulo").style.fontSize = "34px";
				document.getElementById("subtitulo").style.fontSize = "20px";
				document.getElementById("form-email").style.width = "500px";
				document.getElementById("form-senha1").style.width = "500px";
				document.getElementById("form-senha2").style.width = "500px";
	
				document.getElementById("form-email").style.height = "50px";
				document.getElementById("form-senha1").style.height = "50px";
				document.getElementById("form-senha2").style.height = "50px";
			
				document.getElementById("form-email").style.fontSize = "30px";
				document.getElementById("form-senha1").style.fontSize = "30px";
				document.getElementById("form-senha2").style.fontSize = "30px";
			
				document.getElementById("form-botao").style.width = "350px";
				document.getElementById("form-botao").style.height = "60px";
				document.getElementById("form-botao").style.fontSize = "28px";
			
				document.getElementById("form-botao").style.marginTop = "80px";
			}
		}
	};
	
	
	window.addEventListener("resize", checkOrientation, false);
	window.addEventListener("orientationchange", checkOrientation, false);
	
	setInterval(checkOrientation, 2000);
}