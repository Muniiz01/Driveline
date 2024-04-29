<?php

require_once("conexaoDb.php");

$con = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $nome = $_POST['nome'];
    $documento = $_POST['documento'];
    $docTipo = $_POST['docTipo'];
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $nivel = "2";

    $senhaCripto = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios(nome, tipo_doc, documento, telefone, email, senha, idNivel_de_Acesso) VALUES ('$nome', '$docTipo', '$documento', '$telefone', '$email', '$senhaCripto', '$nivel')";

    $query = $con->query($sql);
    

}

?>