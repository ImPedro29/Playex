//USER => REGISTER JAVASCRIPT

//Aticavao instant
setTimeout(start, 0);

function start(){
	
}

//Variáveis GLOBAIS


//Eventos
function events(){
	
}

//Quando carregar do body
function onLoad(){

}

function submitRegister(){
	//Variáveis
	var email = document.getElementById("email");
	var pass1 = document.getElementById("pass1");
	var pass2 = document.getElementById("pass2");
	var nick = document.getElementById("nick");
	var captc = grecaptcha && grecaptcha.getResponse().length !== 0; //Status do captcha
	var div_captcha = document.getElementsByClassName("g-recaptcha")[0];
		
	if(!captc){
		div_captcha.style.borderColor = "red";
	}
	if(email.value === ""){
		document.getElementsByClassName("email-txt")[0].style.backgroundColor = "#ff5454";
	}
	if(pass1.value === ""){
		document.getElementsByClassName("first-pass-txt")[0].style.backgroundColor = "#ff5454";
	}
	if(pass2.value === ""){
		document.getElementsByClassName("sec-pass-txt")[0].style.backgroundColor = "#ff5454";
	}
	if(nick.value === ""){
		document.getElementsByClassName("nick-txt")[0].style.backgroundColor = "#ff5454";
	}
	if(pass1.value != pass2.value){
		document.getElementsByClassName("first-pass-txt")[0].style.backgroundColor = "#ff5454";
		document.getElementsByClassName("sec-pass-txt")[0].style.backgroundColor = "#ff5454";
	}
}