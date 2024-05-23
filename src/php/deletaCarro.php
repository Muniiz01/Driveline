<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $idCar = $_POST['id_veiculos'];

    $sql = "DELETE FROM veiculos WHERE id_veiculos = $idCar";

    

}

?>