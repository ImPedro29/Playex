//Mobile Detect
if(window.orientation != "undefined"){
	window.addEventListener("orientationchange", function() {
		if(window.orientation == -90 || window.orientation == 90){
			//Quando a tela estiver deitada
			
		}
		else{
			//Quando a tela estiver em pé
		}
	});
}
//TimeUP para Buffer
var i = 0;
var variacaoBuffer = [];

//Variaveis Globais
setTimeout(variaveis, 0);
setInterval(timeUpVideo, 500);

var layoutSeekTempo = 4; //Tempo em segundos
var layoutSeekTempo2;

var cloud = "https://storage.googleapis.com/playex-storage/user/123/";

var progresso_carregado_num = 0;

var videoCarregadovar = false;

var volume_block = false;

var qualidadeChangeStatus = false; // Quando a qualidade alterar automaticamente

var videoVariacao;

var progresso_barra_status = false; // Se a barra estiver sendo mechida cancela os eventos de progresso

var id, video;


function variaveis(){
	//Outras
	video = document.getElementById("vid");
	videoPRE = document.getElementById("vidPRE");
	player_progresso = document.getElementById("player-progresso");
	player_tempo = document.getElementById("player-tempo");
	player_progresso_tempo = document.getElementById("player-progresso-tempo");
	player_botao_play = document.getElementById("player-play");
	player_botao_pause = document.getElementById("player-pause");
	player_botao_telacheia = document.getElementById("player-telacheia");
	player_botao_telanormal = document.getElementById("player-telanormal");
	player_botao_configuracoes = document.getElementById("player-configuracoes");
	player_botao_feedback = document.getElementById("player-feedback");
	player_qualidade_seletor = document.getElementById("player-qualidade-seletor");
	player_volume_caixa = document.getElementById("player-volume-caixa");
	player_volume_0 = document.getElementById("player-volume0");
	player_volume_1 = document.getElementById("player-volume1");
	player_volume_2 = document.getElementById("player-volume2");
	player_volume_si = document.getElementById("player-volume-si");
	player_carregando_css = document.getElementById("player-carregando-css");
	
	player_botao_qualidade_auto = document.getElementById("player-qualidade-selector-qualidade-botao-auto");
	player_botao_qualidade_1080 = document.getElementById("player-qualidade-selector-qualidade-botao-1080");
	player_botao_qualidade_720 = document.getElementById("player-qualidade-selector-qualidade-botao-720");
	player_botao_qualidade_360 = document.getElementById("player-qualidade-selector-qualidade-botao-360");
	player_botao_qualidade_144 = document.getElementById("player-qualidade-selector-qualidade-botao-144");
	
	player_animacao_play_div = document.getElementById("player-animacao-play-div");
	player_animacao_play = document.getElementById("player-animacao-play");
	player_animacao_pause_div = document.getElementById("player-animacao-pause-div");
	player_animacao_pause = document.getElementById("player-animacao-pause");
	player_animacao_esquerda_div = document.getElementById("player-animacao-esquerda-div");
	player_animacao_esquerda = document.getElementById("player-animacao-esquerda");
	player_animacao_direita_div = document.getElementById("player-animacao-direita-div");
	player_animacao_direita = document.getElementById("player-animacao-direita");
	
	//Cookie
	if(getCk(id + "_volume") == "" || getCk(id + "_volume") == null){
		ck_volume = 1;
		setCk(id + "_volume", 1, 365);
	}else{
		ck_volume = getCk(id + "_volume");
	}
	if(getCk(id + "_tempo") == "" || getCk(id + "_tempo") == null){
		ck_tempo = 0;
	}else{
		ck_tempo = getCk(id + "_tempo");
	}

}

//Quando carregar
window.onload = function(){
	player_tempo.innerHTML = "00:00 / " + pVideo("tempoTotal");
};
//Quando carregar video
function videoCarregadoF(e){
	if(e.error){
		document.Write("Falha no carregamento. Ja estamos trabalhando nisso.");
		reportError("Houve uma falha no carregamento do video de ID: " + id);
	}
	videoCarregFun(2);
}


//Iniciais
setTimeout(inicial, 0);

