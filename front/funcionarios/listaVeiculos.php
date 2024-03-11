<?php
$severName = "localhost";
$dataBase = "driveline";
$userName = "root";
$password = "";

if($_SERVER["REQUEST_METHOD"] == "GET"){
    //dados requisitados pelo funcionario.js

    $conn = mysqli_connect($severName, $userName, $password, $dataBase);

    
    $query = "SELECT id_veiculos, categoria, modelo, marca, cor, quilometragem, cambio, passageiros, ar_condicionado, airbag, abs, volume_carga, descricao FROM veiculos";

    $resultado = $conn->query($query);
    
    $dadosVeiculos = array();

    if ($resultado->num_rows > 0){
        while($valores = $resultado->fetch_assoc()){

        $dadosVeiculos[] = array(
            'id_veiculos' => $valores["id_veiculos"], 
            'categoria' => $valores["categoria"], 
            'modelo' => $valores["modelo"], 
            'marca' => $valores["marca"], 
            'cor' => $valores["cor"], 
            'quilometragem' => $valores["quilometragem"],
            'cambio' => $valores["cambio"], 
            'passageiros' => $valores["passageiros"], 
            'ar_condicionado' => $valores["ar_condicionado"], 
            'airbag' => $valores["airbag"], 
            'abs' => $valores["abs"], 
            'carga' => $valores["volume_carga"], 
            'descricao' => $valores["descricao"]
        );

        }

        echo json_encode($dadosVeiculos);

    } else{
        echo "Nenhum registro encontrado";
    }
    $conn->close();

}


?>