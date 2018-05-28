<html>
<body>
<form method="post" name="contact_form"
action="enviar.php">
    <center><input type="text" id="caixa" name="name" placeholder="Seu Nome">
    <input type="text" id="caixa" name="email" placeholder="Seu Email">
    <h3 id="texto">Conte-nos sobre sua experiencia<h3>
    <textarea id="problema" style="margin-top: -10px; margin-bottom: 5px; resize: none; width: 260px; height: 50px;" name="message"></textarea><br><br>
    <input type="submit" id="enviar" value="Enviar"></center>
</form>
</body>
<style>
#texto{
	color: black;
	font-size: 14px;
	margin-left: 8px;
	font-family: "Arial", sans-serif;
}
#problema{
	color: black;
	font-family: "Arial", sans-serif;
	border-radius: 2px;
	border-width: 1px;
	border-style: solid;
	border-color: gray;
	padding-left: 2px;
}
#caixa{
	color: black;
	font-size: 15px;
	margin: 8px;
	font-family: "Arial", sans-serif;
	width: 140px;
	height: 23px;
	border-radius: 2px;
	border-width: 1px;
	border-style: solid;
	border-color: gray;
	padding-left: 5px;
}
#enviar{
	background-color: rgb(87, 104, 222);
	font-family: "Arial", sans-serif;
	font-size: 18px;
	color: rgba(255,255,255,0.9);
	border-width: 0px;
	border-radius: 4px;
	margin-top: 5px;
	width: 120px;
	height: 35px;
	cursor: pointer;
}
</style>
</html>