//Coisas Iniciais
function inicial(){
	eventos();
	video.load();
	
	//Cookie
	video.volume = ck_volume;
	fVolume("initial");
	player_volume_si.value = ck_volume;
	
	if(getCk("qualidade") == ""){
		setCk("qualidade", "auto", 999);
	}
	if(getCk("autoQualidade") == ""){
		setCk("autoQualidade", "360", 999);
	}
		
	mudarQualidade(getCk("qualidade"), "first");
	
	//Add Bug FIX
	player_volume_caixa.style.display = "none";
}

//Eventos
function eventos(){
	player_progresso.addEventListener("input", progressoMuda); // Quando mecher na barra de progresso de tempo
	player_progresso.addEventListener("change", progressoMudou); // Quando a barra de progresso mudar de valor
	player_botao_pause.addEventListener("click", pauseVideo); // Quando clicar no botão pause
	player_botao_play.addEventListener("click", playVideo); // Quando clicar no botão play
	player_botao_telacheia.addEventListener("click", videoTelaCheia); // Quando clicar no botão Tela Cheia
	player_botao_telanormal.addEventListener("click", videoTelaNormal); // Quando clicar no botão volta a tela ao normal
	player_botao_configuracoes.addEventListener("click", configAbrir); // Quando clicar no botão vai abrir as configuracoes
	player_botao_feedback.addEventListener("click", iframeFeedbackAbrir); // Quando clicar no botão de feedback
	videoEvents();
	document.body.addEventListener("mousemove", videoMoveuMouse); // Quando mecher o mouse no body
	window.addEventListener("keydown", teclaEventos); // Quando clicar espaço, tecla para direita etc
	
	//Eventos Volume
	player_volume_0.onmouseover = function(){fVolume("abrircaixa");}; // Passar por cima do volume
	player_volume_1.onmouseover = function(){fVolume("abrircaixa");}; // Passar por cima do volume
	player_volume_2.onmouseover = function(){fVolume("abrircaixa");}; // Passar por cima do volume
	
	player_volume_0.onclick = function(){fVolume("voltarvolume");}; // Clicar no volume
	player_volume_1.onclick = function(){fVolume("volume0");}; // Clicar no volume
	player_volume_2.onclick = function(){fVolume("volume0");}; // Clicar no volume
	
	player_volume_si.oninput = function(){fVolume("seek");}; // Quando mecher na barra de progresso de volume
	
	player_volume_caixa.onmouseleave = function(){fVolume("fecharcaixa");}; // Quando sair de cima do volume
	
	//Mudar qualidades
	player_botao_qualidade_auto.setAttribute("onclick", "mudarQualidade('auto');");
	player_botao_qualidade_1080.setAttribute("onclick", "mudarQualidade('1080');");
	player_botao_qualidade_720.setAttribute("onclick", "mudarQualidade('720');");
	player_botao_qualidade_360.setAttribute("onclick", "mudarQualidade('360');");
	player_botao_qualidade_144.setAttribute("onclick", "mudarQualidade('144');");
	
	
	//++
	player_qualidade_seletor.style.display = "none"; //Evitar bug do primeiro click nas qualidades
	videoCarregFun(1); //Esconder o player até carregar o vídeo
}
//Eventos do video
function videoEvents(){
	video.addEventListener("timeupdate", timeUpVideo); // Quando mudar o currenttime do video
	video.addEventListener("ended", endedVideo); // Quando o video acabar
	video.addEventListener("click", videoClick); // Quando clicar na tag <video>
	video.addEventListener("dblclick", videoTelaCheiaMudar); // Quando der doubleclick na tag <video>
	video.addEventListener("waiting", videoCarregando); // Carregamento do video
	video.addEventListener("canplay", videoCarregado); // Video carregado
	video.onloadeddata = function(e){ videoCarregadoF(e); }; // Quando o vídeo for carregado
}

//Execução de Eventos

