<?php
	//VARIAVEIS Referentes somente a esta página
	
	$title = "Playex"; // Titulo
	$global_scripts = array("/modules/js/index/code1.js", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"); //Scripts
	$global_css = array("/modules/css/index/style1.css"); //Estilos
	$icon = "images/icon.png";
	
	//Banco de Dados
	require($_SERVER['DOCUMENT_ROOT'] . "/modules/php/mysql/connect.php");
?>
<!DOCTYPE html>
<html>
	<!-- ESTRUTURA -->
	<?php
		require($_SERVER['DOCUMENT_ROOT'] . "/head.php"); // HEAD
		require($_SERVER['DOCUMENT_ROOT'] . "/modules/php/menu.php"); // MENU
	?>
	<body>
	
	</body>
	<?php
		//Scripts
		for($i = 0; $i <= (count($global_scripts)-1); $i++){
			echo "<script src='" . $global_scripts[$i] . "'></script>";
		}
	?>
</html>