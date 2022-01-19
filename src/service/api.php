<?php
  /*
    *Conectar APP à base de dados; X
    *Pegar base de dados;
    *Abrir o a base de dados;
    *Separar itens;
    *Organizar dados; X
  */

  //*Conectar APP à base ed dados;
    //OBS: Onde esta com um "X", é preciso substiruir depois.
    /*
    $host = "127.0.0.1";
    $usuario = "root";
    $senha = "";
    $database = "";

    $link = mysqli_connect($host,$usuario, $senha, $database) or die(mysqli_error());

    $connection = mysqli_connect($host,$usuario);
    $X = $_POST['X'];

    $sql = "INSERT INTO X VALUES";
    $sql .= "('$X')";

    mysqli_query($db, $sql) or die("Erro ao tentar cadastrar registro");
    mysqli_close($db);


  //*Pegar base de dados;

  //*Abrir o a base de dados;

  //*Separar itens;

  */
  //*Organizar dados;
  $dados = [
    $array_header = array(
      'Codigo',
      'Id',
      'Quantidade',
      'Data',
      'Hora',
      'Local'
    ),
    $array_content = array(
        '0' => 'produto',
        '1' => 'id',
        '2' => 'qtd',
        '3' => 'data',
        '4' => 'hora',
        '5' => 'local',
    ),
  ];

  $f = fopen('dados.csv', 'w');
  foreach ($dados as $linha) {
      fputcsv($f, $linha);
  }
  fclose($f);


$array_header = array(
  'Codigo',
  'Id',
  'Quantidade',
  'Data',
  'Hora',
  'Local'
);

  $string_content = implode(", ", $array_content);
  $string_header = implode(", ", $array_header);

  echo($string_header);
  echo "</br>";
  echo($string_content);
?>
