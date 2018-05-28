<?php
	//Database
	require("/modulos/php/mysql.php");
	
	//Variaveis
	$id = $_GET["id"];
	$u_inicio = "00:00";
	$qualidade_auto = "border-width: 0px 0px 0px 3px;";
		
	//Serie
	$serie = $_GET["serie"];
	$ep = $_GET["ep"];
	$temp = $_GET["temp"];
	
	if(isset($serie) && !isset($ep) || isset($serie) && !isset($temp)){
		die("Falha! Link incorreto. Erro: Falta de informação (ep, temp).");
	}else if(isset($serie) && isset($ep) && isset($temp)){
		
		$sql2 = "SELECT * FROM playex_series";
		$res2 = $mq->query($sql2);
		
		//Testar se a serie e o episodio existe na database
		if($res2->num_rows > 0){
			while($row2 = $res2->fetch_assoc()){
				if($serie == $row2["serie"] && $ep == $row2["ep"] && $temp == $row2["temp"]){
					$status2 = true;
					$id = $row2["vid"];
					break;
				}
			}
		}else{
			$status2 = false;
		}
		if($status2 == false){
			die("Falha! Link incorreto. Erro: Série não encontrado na database.");
		}
		
	}
	
	//Video ID
	if(!isset($id)){
		die("Falha! Link incorreto. Erro: Falta de informação (id).");
	}
	
	//Database Check pelo ID
	
	$sql = "SELECT * FROM playex_videos";
	$res = $mq->query($sql);
	
	if($res->num_rows > 0){
		while($row = $res->fetch_assoc()){
			if($id == $row["vid"]){
				$vusuario = $row["usuario"];
				$vtitulo = $row["titulo"];
				$vinicio = $row["inicio"];
				$vfim = $row["fim"];
				$vplaylist = $row["playlist"];
				$vdata = $row["data"];
				$vvisu = (int)$row["visualizacoes"];
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
	if(!$_COOKIE["visualidado"]){
		setcookie("visualidado", true);
		$sql3 = "UPDATE playex_videos SET visualizacoes='" . ($vvisu + 1) . "' WHERE vid='$id'";
		$mq->query($sql3);
	}
?>

<html>
	<head>
		<title>PlayEx | <?php echo $vtitulo; ?></title>
		<link rel="icon" href="/imagens/fav.png" sizes="16x16" type="image/png">
		<link rel="stylesheet" type="text/css" href="/modulos/css/global.css">
		<link rel="stylesheet" type="text/css" href="/modulos/css/player/player.css">
		<link rel="stylesheet" type="text/css" href="/modulos/css/player/carregamento.css">
		<script src="/modulos/js/global.js" charset="UTF-8"></script>
		<script src="/modulos/js/player/player.js" charset="UTF-8"></script>
	</head>
	<body>
		
		<!-- Carregamento (Estilo I/CSS) -->
		<div id="player-carregando-css">
			<div style="width:100%;height:100%" class="lds-eclipse">
				<div></div>
			</div>
		</div>
	
		<div id="player-baixo">
		
			<!-- Parte da Esquerda -->
			<img id="player-play" src="/imagens/player/play.png"/>
			<img id="player-pause" src="/imagens/player/pause.png"/>
			<img id="player-volume0" src="/imagens/player/volume-0.png"/>
			<img id="player-volume1" src="/imagens/player/volume-1a50.png"/>
			<img id="player-volume2" src="/imagens/player/volume-51a100.png"/>
			<span id="player-tempo">00:00 / 00:00</span>
			
			<!-- Parte da Direita -->
			<img id="player-telacheia" src="/imagens/player/telacheia.png"/>
			<img id="player-telanormal" src="/imagens/player/telanormal.png"/>
			<img id="player-configuracoes" src="/imagens/player/configuracoes.png"/>
			<img id="player-feedback" src="/imagens/player/feedback.png"/>
			
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
				<button style="<?php echo $qualidade_auto;?>" id="player-qualidade-selector-qualidade-botao-auto">
					AUTO
				</button>
				<br>
				<button style="<?php echo $qualidade_1080;?>" id="player-qualidade-selector-qualidade-botao-1080">
					1080p
				</button>	
				<br>
				<button style="<?php echo $qualidade_720;?>" id="player-qualidade-selector-qualidade-botao-720">
					720p
				</button>
				<br>
				<button style="<?php echo $qualidade_360;?>" id="player-qualidade-selector-qualidade-botao-360">
					360p
				</button>
				<br>
				<button style="<?php echo $qualidade_144;?>" id="player-qualidade-selector-qualidade-botao-144">
					144p
				</button>
			</div>
		</div>
		
		<!-- Animações (Pause, play e etc..) -->
		<div id="player-animacao-play-div">
			<img id="player-animacao-play" src="/imagens/player/play.png"/>
		</div>
		
		<!-- Parte de cima do player -->
		<div id="player-cima">
			<h1 id="player-titulo"><?php echo $vtitulo; ?></h1>
		</div>
		
		<!-- Vídeo em sí -->
		<video id="vid" src="https://storage.googleapis.com/playex_videos/users/<?php echo $id; ?>/720.mp4"></video>
		
	</body>
	<script>
		var id = "<?php echo $id; ?>";
	</script>
</html>