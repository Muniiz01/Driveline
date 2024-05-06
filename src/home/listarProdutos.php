<?php

require_once("conexaoDb.php");

$con = conexaoDb();


$sql = "SELECT * FROM veiculos JOIN imagens ON veiculos.id_veiculos = imagens.id_veiculos";

$resultado = $con->query($sql);



?>