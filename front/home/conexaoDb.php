<?php

mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

function conexaoDb(){
    //dados para conexao com o banco de dados
$username = 'root';
$password = '';
$server = 'localhost';
$dataBase = 'driveline';

try{
    $conn = new mysqli($server, $username, $password, $dataBase);
    return $conn;
}catch(Exception $e){
echo $e->getMessage(); 

}
}

?>