function progressoMuda(){
	if((player_progresso.value/10) < 50){
		player_progresso.valor = (player_progresso.value/10) + 0.7;
	}else{
		player_progresso.valor = (player_progresso.value/10) - 0.2;
	}
	
	timeup_porcentagem3 = 100 * (pVideo("tempoCarregado")/video.duration);
	
	player_progresso.style.background = "linear-gradient(to right,rgb(87,104,222) 0%,rgb(87,104,222) " + player_progresso.valor + "%,rgba(145,145,194,0.92) " + player_progresso.valor + "%,rgba(145,145,194,0.92) " + timeup_porcentagem3 + "%,rgba(235,235,235,0.8) " + timeup_porcentagem3 + "%,rgba(235,235,235,0.8) 100%)";
	player_progresso_tempo.style.marginLeft = ((document.body.clientWidth/100) * (player_progresso.value/10)) + "px";
	player_progresso_tempo.style.left = ((-36/100) * (player_progresso.value/10)) + "px";
	player_progresso_tempo.style.display = "initial";
	player_progresso_tempo.innerHTML = pVideo("tempoDecorrido");
	player_tempo.innerHTML = pVideo("tempoDecorrido") + " / " + pVideo("tempoTotal");
	progresso_barra_status = true;
}

function progressoMudou(){
	progresso_barra_status = false;
	video.focus();
	player_progresso.blur();
	player_progresso_tempo.style.display = "none";
	video.currentTime = (video.duration/100) * (player_progresso.value/10);
	setCk(id + "_tempo", video.currentTime, 365);
}

function pauseVideo(){
	player_botao_play.style.display = "initial";
	player_botao_pause.style.display = "none";
	video.pause();
	animar(2);
}

function playVideo(){
	player_botao_play.style.display = "none";
	player_botao_pause.style.display = "initial";
	video.play();
	animar(1);
}

function endedVideo(){
	player_botao_play.style.display = "initial";
	player_botao_pause.style.display = "none";
	aparecerLayout();
	//Não esquecer de colocar para: Aparecer thumb, botão grande, mudar a imagem para a imagem de repetir
}

//Quando o tempo do vídeo mudar
function timeUpVideo(){
	if(progresso_barra_status){
		return;
	}else if(pVideo("status") != "pronto"){
		return;
	}
	
	var timeup_porcentagem = 1000 * (video.currentTime/video.duration);
	player_progresso.value = timeup_porcentagem;
	player_tempo.innerHTML = pVideo("tempoDecorrido") + " / " + pVideo("tempoTotal");
	
	if(timeup_porcentagem/10 <= 50){
		timeup_porcentagem2 = (timeup_porcentagem/10) + 0.7;
	}else{
		timeup_porcentagem2 = (timeup_porcentagem/10) - 0.2;
	}
	
	timeup_porcentagem3 = 100 * (pVideo("tempoCarregado")/video.duration);
	
	player_progresso.style.background = "linear-gradient(to right,rgb(87,104,222) 0%,rgb(87,104,222) " + timeup_porcentagem2 + "%,rgba(145,145,194,0.92) " + timeup_porcentagem2 + "%,rgba(145,145,194,0.92) " + timeup_porcentagem3 + "%,rgba(235,235,235,0.8) " + timeup_porcentagem3 + "%,rgba(235,235,235,0.8) 100%)";
	
	var startLoad = video.currentTime;
	setTimeout(function(){
		var endLoad = video.currentTime;
		videoVariacao = (endLoad - startLoad);
	}, 100);
	
	if(i != -1){
		if(i >= 25){
			i = -1;
		}else{
			variacaoBuffer[i] = videoVariacao;
		}
	}	
	i++;
	if(player_botao_qualidade_auto.style.borderWidth == "0px 0px 0px 3px" && !video.paused){
		if(pVideo("mediaBuffer") != "NaN" && !qualidadeChangeStatus){
			if(pVideo("mediaBuffer") < 0.095 && (pVideo("tempoCarregado") - video.currentTime) < 5){
				setTimeout(function(){
					if(pVideo("mediaBuffer") < 0.095 && !qualidadeChangeStatus){
						mudarQualidade("menor");
					}
				}, 5000);
			}else if(pVideo("mediaBuffer") >= 0.101){
				if((pVideo("tempoCarregado") - video.currentTime) > 15){
					setTimeout(function(){
						if(pVideo("mediaBuffer") >= 0.101 && !qualidadeChangeStatus){
							mudarQualidade("maior");
						}
					}, 5000);
				}
			}
		}
	}
}

//Quando clicar na tag <video>
function videoClick(){
	if(video.paused){
		playVideo();
	}else{
		pauseVideo();
	}
}

