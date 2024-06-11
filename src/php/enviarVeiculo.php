<?php

require_once('conexaoDb.php');

$conn = conexaoDb();



if($_SERVER["REQUEST_METHOD"] == "POST"){


                $id_veiculos = $_POST["id_veiculos"];

                $categoria = $_POST["categoria"];
                $modelo = $_POST["modelo"] ;
                $marca = $_POST["marca"]; 
                $cor = $_POST["cor"];
                $quilometragem = $_POST["quilometragem"];
                $cambio = $_POST["cambio"]; 
                $passageiros = $_POST["passageiros"]; 
                $ar_condicionado = $_POST["ar_condicionado"];
                $airbag = $_POST["airbag"];
                $abs = $_POST["abs"];
                $carga = $_POST["volumeCarga"];
                $preco_veiculo = $_POST["preco_veiculo"];
                $descricao = $_POST["descricao"];

        $sql= "UPDATE `veiculos` SET categoria='$categoria', modelo='$modelo', marca='$marca', cor='$cor', cambio='$cambio', quilometragem='$quilometragem', passageiros='$passageiros', airbag='$airbag', abs='$abs', volume_carga='carga', ar_condicionado='$ar_condicionado', preco_veiculo='$preco_veiculo', descricao='$descricao'  WHERE id_veiculos='$id_veiculos'";
        echo $sql."<br>";   
    
   
    
    $conn->query($sql);

}


?>