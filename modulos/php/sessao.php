<?php
	$token = $_COOKIE["token"];
	
	require("mysql.php");
	
	$uip = $_SERVER['REMOTE_ADDR'];
		
	$sql = "SELECT * FROM playex_usuarios";
	$res = $mq->query($sql);
	
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
		die("<META http-equiv='refresh' content='0;URL=https://playex.link/usuario/entrar/'>");
	}
	
	$mq->close();
?>