//Ativar Tela Cheia
function videoTelaCheia(){
	if(document.body.requestFullscreen){
		document.body.requestFullscreen();
	}else if(document.body.msRequestFullscreen){
		document.body.msRequestFullscreen();
	}else if(document.body.mozRequestFullScreen){
		document.body.mozRequestFullScreen();
	}else if(document.body.webkitRequestFullscreen){
		document.body.webkitRequestFullscreen();
	}
	player_botao_telacheia.style.display = "none";
	player_botao_telanormal.style.display = "initial";
}
function videoTelaCheiaMudar(){
	if(player_botao_telacheia.style.display != "none"){
		videoTelaCheia();
	}else{
		videoTelaNormal();
	}
}

//Desativa FullScreen
function videoTelaNormal(){
	if(document.mozCancelFullScreen){
		document.mozCancelFullScreen();
	}else{
		document.webkitCancelFullScreen();
	}
	  
	player_botao_telacheia.style.display = "initial";
	player_botao_telanormal.style.display = "none";
}

//Abre as configuracoes
function configAbrir(){
	if(player_qualidade_seletor.style.display == "none"){
		player_qualidade_seletor.style.display = "initial";
	}else{
		player_qualidade_seletor.style.display = "none";
	}
}

//Fecha as configurações
function configFechar(){
	player_qualidade_seletor.style.display = "none";
}

//Esconder o layout quando passar o tempo nescessario
function esconderLayout(){
	if(video.paused || video.ended){
		return;
	}
	configFechar();
	fVolume("fecharcaixa");
	document.getElementById("player-baixo").style.opacity = 0;
	document.getElementById("player-cima").style.opacity = 0;
	document.body.style.cursor = "none";
}

//Aparecer layout
function aparecerLayout(){
	document.getElementById("player-baixo").style.opacity = 1;
	document.getElementById("player-cima").style.opacity = 1;
	document.body.style.cursor = "initial";
}

//Esconder inicialmente
function videoCarregFun(a){
	if(a == 1){
		document.getElementById("player-baixo").style.display = "none";
		document.getElementById("player-cima").style.display = "none";
	}else if(a == 2){
		document.getElementById("player-baixo").style.display = "initial";
		document.getElementById("player-cima").style.display = "initial";
		player_animacao_play_div.style.display = "block";
		player_animacao_pause_div.style.display = "block";
		player_animacao_esquerda_div.style.display = "block";
		player_animacao_direita_div.style.display = "block";
	}
}

//Se o mouse se mover cancela a contagem
function videoMoveuMouse(){
	if(layoutSeekTempo2 == "" || layoutSeekTempo2 == null){
		layoutSeekTempo2 = setInterval(esconderLayout, layoutSeekTempo * 1000);
		return;
	}
	clearInterval(layoutSeekTempo2);
	layoutSeekTempo2 = setInterval(esconderLayout, layoutSeekTempo * 1000);
	aparecerLayout();
}

//Abrir janela de quando clicar no botão de feedback
function iframeFeedbackAbrir(){
	if(!document.getElementById("player-feedback-box")){
		pauseVideo();
		var feedbackDiv = document.createElement("div");
		feedbackDiv.id = "player-feedback-box";
		feedbackDiv.innerHTML = "<div id='player-feedback-barra'>Feedback <button id='player-feedback-fechar-botao' style='outline: none; position: absolute; font-size: 20px; font-family: Arial, sans-serif; right: 10px; top: 7px; background-color: transparent; color: white; border-width: 0px; cursor: pointer;'>X</button></div><br><iframe src='/feedback/' id='player-feedback-iframe'></iframe>";
		document.body.appendChild(feedbackDiv);
		document.getElementById("player-feedback-fechar-botao").setAttribute("onclick", "fecharJanela('feedback');");
		var corpoDeFundo = document.createElement("button");
		corpoDeFundo.id = "player-corpodefundo-janela";
		corpoDeFundo.setAttribute("onclick", "fecharJanela('feedback');");
		document.body.appendChild(corpoDeFundo);
		corpoDeFundo.style.zIndex = 3;
		corpoDeFundo.style.width = "100%";
		corpoDeFundo.style.height = "100%";
		corpoDeFundo.style.position = "absolute";
		corpoDeFundo.style.backgroundColor = "rgba(0,0,0,0.8)";
		corpoDeFundo.style.left = "0px";
		corpoDeFundo.style.top = "0px";
		corpoDeFundo.style.borderWidth = "0px";
		corpoDeFundo.style.outline = "none";
	}
}

