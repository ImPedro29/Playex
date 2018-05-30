<?php
	//USER => REGISTER

	//VARIAVEIS Referentes somente a esta página
	
	$loading = true;
	$loading_color = "#272727";
	$loading_size = "200px";
	$title = "Playex"; // Titulo
	$global_scripts = array("/modules/js/user/register/code1.js", "https://www.google.com/recaptcha/api.js", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"); //Scripts
	$global_css = array("/modules/css/user/register/style1.css"); //Estilos
	$icon = "/images/icon.png";
	$logo = "/images/logo.png";
	
	$premium = false; //Usuarios convidados que podem criar um Bloby
	
	//Banco de Dados
	require($_SERVER['DOCUMENT_ROOT'] . "/modules/php/mysql/connect.php");
	
	//Checar key
	if($_GET["key"] !== ""){
		$sql = "SELECT key,rank FROM keys";
		$res = $con->query($sql);
		
		if($res->num_rows > 0) {
			while($row = $res->fetch_assoc()) {
				if($row["key"] == $_GET["key"]){
					$premium = true;
				}
			}
		}
	}
?>
<!DOCTYPE html>
<html>
	<!-- ESTRUTURA -->
	<?php
		require($_SERVER['DOCUMENT_ROOT'] . "/head.php"); // HEAD
	?>
	<!-- CORPO -->
	<body>
		<div id="back">Página Inicial </div>
		<div id="box">
			<h5 id="titulo">Cadastro</h5>
			<h5 id="sub-titulo">Cadastre-se no PLAYEX!</h5>
			<form id="form" method="POST" onsubmit="return false;">
				<div id="sub-box-1">
					<div id="form-div">
						<input placeholder="Insira seu email" id="email" type="email" class="form-in" name="email">
						<h5 class="email-txt" id="form-txt">Email</h5>
					</div>
					<div id="form-div">
						<input placeholder="Insira sua senha" id="pass1" type="password" class="form-in" name="pass">
						<h5 class="first-pass-txt" id="form-txt">Senha</h5>
					</div>
					<div id="form-div">
						<input placeholder="Insira sua senha" id="pass2" type="password" class="form-in" name="passagain">
						<h5 class="sec-pass-txt" id="form-txt">Senha</h5>
					</div>
				</div>
				<div id="sub-box-2">
					<div id="form-div">
						<input placeholder="Insira seu apelido" id="nick" type="text" class="form-in" name="nickname">
						<h5 class="nick-txt" id="form-txt">Apelido</h5>
					</div>
					<div id="form-div">
					<input placeholder="Como nos encontrou?" type="text" class="form-in" name="source">
						<h5 id="form-txt">Onde Achou-nos</h5>
					</div>
				</div>
				<div id="form-end">
					<div class="g-recaptcha" data-sitekey="6Lco9SQUAAAAAIlP4_yJn8ceSzYbS3TJkgmXtpNF"></div>
					<a href="/user/login"><h1 id="possuiconta">Ja possui conta?</h1></a>
					<input id="botao-finalizar" onclick="submitRegister();" type="submit" value="Finalizar">
				</div>
			</form>
		</div>
		<?php 
			if($premium) echo '<h5 id="premium">Que incrível! Você é um dos escolhidos para estrear nossa plataforma.<br>Seja muito bem vindo meu camarada!</h5>';
			if($loading) require($_SERVER['DOCUMENT_ROOT'] . "/modules/php/loading.php"); // Loading 
		?>
	</body>
	<?php
		//Scripts
		for($i = 0; $i <= (count($global_scripts)-1); $i++){
			echo "<script src='" . $global_scripts[$i] . "'></script>";
		}
	?>
</html>