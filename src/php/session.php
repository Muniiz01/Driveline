<?php
session_start();
require_once("conexaoDb.php");
$conn = conexaoDb();

if(isset($_COOKIE["dados"])){
    $dados = unserialize($_COOKIE["dados"]);
    

    $_SESSION['nivelAces'] = $dados['nivelAces'];
    $_SESSION['idUser'] = $dados['idUser'];

    $dadosUsuario[] = array(
        'nome' => $dados['nome'],
        'email' => $dados['email'],
        'id_usuario' => $dados['idUser'],
        'nivel' => $dados['nivelAces']
    );
    echo json_encode($dadosUsuario);
}else{
    echo json_encode("Faca o login ou cadastre-se!!");
}

?>