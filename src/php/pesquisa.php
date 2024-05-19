<?php
require_once("conexaoDb.php");

$conn = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "POST"){

$pesquisa = $_POST['query'];

    
    $pesquisa = $conn->real_escape_string($pesquisa);

    $sql = "SELECT * FROM usuarios WHERE email LIKE '$pesquisa%'";

    $result = $conn->query($sql);
    $dadosUsuarios = array();
    if($result->num_rows > 0 ){
        while($valores = $result->fetch_assoc()){
            $dadosUsuarios = array(
                'idUsuario' => $valores["id_usuario"],
                'nome' => $valores["nome"],
                'documento' => $valores["documento"],
                'telefone' => $valores["telefone"],
                'email' => $valores["email"],
            );
               
        }
        echo json_encode($dadosUsuarios);
    }else{
        echo "Nenhum registro encontrado";
    }
}



?>