//Fechar toda e qualquer janela adicional aberta
function fecharJanela(jan){
	var jan;
	if(jan == "feedback"){
		document.body.removeChild(document.getElementById("player-feedback-box"));
		document.body.removeChild(document.getElementById("player-corpodefundo-janela"));
	}
}

//Mudar qualidade do video
function mudarQualidade(q,autoTime){
	var q;
	if(q == "auto"){
		player_botao_qualidade_auto.style.borderWidth = "0px 0px 0px 3px";
		player_botao_qualidade_1080.style.borderWidth = "0px";
		player_botao_qualidade_720.style.borderWidth = "0px";
		player_botao_qualidade_360.style.borderWidth = "0px";
		player_botao_qualidade_144.style.borderWidth = "0px";
		if(autoTime == "first"){
			video.src = cloud + getCk("autoQualidade") + ".mp4";
		}
		qualidadeChangeStatus = false;
		setCk("qualidade", "auto", 30);
		configFechar();
	}else if(q == "1080"){
		player_botao_qualidade_auto.style.borderWidth = "0px";
		player_botao_qualidade_1080.style.borderWidth = "0px 0px 0px 3px";
		player_botao_qualidade_720.style.borderWidth = "0px";
		player_botao_qualidade_360.style.borderWidth = "0px";
		player_botao_qualidade_144.style.borderWidth = "0px";
		var temptime = video.currentTime;
		stplay = true;
		if(video.paused && !video.playing){
			stplay = false;
		}
		video.src = cloud + "1080.mp4";
		video.currentTime = temptime;
		setCk("qualidade", "1080", 30);
		if(stplay){
			video.play();
		}else{
			video.pause();
		}
		configFechar();
		qualidadeChangeStatus = true;
	}else if(q == "720"){
		player_botao_qualidade_auto.style.borderWidth = "0px";
		player_botao_qualidade_1080.style.borderWidth = "0px";
		player_botao_qualidade_720.style.borderWidth = "0px 0px 0px 3px";
		player_botao_qualidade_360.style.borderWidth = "0px";
		player_botao_qualidade_144.style.borderWidth = "0px";
		var temptime = video.currentTime;
		stplay = true;
		if(video.paused && !video.playing){
			stplay = false;
		}
		video.src = cloud + "720.mp4";
		video.currentTime = temptime;
		setCk("qualidade", "720", 30);
		if(stplay){
			video.play();
		}else{
			video.pause();
		}
		configFechar();
	}else if(q == "360"){
		player_botao_qualidade_auto.style.borderWidth = "0px";
		player_botao_qualidade_1080.style.borderWidth = "0px";
		player_botao_qualidade_720.style.borderWidth = "0px";
		player_botao_qualidade_360.style.borderWidth = "0px 0px 0px 3px";
		player_botao_qualidade_144.style.borderWidth = "0px";
		var temptime = video.currentTime;
		stplay = true;
		if(video.paused && !video.playing){
			stplay = false;
		}
		video.src = cloud + "360.mp4";
		video.currentTime = temptime;
		setCk("qualidade", "360", 30);
		if(stplay){
			video.play();
		}else{
			video.pause();
		}
		configFechar();
		qualidadeChangeStatus = true;
	}else if(q == "144"){
		player_botao_qualidade_auto.style.borderWidth = "0px";
		player_botao_qualidade_1080.style.borderWidth = "0px";
		player_botao_qualidade_720.style.borderWidth = "0px";
		player_botao_qualidade_360.style.borderWidth = "0px";
		player_botao_qualidade_144.style.borderWidth = "0px 0px 0px 3px";
		var temptime = video.currentTime;
		stplay = true;
		if(video.paused && !video.playing){
			stplay = false;
		}
		video.src = cloud + "144.mp4";
		video.currentTime = temptime;
		setCk("qualidade", "144", 30);
		if(stplay){
			video.play();
		}else{
			video.pause();
		}
		configFechar();
		qualidadeChangeStatus = true;
	}else if(q == "maior"){
		var qantes = video.src[(video.src.length - 7)] + video.src[(video.src.length - 6)] + video.src[(video.src.length - 5)];
		if(qantes == "144" || qantes == "360" || qantes == "720"){
			var vid, pre;
			if(document.getElementsByTagName("video")[0].id == "vid"){
				vid = document.getElementsByTagName("video")[0];
				pre = document.getElementsByTagName("video")[1];
			}else{
				pre = document.getElementsByTagName("video")[0];
				vid = document.getElementsByTagName("video")[1];
			}
			if(qantes == "144") pre.src = cloud + "360.mp4";
			else if(qantes == "360") pre.src = cloud + "720.mp4";
			else if(qantes == "720") pre.src = cloud + "1080.mp4";
			pre.load();
			pre.currentTime = vid.currentTime;
			qualidadeChangeStatus = true;
			console.log("Carregando video...")
			pre.onloadeddata = function(e){
				setTimeout(function (){
					pre.volume = vid.volume;
					if(parseInt(pre.currentTime) != parseInt(vid.currentTime)){
						pre.currentTime = vid.currentTime;
					}
					vid.id = "vidPRE"
					pre.id = "vid";
					preplay = true;
					if(vid.paused && !vid.playing){
						preplay = false;
					}
					pre.currentTime = vid.currentTime;
					vid.src = "";
					if(preplay){
						pre.play();
					}else{
						pre.pause();
					}
					console.log("Aumentou a quali.");
					video = document.getElementById("vid");
					videoPRE = document.getElementById("vidPRE");
					videoEvents();
					setCk("autoQualidade", qantes , 30);
					setTimeout(function (){
						qualidadeChangeStatus = false;
					}, 2000);
				}, 2500);
			};
		}
	}else if(q == "menor"){
		var qantes = video.src[(video.src.length - 7)] + video.src[(video.src.length - 6)] + video.src[(video.src.length - 5)];
		if(qantes == "360" || qantes == "720" || qantes == "080"){
			var vid, pre;
			if(document.getElementsByTagName("video")[0].id == "vid"){
				vid = document.getElementsByTagName("video")[0];
				pre = document.getElementsByTagName("video")[1];
			}else{
				pre = document.getElementsByTagName("video")[0];
				vid = document.getElementsByTagName("video")[1];
			}
			if(qantes == "360") pre.src = cloud + "144.mp4";
			else if(qantes == "720") pre.src = cloud + "360.mp4";
			else if(qantes == "080") pre.src = cloud + "720.mp4";
			pre.load();
			pre.currentTime = vid.currentTime;
			qualidadeChangeStatus = true;
			console.log("Carregando video...")
			pre.onloadeddata = function(e){
				setTimeout(function (){
					pre.volume = vid.volume;
					if(parseInt(pre.currentTime) != parseInt(vid.currentTime)){
						pre.currentTime = vid.currentTime;
					}
					vid.id = "vidPRE"
					pre.id = "vid";
					preplay = true;
					if(vid.paused && !vid.playing){
						preplay = false;
					}
					pre.currentTime = vid.currentTime;
					vid.src = "";
					if(preplay){
						pre.play();
					}else{
						pre.pause();
					}
					console.log("Diminuiu a quali.");
					video = document.getElementById("vid");
					videoPRE = document.getElementById("vidPRE");
					videoEvents();
					setCk("autoQualidade", qantes , 30);
					setTimeout(function (){
						qualidadeChangeStatus = false;
					}, 2000);
				}, 2500);
			};
		}
	}
	if(autoTime == "first"){
		video.currentTime = ck_tempo;
	}
}

