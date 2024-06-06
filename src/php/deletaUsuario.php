<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $idUser = $_POST['idUsuario'];
    $nivelAcess = $_POST['nivelAcess'];


    if($nivelAcess == 2){
        $sql = "DELETE FROM funcionarios WHERE id_usuario = $idUser";
    
    }elseif{
        $sql = "DELETE FROM usuarios WHERE id_usuario = $idUser";

    }elseif($nivelAcess == 4){
        $sql = "DELETE FROM veiculos WHERE id_veiculos = $idCar";
    }
   $resultado = $conn->query($sql);

}

?>