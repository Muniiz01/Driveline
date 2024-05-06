<?php 
require_once('conexaoDb.php');

session_start();

$conn = conexaoDb();

// quando ele logar no site vai crrar uma chave sessao, na chave vai ter o nivle dele verigico se e 2, 3 adm ou funcionario 
// 2 carro
// 3 tudo 

if($_SERVER["REQUEST_METHOD"] == "POST"){

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
    
    $idVeiculo = $_POST['idVeiculo'];
    
    $sql= "UPDATE `veiculos` SET marca='$marca', cor='$cor', quilometragem='$quilometragem', cambio='$cambio', passageiros='$passageiros', ar_condicionado='$ar_condicionado', descricao='$descricao', abs='$abs', volume_carga='$volume_carga', airbag='$airbag', modelo='$modelo', categoria='$categoria' WHERE id_veiculos='$idVeiculo'";
    echo $sql."<br>";   

    $conn->query($sql);

}

?>