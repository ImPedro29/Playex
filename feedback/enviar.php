<?php
$errors = '';
$myemail = 'contato@playex.link';
if(empty($_POST['name'])  ||
   empty($_POST['email']) ||
   empty($_POST['message']))
{
    $errors .= "\n Erro: Voce precisa preencher todos os locais.";
}
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",
$email_address))
{
    $errors .= "\n Erro: Email Invalido.";
}

if( empty($errors))
{
$to = $myemail;
$email_subject = "Problema no player, de: $name";
$email_body = "Temos um novo problema no player.".
"Enviado por: $name \n ".
"Email: $email_address\n Mensagem: \n $message";
$headers = "From: $myemail\n";
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
header('Location: index.php');
}
?>