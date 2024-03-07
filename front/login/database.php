<?php 
$severName = "localhost";
$dataBase = "driveline";
$userName = "root";
$password = "";



$mysql = new mysql($database,$userName,$password,$severName);

if($mysql ->error){
    die("Falha". $mysql->error);
}

?>