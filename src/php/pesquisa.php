<?php
require_once("conexaoDb.php");

$conn = conexaoDb();


$pesquisa = $_POST['query'];

if($pesquisa !== ''){
    $pesquisa = $conn->real_escape_string($pesquisa);

    $sql = "";
}


?>