<?php
  $host = "127.0.0.1";
	$usuario = "root";
	$senha = "";
	$bd = "meubd";

  $link = mysqli_connect($host,$usuario) or die(mysqli_error());

  $db = mysql_select_db($link, $bd);

  $nome = $_POST['nome'];

  $sql = "INSERT INTO cadastro VALUES";
  $sql .= "('$nome')";

  mysqli_query($db, $sql) or die("Erro ao tentar cadastrar registro");
  mysqli_close($db);
  echo "Cliente cadastrado com sucesso!";
?>
