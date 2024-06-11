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

        $sql2 = "SELECT * FROM img_veiculo WHERE idVeiculos = '$idUser'";
        $resultado2 = $conn->query($sql2);
        if($resultado2->num_rows > 0){
            while($row = $resultado2->fetch_assoc()){
                $filename = "../".$row["caminho_imagem"];
                if(file_exists($filename)){
                    unlink($filename);
                }
            }
            $sql1 ="DELETE FROM img_veiculo WHERE idVeiculos = '$idUser'";
        $conn->query($sql1);
        }
        
        $sql = "DELETE FROM veiculos WHERE id_veiculos = $idUser";

        echo "4";
    }
   $resultado = $conn->query($sql);

}

?>