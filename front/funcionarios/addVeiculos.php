<?php
$severName = "localhost";
$dataBase = "driveline";
$userName = "root";
$password = "";


if($_SERVER["REQUEST_METHOD"] == "POST"){
    //dados requisitados pelo funcionario.js
    
    $categoria = $_POST['categoria'];
    $modelo = $_POST['modelo'];
    $marca = $_POST['marca'];
    $cor = $_POST['cor'];
    $quilometragem = $_POST['quilometragem'];
    $cambio = $_POST['cambio'];
    $passageiros = $_POST['passageiros'];
    $ar_condicionado = $_POST['arCondicionado'];
    $airbag = $_POST['airbag'];
    $abs = $_POST['abs'];
    $volume_carga = $_POST['volumeCarga'];
    $descricao = $_POST['descricao'];



    $conn = mysqli_connect($severName, $userName, $password, $dataBase);
    
    if(!$conn){
        die("connection failed: " . $conn->connect_error );
    }
    
    $sql = "INSERT INTO veiculos (categoria, modelo, marca, cor, quilometragem, cambio, passageiros, ar_condicionado, airbag, abs, volume_carga, descricao) VALUE 
    ( '$categoria', '$modelo', '$marca','$cor', '$quilometragem', '$cambio', '$passageiros', '$ar_condicionado', '$airbag', '$abs', '$volume_carga', '$descricao')";

    if($conn->query($sql)  === TRUE) {
        echo "Dados inseridos";
    } else {
        echo "Erro ao inserir dados: " . $conn->error;
    }

    $conn->close();
}


?>