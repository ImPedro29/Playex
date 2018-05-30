<?php
	//Database
	require($_SERVER['DOCUMENT_ROOT'] . "/modules/php/mysql/connect.php");
	
	
	//Variaveis
	$id = $_GET["id"];
	$u_inicio = "00:00";
	
	//Video ID
	if(!isset($id)){
		die("Falha! Link incorreto. Erro: Falta de informação (id).");
	}
	
	//Database Check pelo ID
	
	$sql = "SELECT * FROM vids";
	$res = $con->query($sql);
	
	if($res->num_rows > 0){
		while($row = $res->fetch_assoc()){
			if($id == $row["vid"]){
				$vusuario = $row["owner"];
				$vtitulo = $row["title"];
				$vinicio = $row["seconds_start"];
				$vfim = $row["seconds_end"];
				$vplaylist = $row["playlist"];
				$vdata = $row["date"];
				$vvisu = (int)$row["views"];
				$status = true;
				break;
			}
		}
	}else{
		$status = false;
	}
	
	if($status == false){
		die("Falha! Link incorreto. Erro: Vídeo não encontrado na database.");
	}
	
	//Visualizações
	if(isset($_COOKIE["visualidado"])){
		setcookie("visualidado", true);
		$sql3 = "UPDATE vids SET views='" . ($vvisu + 1) . "' WHERE vid='$id'";
		$con->query($sql3);
	}
	
	//X Frame Options
	header_remove("X-Frame-Options");
	header('X-Frame-Options: ALLOW-FROM *');
?>

<html>
	<?php
		$title = $vtitulo; // Titulo
		$global_scripts = array("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", "/modules/js/player/all.js"); //Scripts
		$global_css = array("/modules/css/loading.css", "/modules/css/player/all.css"); //Estilos
		$icon = "/images/icon.png";
		require($_SERVER['DOCUMENT_ROOT'] . "/head.php");
	?>
	<!-- IMPORT IMPROVISADO -->
	<script src="/modules/js/player/all.js"></script>
	<body>
	
		<!-- Carregamento (Estilo I/CSS) -->
		<div id="player-carregando-css">
			<div style="width:100%;height:100%" class="lds-eclipse">
				<div></div>
			</div>
		</div>
	
		<div id="player-baixo">
		
			<!-- Parte da Esquerda -->
			<img id="player-play" src="/images/player/play.png"/>
			<img id="player-pause" src="/images/player/pause.png"/>
			<img id="player-volume0" src="/images/player/volume-0.png"/>
			<img id="player-volume1" src="/images/player/volume-1a50.png"/>
			<img id="player-volume2" src="/images/player/volume-51a100.png"/>
			<span id="player-tempo">00:00 / 00:00</span>
			
			<!-- Parte da Direita -->
			<img id="player-telacheia" src="/images/player/telacheia.png"/>
			<img id="player-telanormal" src="/images/player/telanormal.png"/>
			<img id="player-configuracoes" src="/images/player/configuracoes.png"/>
			<img id="player-feedback" src="/images/player/feedback.png"/>
			
			<!-- Parte do Meio -->
			<input id="player-progresso" min="0" max="1000" step="1" value="0" type="range">
			<span id="player-progresso-tempo">00:00</span>
			
		</div>
		
		<!-- Caixa da seleção de volume -->
		<div id="player-volume-caixa">
			<input id="player-volume-si" min="0" max="1" step="0.01" value="1" type="range">
		</div>
		
		<!-- Seletor de qualidades (Caixa de seleção) - "Configurações" -->
		<div id="player-qualidade-seletor">
			<div id="player-qualidade-selector-qualidades">
				<button style="" id="player-qualidade-selector-qualidade-botao-auto">
					AUTO
				</button>
				<br>
				<button style="" id="player-qualidade-selector-qualidade-botao-1080">
					1080p
				</button>	
				<br>
				<button style="" id="player-qualidade-selector-qualidade-botao-720">
					720p
				</button>
				<br>
				<button style="" id="player-qualidade-selector-qualidade-botao-360">
					360p
				</button>
				<br>
				<button style="" id="player-qualidade-selector-qualidade-botao-144">
					144p
				</button>
			</div>
		</div>
		
		<!-- Animações (Pause, play e etc..) -->
		<div id="player-animacao-play-div">
			<img id="player-animacao-play" src="/images/player/play.png"/>
		</div>
		<div id="player-animacao-pause-div">
			<img id="player-animacao-pause" src="/images/player/pause.png"/>
		</div>
		<div id="player-animacao-direita-div">
			<img id="player-animacao-direita" src="/images/player/direita.png"/>
		</div>
		<div id="player-animacao-esquerda-div">
			<img id="player-animacao-esquerda" src="/images/player/esquerda.png"/>
		</div>
		
		<!-- Parte de cima do player -->
		<div id="player-cima">
			<h1 id="player-titulo"><?php echo $vtitulo; ?></h1>
		</div>
		
		<!-- Vídeo preload -->
		<video id="vidPRE" src=""></video>
		
		<!-- Vídeo em sí -->
		<video id="vid" src=""></video>
		
	</body>
	<script>
		var id = "<?php echo $id; ?>";
	</script>
</html>