function videoCarregando(){
	player_carregando_css.style.display = "initial";
	videoCarregadovar = false;
}

function videoCarregado(){
	player_carregando_css.style.display = "none";
	videoCarregadovar = true;
	
}

//Animações

function animar(a){
	if(a == "play" || a == 1){
		player_animacao_play_div.style.opacity = 0;
		player_animacao_play_div.style.zIndex = "5";
		player_animacao_play_div.style.width = "140px";
		player_animacao_play_div.style.height = "140px";
		player_animacao_play.style.width = "50px";
		player_animacao_play.style.left = "55%";
		setTimeout(function(){
			player_animacao_play_div.style.zIndex = "1";
			player_animacao_play_div.style.width = "90px";
			player_animacao_play_div.style.height = "90px";
			player_animacao_play.style.width = "40px";
			player_animacao_play_div.style.opacity = 1;
		}, 300);
	}else if(a == "pause" || a == 2){
		player_animacao_pause_div.style.opacity = 0;
		player_animacao_pause_div.style.zIndex = "5";
		player_animacao_pause_div.style.width = "140px";
		player_animacao_pause_div.style.height = "140px";
		player_animacao_pause.style.width = "50px";
		player_animacao_pause.style.left = "50.5%";
		setTimeout(function(){
			player_animacao_pause_div.style.opacity = 1;
			player_animacao_pause_div.style.zIndex = "1";
			player_animacao_pause_div.style.width = "90px";
			player_animacao_pause_div.style.height = "90px";
			player_animacao_pause.style.width = "40px";
		}, 300);
	}else if(a == "direita" || a == 3){
		player_animacao_direita_div.style.opacity = 0;
		player_animacao_direita_div.style.zIndex = "5";
		player_animacao_direita_div.style.width = "140px";
		player_animacao_direita_div.style.height = "140px";
		player_animacao_direita.style.width = "50px";
		player_animacao_direita.style.left = "50%";
		setTimeout(function(){
			player_animacao_direita_div.style.opacity = 1;
			player_animacao_direita_div.style.zIndex = "1";
			player_animacao_direita_div.style.width = "90px";
			player_animacao_direita_div.style.height = "90px";
			player_animacao_direita.style.width = "40px";
		}, 300);
	}else if(a == "esquerda" || a == 4){
		player_animacao_esquerda_div.style.opacity = 0;
		player_animacao_esquerda_div.style.zIndex = "5";
		player_animacao_esquerda_div.style.width = "140px";
		player_animacao_esquerda_div.style.height = "140px";
		player_animacao_esquerda.style.width = "50px";
		player_animacao_esquerda.style.left = "50%";
		setTimeout(function(){
			player_animacao_esquerda_div.style.opacity = 1;
			player_animacao_esquerda_div.style.zIndex = "1";
			player_animacao_esquerda_div.style.width = "90px";
			player_animacao_esquerda_div.style.height = "90px";
			player_animacao_esquerda.style.width = "40px";
		}, 300);
	}
}

