<?php
$severName = "localhost";
$dataBase = "driveline";
$userName = "root";
$password = "";


if($_SERVER["REQUEST_METHOD"] == "POST"){
    // armazena os dados enviados do client.js em variaveis
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $docTipo = $_POST['docTipo'];
    $documento = $_POST['documento'];
    $telefone = $_POST['telefone'];
    $senha = $_POST['senha'];

    // gera uma senha hash(um tipo de criptografia)
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // realiza conexao com o banco de dados
    $conn = mysqli_connect($severName, $userName, $password, $dataBase);

    if(!$conn){
        die("connection failed: " . $conn->connect_error );
    }

    $sql = "INSERT INTO usuarios (nome, tipo_doc, documento, telefone, email, senha) VALUE ('$nome', '$docTipo', '$documento', '$telefone', '$email', '$senhaHash')";

    if($conn->query($sql)  === TRUE) {
        echo "Dados inseridos";
    } else {
        echo "Erro ao inserir dados: " . $conn->error;
    }

    $conn->close();

} else {
    echo "Metodo nao permitido";
}   
if(isset($_POST['email']) && isset($_POST['senha'])){
    if(strlen($_POST['email'])== 0 ){
        echo "Preencha seu E-mail.";
    } else if(strlen($_POST['senha'])== 0 ){
        echo "Preencha seu E-mail.";
    } 
}
?>