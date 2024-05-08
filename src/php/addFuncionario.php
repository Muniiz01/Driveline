<?php

require_once("conexaoDb.php");

$con = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $nome = $_POST['nome'];
    $documento = $_POST['documento'];
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $nivel = "2";

    $senhaCripto = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "SELECT * FROM funcionarios WHERE email = '$email'";

    $resultado = $con->query($sql);

    if($resultado->num_rows <= 0){
        
    $sql2 = "INSERT INTO funcionarios(nome, documento, telefone, email, senha, idNivel_de_Acesso) VALUES ('$nome', '$documento', '$telefone', '$email', '$senhaCripto', '$nivel')";

    $query = $con->query($sql2);
    echo  "Usuario cadastrado";

    }else{
        echo "Usuario ja existe";
    }

}

?>