<?php

// conexao com o banco de dados
require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    // armazena os dados enviados do client.js em variaveis
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $docTipo = $_POST['docTipo'];
    $documento = $_POST['documento'];
    $telefone = $_POST['telefone'];
    $senha = $_POST['senha'];
    $nivel = "1";

    // gera uma senha hash(um tipo de criptografia)
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // realiza conexao com o banco de dados
    
    $sql = "SELECT * FROM usuarios WHERE email = '$email' ";

    $resultado = $conn->query($sql);

    if($resultado->num_rows <= 0){

    $sql = "INSERT INTO usuarios (nome, tipo_doc, documento, telefone, email, senha, nivel_acs) VALUE ('$nome', '$docTipo', '$documento', '$telefone', '$email', '$senhaHash','$nivel')";

    $conn->query($sql);
    echo "Usuario cadastrado";

   

} else {
    echo "Usuario ja existe";
}
$conn->close();
}   

?>