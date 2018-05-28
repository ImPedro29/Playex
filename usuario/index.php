<?php
	require $_SERVER['DOCUMENT_ROOT'] . "/modulos/php/sessao.php";
	$token = $_COOKIE["token"];
	
	require("/modulos/php/mysql.php");
	
	$uip = $_SERVER['REMOTE_ADDR'];
	
	$status = false;
	$status2 = false;
		
	$sql4 = "SELECT * FROM playex_usuarios";
	$res4 = $mq->query($sql4);
	
	if($res4->num_rows > 0){
		while($row4 = $res4->fetch_assoc()){
			if($row4["uip"] == $uip && $row4["token"] == $token){
				$email = $row4["email"];
				$data = $row4["data"];
				$apelido = $row4["apelido"];
				$status = true;
				break;
			}
		}
		if(!$status){
			die("<META http-equiv='refresh' content='0;URL=https://playex.link/usuario/entrar/'>");
		}
	}
	
	//Upload da Foto
	$foto = $_FILES["foto"];
	$checar = getimagesize($_FILES["foto"]["tmp_name"]);
    if($checar !== false){
        $fotoc = addslashes(file_get_contents ($_FILES['foto']['tmp_name']));
		$sql2 = "SELECT * FROM playex_usuarios";
		$res2 = $mq->query($sql2);
		
		while($row2 = $res2->fetch_assoc()){
			if($row2["uip"] == $uip && $row2["token"] == $token){
				$sql3 = "UPDATE playex_usuarios SET foto='$fotoc' WHERE email='". $row2["email"] ."'";
				$mq->query($sql3);
				$status2 = true;
				break;
			}
		}
		if(!$status){
			die("<META http-equiv='refresh' content='0;URL=https://playex.link/usuario/entrar/'>");
		}
    }else{
		if(isset($foto)){
			echo "<div id='aviso' style='background-color: rgba(253, 44, 44, 0.83);'>Faça o upload de uma imagem.</div>";
		}
	}
	
	//Se tiver alguma foto
	$sql3 = "SELECT * FROM playex_usuarios";
	$res3 = $mq->query($sql3);
	
	while($row3 = $res3->fetch_assoc()){
		if($row3["uip"] == $uip && $row3["token"] == $token){
			if($row3["foto"] != null){
				$fotoraw = "data:image/png;base64," . base64_encode($row3["foto"]);
			}else{
				$fotoraw = "/imagens/usuario/usuario-upload.png";
			}
			break;
		}
	}

	
	//Fecha Mysql
	$mq->close();
?>
<html>
	<head>
		<title>PlayEx | Usuario</title>
		<link rel="icon" type="image/png" href="https://playex.link/imagens/fav.png">
		<link rel="stylesheet" type="text/css" href="/modulos/css/global.css">
		<link rel="stylesheet" type="text/css" href="/modulos/css/usuario.css">
		<script src="/modulos/js/global.js" charset="UTF-8"></script>
		<script src="/modulos/js/usuario.js" charset="UTF-8"></script>
	</head>

	<body>
		<header>
			<div id="cima-div">
				<a href="/usuario/"><img id="logo" src="/imagens/logo-n1-400.png" height="38"/></a>
				<button id="usuario-upload"><img id="usuario-imagem-deupload" height="17" src="/imagens/usuario/usuario-upload.png"/> Upload</button>
			</div>
		</header>
		<div id="box-s">
			<div id="usuario-info">
				<img id="usuario-info-foto" src="<?php echo $fotoraw; ?>"/>
					<span id="usuario-info-nome"><?php if($apelido == null){ echo 'Clique para mudar seu apelido'; }else{ echo $apelido; } ?></span>
					<input value="<?php if($apelido == null){ echo ''; }else{ echo $apelido; } ?>" id="usuario-acao-nome" name="usuario-nome"/>
					<div id="usuario-traco-nome"></div><br><br>
					<span id="usuario-info-email">Seu email: <?php echo $email; ?></span><br>
					<span id="usuario-info-registro">Data de cadastro: <?php echo $data; ?></span><br>
					<span id="usuario-acao-mudarsenha">Alterar senha</span><br><br><br>
					<iframe id="usuario-iframe-mudarsenha" src="/usuario/mudarsenha/" frameborder="0"></iframe>
					<form method="post" enctype="multipart/form-data" style="display: none;">
						<input type="file" name="foto" id="usuario-acao-foto">
						<input id="usuario-submit-foto" type="submit">
					</form>
			</div>
		</div>
		<div id="usuario-fundopreto"></div>
		<div id="usuario-upload-box"><iframe id="usuario-upload-iframe" src="http://process.playex.link"/></div>
	</body>

</html>