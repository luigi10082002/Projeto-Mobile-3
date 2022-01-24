<?php
$rotas = [
  'email' => 'main@email'
];

$action = 'email';

if(isset($_POST['a'])){
  if(!key_exists($_POST['a'], $rotas)){
    $action = 'email';
  } else {
    $action = $_POST['a'];
  }
}

$partes = explode('@', $rotas[$action]);
$controller = $partes[0];
$method = $partes[1];

echo "$controller - $method";

/*
//Definição de legendas do csv
$chave = ["Id", "Codigo", "Quantidade", "Data", "Hora", "Local"];

//Array que armazana os dados passados pelo BD
$info;

//pecorrendo os registros da consulta e armazena tudo na variável $info.
while($aux = mysqli_fetch_assoc($sql)) {
  $info = array(
    $chave,
    $aux["id"],
    $aux["Produto"],
    $aux["Quantidade"],
    $aux["Data"],
    $aux["Hora"],
    $aux["Local"],
  );
};
// Abrir/criar arquivo
$arquivo = fopen('fileEmail.csv', 'w');

foreach ($sql as $chave => $info) {
  fputcsv($arquivo, $info);
 };


// Fechar o arquivo
fclose($arquivo);
*/
?>
