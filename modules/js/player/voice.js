var recognizing = false;
function start() {
  recognition.lang = "pt-BR";
  recognition.start();
}
if (!('webkitSpeechRecognition' in window)){
  //Avisar que não tem suporte
}else{
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = false;
	recognition.onstart = function() {
		recognizing = true;
		//Quando Iniciar a recognition
	};
	recognition.onerror = function(event){
		if (event.error == 'no-speech') {
			//Erro no speech
		}
		if (event.error == 'audio-capture'){
			//Erro na captura de audio
		}
		if (event.error == 'not-allowed'){
			//Microfone nao ativado
		}
	};
	recognition.onend = function(){
		recognizing = false;
		start();
	};
	recognition.onresult = function(event){
		for (var i = event.resultIndex; i < event.results.length; ++i){
			var speaked;
			if (event.results[i].isFinal){
				speaked = event.results[i][0].transcript;
			}else{
				speaked = event.results[i][0].transcript;
			}
			fVideo("comandoVoz", speaked);
		}
	};
}