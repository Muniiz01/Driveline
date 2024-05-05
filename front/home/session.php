<?php
session_start();

$conn = conexaoDb();
require_once("conexaoDb.php");

if(isset($_SESSION["idUser"]) && isset($_SESSION['nivelAces'])){

    $stmt = $conn-> prepare("CALL selectAll(?, ?)");
    $stmt->bind_param("ii", $idUser, $nivel);
    $stmt->execute();
    $resut = $stmt->get_result();
    while ($linha = $resut->fetch_assoc()){

    }
}


?>