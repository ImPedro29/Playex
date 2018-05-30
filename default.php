<?php
	//VARIAVEIS Referentes somente a esta página
	
	$title = "Playex"; // Titulo
	$global_scripts = array("/modules/js/index/code1.js", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"); //Scripts
	$global_css = array("/modules/css/index/estilo1.js"); //Estilos
	$icon = "images/icon.png";
	
	//Banco de Dados
	require("/modules/php/mysql/connect.php");
?>
<!DOCTYPE html>
<html>
	<!-- ESTRUTURA -->
	<?php
		require("head.php"); // HEAD
		require("modules/php/menu.php"); // MENU
	?>
</html>