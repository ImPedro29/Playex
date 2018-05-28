<?php
	require("/modulos/php/mysql.php");
	
	$email = $_POST["email"];
	$senha = $_POST["senha"];
	$captcha = $_POST["g-recaptcha-response"];
	$redirecionar = $_POST["redirecionar"];
	$letras = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%", 50)), 0, 50);
	$token = $letras;
	
	setcookie('token',$token,0,'/','playex.link');
	
	$response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Lco9SQUAAAAAG08ZSQhW3HAxfZTMevjkOeoGLYg&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
	if($response['success'] == false){
		header("Location: https://playex.link/usuario/entrar?erro=2");
		return;
	}
	
	if($email == null || $senha == null){
		header("Location: https://playex.link/usuario/entrar?erro=1");
		return;
	}
	
	$result = $mq->query("SELECT email FROM playex_usuarios WHERE email = '$email'");
	
	if($result->num_rows == 0){
		header("Location: https://playex.link/usuario/entrar?erro=3");
		return;
	}
	
	$sql = "SELECT * FROM playex_usuarios";
	$res = $mq->query($sql);
	$stats;

	while($row = $res->fetch_assoc()){
		if($row["email"] == $email && $row["senha"] == md5($senha)){
			$stats = "1";
			break;
		}
	}
	
	if($stats == null){
		header("Location: https://playex.link/usuario/entrar?erro=4");
		return;
	}else{
		$uip = $_SERVER['REMOTE_ADDR'];
		$sql2 = "UPDATE playex_usuarios SET token='$token', uip='$uip' WHERE email='$email'";
		$mq->query($sql2);
	}
	
	if($redirecionar == null){
		header('Location: https://playex.link/usuario/');
	}else{
		header('Location: https://playex.link' . $redirecionar);
	}
	
	$mq->close();

?>