<?php
$severName = "localhost";
$dataBase = "driveline";
$userName = "root";
$password = "";


if($_SERVER["REQUEST_METHOD"] == "POST"){
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $docTipo = $_POST['docTipo'];
    $documento = $_POST['documento'];
    $genero = $_POST['genero'];
    $telefone = $_POST['telefone'];
    $senha = $_POST['senha'];

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $conn = mysqli_connect($severName, $userName, $password, $dataBase);

    if(!$conn){
        die("connection failed: " . $conn->connect_error );
    }

    $sql = "INSERT INTO usuarios (nome, tipo_doc, documento, genero, telefone, email, senha) VALUE ('$nome', '$docTipo', '$documento', '$genero', '$telefone', '$email', '$senhaHash')";

    if($conn->query($sql)  === TRUE) {
        echo "Dados inseridos";
    } else {
        echo "Erro ao inserir dados: " . $conn->error;
    }

    $conn->close();

} else {
    echo "Metodo nao permitido";
}
?>