<?php
	require $_SERVER['DOCUMENT_ROOT'] . '/modulos/php/sessao.php';
	$nome = $_POST["nome"];
	echo $nome;
?>
<form action="usuario.php" method="post">
	<input type="text" id="nome" name="nome">
	<input type="submit" id="submit" value=">>>">
</form>