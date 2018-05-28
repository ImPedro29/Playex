<?php
	require $_SERVER['DOCUMENT_ROOT'] . "/modulos/php/sessao.php";
?>
<html>
	<body>
		<form action="/acoes/mudarsenha.php" method="post">
			<center>
				<h3 id="mudarsenha-senhaatual">Senha Atual</h3>
				<input type="password" id="mudarsenha-senhaatual-in" name="senhaAntiga">
				<div id="traco1"></div><br>
				<h3 id="mudarsenha-senhaantiga">Senha Nova</h3>
				<input type="password" id="mudarsenha-senhaantiga-in" name="senhaNova">
				<div id="traco2"></div><br>
				<input type="submit" id="mudarsenha-botao" value="Mudar senha"><br>
			</center>
			<?php
			if(isset($_GET["erro"])){
				echo "<div id='erro'>Senha atual incorreta.</div>";
			}
			?>
		</form>
	</body>
	
	<style>
		#mudarsenha-senhaatual,#mudarsenha-senhaantiga{
			font-size: 12px;
			font-family: "Arial", sans-serif;
			font-weight: normal;
			margin: 0px;
			margin-bottom: -5px;
			position: relative;
			z-index: 2;
			margin-left: -130px;
		}
		#mudarsenha-senhaatual-in,#mudarsenha-senhaantiga-in{
			border-width: 0px 0px 1px 0px;
			border-color: black;
			font-size: 16px;
			outline: none;
			width: 200px;
			height: 30px;
			padding-top: 5px;
			padding-left: 5px;
		}
		#traco1,#traco2{
			width: 0px;
			height: 2px;
			background-color: rgb(87, 104, 222);
			margin-top: -1px;
			-webkit-transition: all 0.4s;
			transition: all 0.4s;
			position: relative;
			z-index: 2;
		}
		#mudarsenha-botao{
			background-color: rgb(87, 104, 222);
			color: white;
			font-size: 15px;
			width: 105px;
			height: 25px;
			border-width: 0px;
			border-radius: 2px;
		}
		#mudarsenha-senhaatual-in:focus + #traco1{
			width: 200px;
		}
		#mudarsenha-senhaantiga-in:focus + #traco2{
			width: 200px;
		}
		#erro{
			font-family: "Arial", sans-serif;
			font-size: 11px;
			position: relative;
			color: rgba(253, 44, 44, 0.83);
			margin-bottom: -10px;
			width: 100%;
			text-align: center;
		}
	
	</style>
</html>