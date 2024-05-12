<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $idUser = $_POST['idUsuario'];
    $nivelAcess = $_POST['nivelAcess'];


    if($nivelAcess == 2){
        $sql = "DELETE FROM funcionarios WHERE id_usuario = $idUser";
    
    }else{
        $sql = "DELETE FROM usuarios WHERE id_usuario = $idUser";

    }
   $resultado = $conn->query($sql);

}

?>