<html>
	<head>
		<title>PlayEx | Cadastro</title>
		<link rel="icon" href="/imagens/fav.png" sizes="16x16" type="image/png">
		<link rel="stylesheet" type="text/css" href="/modulos/css/global.css">
		<link rel="stylesheet" type="text/css" href="/modulos/css/cadastro.css">
		<script src="/modulos/js/global.js" charset="UTF-8"></script>
		<script src="/modulos/js/cadastro.js" charset="UTF-8"></script>
		<script src='https://www.google.com/recaptcha/api.js'></script>
	</head>

	<body>
		<div id="caixa-cadastro">
			<h1 id="titulo">Cadastro</h1>
			<h1 id="subtitulo">Registre-se no Playex!</h1>
			<form action="/acoes/cadastrar.php" method="post">
				<br><br><br><br>
				<h3 id="form-email-texto">Seu Email</h3>
				<input type="email" name="email" id="form-email"></input>
				<div id="form-email-traco"></div>
				<h3 id="form-senha1-texto">Sua Senha</h3>
				<input type="password" name="senha1" id="form-senha1"></input>
				<div id="form-senha1-traco"></div>
				<h3 id="form-senha2-texto">Senha Novamente</h3>
				<input type="password" name="senha2" id="form-senha2"></input>
				<div id="form-senha2-traco"></div><br><br>
				<center><div style="width: 302px; border-radius: 3px; height: 76px;" id="captcha-div"><div id="g-recaptcha" name="g-recaptcha" class="g-recaptcha" data-sitekey="6Lco9SQUAAAAAIlP4_yJn8ceSzYbS3TJkgmXtpNF"></div></div></center>
				<center>
				<input type="submit" value="Cadastrar" name="submit" id="form-botao"></input>
				<h3 id="form-erro"></h3>
				<br><br>
				</center>
			</form>
		</div>
	</body>
	<?php echo "<div id='form-erro-detect' style='display: none;' >". $_GET["erro"] ."</div>"?>
</html>