<?php
	session_set_cookie_params(60 * 60 * 24 * 365 * 100);
	$token = $_COOKIE["token"];
	
	require("/modulos/php/mysql.php");
	
	$uip = $_SERVER['REMOTE_ADDR'];
		
	$sql = "SELECT * FROM playex_usuarios";
	$res = $mq->query($sql);
	
	if($res->num_rows > 0){
		while($row = $res->fetch_assoc()){
			if($row["uip"] == $uip && $row["token"] == $token){
				header('Location: /usuario/');
			}
		}
	}
	
	$mq->close();
?>
<html>
	<head>
		<title>PlayEx | Entrar</title>
		<link rel="icon" href="/imagens/fav.png" sizes="16x16" type="image/png">
		<link rel="stylesheet" type="text/css" href="/modulos/css/global.css">
		<link rel="stylesheet" type="text/css" href="/modulos/css/entrar.css">
		<script src="/modulos/js/global.js" charset="UTF-8"></script>
		<script src="/modulos/js/entrar.js" charset="UTF-8"></script>
		<script src='https://www.google.com/recaptcha/api.js'></script>
	</head>
	
	<body>
		<div id="caixa-entrar">
			<h1 id="titulo">Entrar</h1>
			<h1 id="subtitulo">Inicie sessão no Playex!</h1>
			<form action="/acoes/logar.php" method="post">
				<input type="text" name="redirecionar" value="<?php echo $_GET["redi"]; ?>" style="display: none;"></input>
				<br><br><br><br>
				<h3 id="form-email-texto">Seu Email</h3>
				<input type="email" name="email" id="form-email"></input>
				<div id="form-email-traco"></div>
				<h3 id="form-senha-texto">Sua Senha</h3>
				<input type="password" name="senha" id="form-senha"></input>
				<div id="form-senha-traco"></div>
				<br><br><br>
				<center><div style="width: 302px; border-radius: 3px; height: 76px;" id="captcha-div"><div id="g-recaptcha" name="g-recaptcha" class="g-recaptcha" data-sitekey="6Lco9SQUAAAAAIlP4_yJn8ceSzYbS3TJkgmXtpNF"></div></div></center>
				<center><br><br>
				<input type="submit" value="Entrar" name="submit" id="form-botao"></input>
				<h3 id="form-erro"></h3>
				<br><br>
				</center>
			</form>
		</div>	
	</body>
	<?php echo "<div id='form-erro-detect' style='display: none;' >". $_GET["erro"] ."</div>"?>
</html>