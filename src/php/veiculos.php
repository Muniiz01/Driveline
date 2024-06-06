<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    $idVeiculo = $_POST['veiculoSelecionado'];
}

$query = mysqli_query($conn, "SELECT * from veiculos JOIN img_veiculo ON veiculos.id_veiculos = img_veiculo.idVeiculos WHERE id_veiculos = '$idVeiculo'");


?>