//API Volume

function fVolume(fuc){
	if(fuc == "abrircaixa"){
		if(player_volume_caixa.style.display != "none"){}else{
			if(!volume_block){
				player_volume_caixa.style.display = "initial";
			}
		}
	}else if(fuc == "fecharcaixa"){
		if(player_volume_caixa.style.display != "none"){
			player_volume_caixa.style.display = "none";
		}
	}else if(fuc == "voltarvolume"){
		video.volume = getCk(id + "_volume");
		fVolume("fecharcaixa");
		player_volume_si.value = getCk(id + "_volume");
		if(getCk(id + "_volume") <= 0.5){
			player_volume_0.style.display = "none";
			player_volume_1.style.display = "initial";
			player_volume_2.style.display = "none";
		}else{
			player_volume_0.style.display = "none";
			player_volume_1.style.display = "none";
			player_volume_2.style.display = "initial";
		}
		volume_block = true;
		setTimeout(function(){ volume_block = false; }, 100);
	}else if(fuc == "volume0"){
		video.volume = 0;
		player_volume_si.value = 0;
		fVolume("fecharcaixa");
		player_volume_0.style.display = "initial";
		player_volume_1.style.display = "none";
		player_volume_2.style.display = "none";
		volume_block = true;
		setTimeout(function(){ volume_block = false; }, 100);
	}else if(fuc == "seek"){
		video.volume = player_volume_si.value;
		setCk(id + "_volume", video.volume, 365);
		if(player_volume_si.value <= 0.5 && player_volume_si.value != 0){
			player_volume_0.style.display = "none";
			player_volume_1.style.display = "initial";
			player_volume_2.style.display = "none";
		}else if(player_volume_si.value > 0.5){
			player_volume_0.style.display = "none";
			player_volume_1.style.display = "none";
			player_volume_2.style.display = "initial";
		}else if(player_volume_si.value == 0){
			player_volume_0.style.display = "initial";
			player_volume_1.style.display = "none";
			player_volume_2.style.display = "none";
		}
		player_volume_si.style.background = "linear-gradient(to right,rgb(87,104,222) 0%,rgb(87,104,222) " + (player_volume_si.value * 100) + "%,rgb(87,104,222) " + (player_volume_si.value * 100) + "%,rgb(87,104,222) " + (player_volume_si.value * 100) + "%,rgba(235,235,235,0.8) " + (player_volume_si.value * 100) + "%,rgba(235,235,235,0.8) 100%) !important";
	}else if(fuc == "initial"){
		if(ck_volume <= 0.5 && ck_volume != 0){
			player_volume_0.style.display = "none";
			player_volume_1.style.display = "initial";
			player_volume_2.style.display = "none";
		}else if(ck_volume > 0.5){
			player_volume_0.style.display = "none";
			player_volume_1.style.display = "none";
			player_volume_2.style.display = "initial";
		}else if(ck_volume == 0){
			player_volume_0.style.display = "initial";
			player_volume_1.style.display = "none";
			player_volume_2.style.display = "none";
		}
	}
}

