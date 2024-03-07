<?php 
$severName = "localhost";
$dataBase = "driveline";
$userName = "root";
$password = "";



$mysql = mysqli_connect($severName, $userName, $password, $dataBase);

if($mysql ->error){
    die("Falha". $mysql->error);
}

?>