<?php 
require_once('conexaoDb.php');

$conn = conexaoDb();



if($_SERVER["REQUEST_METHOD"] == "POST"){

    $nome = $_POST['nome'];
    $documento = $_POST['documento']; 
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $idUsuario = $_POST['idUsuario'];
    $nivel = $_POST['nivel'];

    
        $sql= "UPDATE `funcionarios` SET nome='$nome', documento='$documento', telefone='$telefone', email='$email' WHERE id_usuario='$idUsuario'";
        echo $sql."<br>";   
    
   
    
    $conn->query($sql);

}

?>