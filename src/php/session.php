<?php
session_start();
require_once("conexaoDb.php");
$conn = conexaoDb();

if(isset($_COOKIE["dados"])){
    $dados = unserialize($_COOKIE["dados"]);
    $nivel = $dados['idUser'];
    $idUser = $dados['nivelAces'];
    $nome = $dados['nome'];

    $_SESSION['nivelAces'] = $nivel;
    $_SESSION['idUser'] = $idUser;
    $_SESSION['nome'] = $nome;

    $dadosUsuario[] = array(
        'nome' => $dados['nome'],
        'idUser' => $dados['idUser'],
        'nivel' => $dados['nivelAces']
    );

    echo json_encode($dadosUsuario);
    
}else{
    echo json_encode("Faca o login ou cadastre-se!!");
    
}

///////////////////////////////

?>