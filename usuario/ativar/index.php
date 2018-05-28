<?php
	
	$token = $_COOKIE["token"];
	
	require("/modulos/php/mysql.php");
	
	$uip = $_SERVER['REMOTE_ADDR'];
		
	$sql = "SELECT * FROM playex_usuarios";
	$res = $mq->query($sql);
	$res2 = $mq->query($sql);
	$res3 = $mq->query($sql);
	
	if($res3->num_rows > 0){
		while($row = $res3->fetch_assoc()){
			if($row["ativacao"] == "ATIVADO" && $row["token"] == $token && $row["uip"] == $uip){
				die("<script> alert('Sua conta já está ativada.'); window.location='/usuario/'; </script>");
				break;
			}else{
				$status = false;
			}
		}
	}
	
	if($res->num_rows > 0){
		while($row = $res->fetch_assoc()){
			if($row["uip"] == $uip && $row["token"] == $token){
				$status = true;
				break;
			}else{
				$status = false;
			}
		}
	}else{
		$status = false;
	}
	if($status == false){
		die("<META http-equiv='refresh' content='0;URL=https://playex.link/usuario/entrar?redi=/usuario/ativar?id=". $_GET["id"] ."'>");
	}else{
		$id = $_GET["id"];
		while($row2 = $res2->fetch_assoc()){
			if($row2["ativacao"] == $id && $row2["token"] == $_COOKIE["token"]){
				$sql2 = "UPDATE playex_usuarios SET ativacao='ATIVADO' WHERE email='". $row2["email"] ."'";
				$mq->query($sql2);
				$status2 = true;
				break;
			}else{
				$status2 = false;
			}
		}
	}
	if($status2 == true){
		die("<META http-equiv='refresh' content='0;URL=https://playex.link/usuario?res=ativada'>");
	}else if($status2 == false){
		if($_GET["id"] != null){
			echo "<script> document.getElementById('ativacao-falha').display = 'initial'; </script>";
		}
	}
	
	$mq->close();
?>

<html>
	<head>
		<title>PlayEx | Ativar</title>
		<link rel="icon" href="/imagens/fav.png" sizes="16x16" type="image/png">
		<link rel="stylesheet" type="text/css" href="/modulos/css/global.css">
		<link rel="stylesheet" type="text/css" href="/modulos/css/ativar.css">
		<script src="/modulos/js/global.js" charset="UTF-8"></script>
		<script src="/modulos/js/ativar.js" charset="UTF-8"></script>
	</head>

	<body>
		<header>
			<div id="cima-div">
				<a href="/usuario/"><img id="logo" src="/imagens/logo-n1-400.png" height="38"/></a>
				<button id="usuario-upload"><img id="usuario-imagem-deupload" height="17" src="/imagens/usuario/usuario-upload.png"/> Upload</button>
			</div>
		</header>
		<div id="box-s">
			<div id="link-div">
				<form action="index.php" method="GET"><br><br><br><br><br><br><br><br><br>
					<center><input id="link" placeholder="Cole seu código aqui" type="text" name="id"><br><br>
					<span id="ativacao-falha">Código inválido.</span></center>
					<input id="link-botao" type="submit">				
				</form>
			</div>
		</div>
	</body>

</html>