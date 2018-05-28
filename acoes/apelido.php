<?php
	require $_SERVER['DOCUMENT_ROOT'] . "/modulos/php/sessao.php";
	$apelido = $_GET["apelido"];
	$token = $_COOKIE["token"];
	
	require("/modulos/php/mysql.php");
	
	$uip = $_SERVER['REMOTE_ADDR'];
		
	$sql = "SELECT * FROM playex_usuarios";
	$res = $mq->query($sql);
	
	if($res->num_rows > 0){
		while($row = $res->fetch_assoc()){
			if($row["uip"] == $uip && $row["token"] == $token){
				$sql2 = "UPDATE playex_usuarios SET apelido='$apelido' WHERE email='". $row["email"] ."'";
				$mq->query($sql2);
				break;
			}
		}
	}
	
	$mq->close();
?>