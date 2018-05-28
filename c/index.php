<?php
	$conteudo = $_GET["conteudo"];
	if($conteudo == "" || $conteudo == null){
		$status = "Sem dados";
	}
	
	if($status == "Sem dados"){
		return;
	}
?>
<html>
	<head>
		<title>PlayEx</title>
		<link rel="icon" href="/imagens/fav.png" sizes="16x16" type="image/png">
		<link rel="stylesheet" type="text/css" href="/modulos/css/global.css">
		<script src="/modulos/js/global.js" charset="UTF-8"></script>
	</head>
	<body>
	<?php
		if($status = "Sem dados"){
			echo "<div id='box'><h1 id='titulo'>Nome da série:</h1><br> <input id='serie'></input> </div>";
		}
	?>

	</body>
	<style>
		#box{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		#titulo{
			color: white;
			font-size: 20px;
			font-family: "Arial", sans-serif;
			margin-bottom: 3px;
			text-align: center;
		}
		#serie{
			width: 280px;
			height: 35px;
			outline: none;
			font-family: "Arial", sans-serif;
			border-width: 0px;
			border-color: transparent;
			padding-left: 3px;
			font-size: 20px;
			color: rgba(0,0,0,0.9);
		}

	</style>
	
	
	<script>
		<?php
			if($status = "Sem dados"){
				echo "document.getElementById('serie').onkeypress = function(event){if(event.which == 13 || event.keyCode == 13){ window.location = '/c?conteudo=' + document.getElementById('serie').value; return false;} return true;};";
			}
		?>
	</script>

</html>