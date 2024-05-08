<?php

// conexao com o banco de dados
require_once("conexaoDb.php");
 // realiza conexao com o banco de dados
$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){
    // armazena os dados enviados do client.js em variaveis
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $documento = $_POST['documento'];
    $telefone = $_POST['telefone'];
    $senha = $_POST['senha'];
    $nivel = "1";

    // gera uma senha hash(um tipo de criptografia)
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    
    $sql = "SELECT * FROM usuarios WHERE email = '$email' ";

    
    $resultado = $conn->query($sql);

    if($resultado->num_rows <= 0){

    $sql2 = "INSERT INTO usuarios (nome, documento, telefone, email, senha, idNivel_de_Acesso) VALUE ('$nome', '$docTipo', '$documento', '$telefone', '$email', '$senhaHash','$nivel')";

    $conn->query($sql2);
    echo "Usuario cadastrado";

   

} else {
    echo "Usuario ja existe";
}
$conn->close();
}   

?>