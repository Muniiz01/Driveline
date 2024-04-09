<?php

require_once("conexaoDb.php");

$conn = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "GET"){

    $sql = "SELECT id_usuario, nome, tipo_doc, documento, telefone, email FROM usuarios WHERE nivel_acs = 2";

    $resultado = $conn($sql);

    
}
?>