//API

function pVideo(fuc, txt){
	//Variaveis Globais da API
	var fuc;
	var video_tempo;
	var video_duracao;
	
	if(fuc == "tempoDecorrido"){
		var minutos;
		var segundos;
		var horas;
		
		minutos = Math.floor((video.duration/100) * (player_progresso.value/10) /60);
		segundos = Math.floor((video.duration/100) * (player_progresso.value/10) - (minutos*60));
		
		video_tempo = zeroAdd(minutos, 2) + ":" + zeroAdd(segundos, 2);
		
		return video_tempo;
	}
	if(fuc == "tempoTotal"){
		var minutos;
		var segundos;
		var horas;
		
		minutos = Math.floor(video.duration/60);
		segundos = Math.floor(video.duration - (minutos*60));
		
		video_duracao = zeroAdd(minutos, 2) + ":" + zeroAdd(segundos, 2);
		
		return video_duracao;
	}
	if(fuc == "reproduzindo"){
		if(video.paused){
			return false;
		}else{
			return true;
		}
	}
	if(fuc == "tempoCarregado"){
		if(!videoCarregadovar || !video.buffered.length){
			return 0;
		}else if(!pVideo("reproduzindo")){
			return video.buffered.end(progresso_carregado_num);
		}
		progresso_carregado_num = 0;
		var condicao = true;
		while(condicao){
			if(progresso_carregado_num > video.buffered.length || progresso_carregado_num < 0){
				progresso_carregado_num = 0;
			}else if(video.buffered.end(progresso_carregado_num) >= video.currentTime && video.buffered.start(progresso_carregado_num) <= video.currentTime){
				condicao = false;
			}else{
				progresso_carregado_num = progresso_carregado_num + 1;
			}
		}
		return video.buffered.end(progresso_carregado_num);
	}
	if(fuc == "mediaBuffer"){
		var variacao = 0;
		for(a = 0; a < 25; a++){
			variacao = variacao + variacaoBuffer[a];
		}
		return variacao/25;
	}
	if(fuc == "status"){
		if(pVideo("tempoDecorrido") != "NaN:NaN" && pVideo("tempoTotal") != "NaN:NaN") return "pronto";
		else return "carregando...";
	}
}


//Funções adicionais

function zeroAdd(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString+n;
}

//Função para detectar remoção fullscreen
if(document.addEventListener){
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
}
function exitHandler() {
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		videoTelaNormal();
	}
}

function teclaEventos(){
	var e = window.event ? window.event : e;
	if(e.keyCode == 32){
		videoClick();
	}else if(e.keyCode == 39){
		video.currentTime = video.currentTime + 5;
		animar(3);
	}else if(e.keyCode == 37){
		video.currentTime = video.currentTime - 5;
		animar(4);
	}else if(e.keyCode == 70){
		videoTelaCheiaMudar();
	}
}

//Addons Copiados
function setCk(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCk(cname){
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

//FUNÇÃO DE ERRO
function reportError(erro){
	
}
//Funções para teste
//setInterval(mostrar("display", pVideo("tempoCarregado")), 500);

//function mostrar(f, v){
//	var f;
//	var v;
//	if(f == "display"){
//		if(document.getElementById("mostrar.test.temp")){
//			document.getElementById("mostrar.test.temp").innerHTML = v;
//		}else{
//			var dv = document.createElement("div");
//			document.body.appendChild(dv);
//			dv.id = "mostrar.test.temp";
//			dv.style.position = "absolute";
//			dv.style.zIndex = "500";
//			dv.style.width = "150px";
//			dv.style.height = "100px";
//			dv.style.top = "50%";
//			dv.style.right = "20px";
//			dv.style.backgroundColor = "rgba(0,0,0,0.6)";
//			dv.innerHTML = v;
//		}
//	}
//}
