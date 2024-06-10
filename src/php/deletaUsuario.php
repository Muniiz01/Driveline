<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $idUser = $_POST['idUsuario'];
    $nivelAcess = $_POST['nivelAcess'];


    if($nivelAcess == 2){
        $sql = "DELETE FROM funcionarios WHERE id_usuario = $idUser";
        echo "2";
    
    }elseif($nivelAcess == 1){
        $sql = "DELETE FROM usuarios WHERE id_usuario = $idUser";

        echo "1";

    }elseif($nivelAcess == 4){


        $sql1 ="DELETE FROM img_veiculo WHERE idVeiculos = '$idUser'";
        $conn->query($sql1);
        $sql = "DELETE FROM veiculos WHERE id_veiculos = $idUser";

        echo "4";
    }
   $resultado = $conn->query($sql);

}

?>