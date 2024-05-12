<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $idUser = $_POST['idUsuario'];

    $sql = "DELETE FROM usuarios WHERE id_usuario = $idUser";
    
    $resultado = $conn->query($sql);

}

?>