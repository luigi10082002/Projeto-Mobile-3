<?php

$produtos = json_decode(file_get_contents('php://input'));
if (empty($produtos)){
    $produtos = (object) $_POST;
}

$chave = ["Id", "Codigo", "Quantidade", "Data", "Hora", "Local"];

$n = 1;

$info;

foreach ($produtos as $key => $value){
  $info = array(
    $value->produto,
    $value->qtd,
    $value->date,
    $value->hora,
    $value->local,
  );
}

// Abrir/criar arquivo
$arquivo = fopen('fileEmail.csv', 'w');

$key = $key + 1;


  fputcsv($arquivo, $info);

// Fechar o arquivo
fclose($arquivo);

print_r($key);

exit;

?>
