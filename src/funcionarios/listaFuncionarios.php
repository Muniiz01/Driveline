<?php

require_once("conexaoDb.php");

$conn = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "GET"){

    $sql = "SELECT id_usuario, nome, tipo_doc, documento, telefone, email FROM usuarios WHERE idNivel_de_Acesso = 2";

    $resultado = $conn->query($sql);

    $dadosFuncionarios = array();

    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $dadosFuncionarios[] = array(
            'idUsuario' => $linha['id_usuario'],
            'nome' => $linha['nome'],
            'telefone' => $linha["telefone"],
            'email' => $linha["email"]
            );
        }

        echo json_encode($dadosFuncionarios);
    }else{
        echo "Nenhum registro encontrado";
    }

    $conn->close();

    
}
?>