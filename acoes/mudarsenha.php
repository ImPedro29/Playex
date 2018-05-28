<html>
<?php
	require $_SERVER['DOCUMENT_ROOT'] . "/modulos/php/sessao.php";
	$token = $_COOKIE["token"];
	$senhaAntiga = md5($_POST["senhaAntiga"]);
	$senhaNova = md5($_POST["senhaNova"]);
	
	require("/modulos/php/mysql.php");
	
	$uip = $_SERVER['REMOTE_ADDR'];
	
	$status = false;
		
	$sql2 = "SELECT * FROM playex_usuarios";
	$res2 = $mq->query($sql2);
	
	if($res2->num_rows > 0){
		while($row2 = $res2->fetch_assoc()){
			if($row2["uip"] == $uip && $row2["token"] == $token){
				if($senhaAntiga == $row2["senha"]){
					$sql2 = "UPDATE playex_usuarios SET senha='$senhaNova' WHERE email='". $row2["email"] ."'";
					$mq->query($sql2);
					$status = true;
					break;
				}
			}
		}
		if(!$status){
			die("<META http-equiv='refresh' content='0;URL=https://playex.link/usuario/mudarsenha?erro=1'>");
		}
	}
?>
	<body>
		<div id="mudarsenha-box-sucesso">
			<h1 id="mudarsenha-titulo-sucesso">Senha trocada com sucesso.</h1>
		</div>
	</body>
	<style>
		#mudarsenha-box-sucesso{
			width: 300px;
			height: 40px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			position: absolute;
			background-color: #006DF0;
			border-radius: 3px;
		}
		#mudarsenha-titulo-sucesso{
			color: white;
			font-size: 16px;
			text-align: center;
			font-family: "Arial", sans-serif;
			font-weight: normal;
			width: 100%;
			margin: 0px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			position: absolute;
		}
	</style>

</html>
