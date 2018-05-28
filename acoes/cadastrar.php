<?php
		
	require("/modulos/php/mysql.php");
	
	$email = $_POST["email"];
	$senha1 = $_POST["senha1"];
	$senha2 = $_POST["senha2"];
	$captcha = $_POST["g-recaptcha-response"];
	$data =  getdate()["mday"] .'/'. getdate()["mon"] .'/'. getdate()["year"];
	$letras = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%", 100)), 0, 100);
	$token = $letras;
	$ativacaoletras = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%", 35)), 0, 35);
	$ativacao = $ativacaoletras;
	$body = str_replace("@condigodeativacao@", $ativacao ,file_get_contents("https://playex.link/usuario/email.php"));
	$headers = "From: contato@playex.link\r\n";
	$headers .= "Reply-To: contato@playex.link\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	
	setcookie('token',$token,0,'/','playex.link');
	
	if($senha1 != $senha2){
		header("Location: https://playex.link/usuario/cadastro?erro=4");
		return;
	}
	
	$response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Lco9SQUAAAAAG08ZSQhW3HAxfZTMevjkOeoGLYg&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
	if($response['success'] == false){
		header("Location: https://playex.link/usuario/cadastro?erro=2");
		return;
	}
	
	if($email == null){
		header("Location: https://playex.link/usuario/cadastro?erro=1");
		return;
	}
	
	$result = $mq->query("SELECT id FROM playex_usuarios WHERE email = '$email'");
	
	if($result->num_rows == 0){}else{
		header("Location: https://playex.link/usuario/cadastro?erro=3");
		return;
	}
	
	
	$sql = "INSERT INTO playex_usuarios (email, senha, data, token, uip, ativacao) VALUES ('$email', '". md5($senha1) ."', '$data', '$token', '". $_SERVER['REMOTE_ADDR'] ."', '$ativacao')";
	$mq->query($sql);
		
	
	header('Location: https://playex.link/usuario/');
	
	mail($email,"Ative sua conta! [PlayEx]", $body, $headers);
	
	$mq->close();

?>