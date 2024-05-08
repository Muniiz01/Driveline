<?php

// conexao com o banco de dados
require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "GET"){ // verifica se o metodo requisitado pelo javascript foi  'GET'
    //dados requisitados pelo funcionario.js


    $query = "SELECT id_usuario, nome,  documento, telefone, email FROM usuarios WHERE idNivel_de_Acesso = 1"; // atribui a consulta sql na variavel $query
    
    $resultado = $conn->query($query); // executa a variavel $query e armazena o resultado na variavel $resultado

    $dadosUsuarios = array(); // define a variavel $dadosUsuarios em um array

    if ($resultado->num_rows > 0){ // verifica se o banco retornou algun registro, se sim..
        while($valores = $resultado->fetch_assoc()){ // armazena os registros da consulta sql na variavel $valores 
            $dadosUsuarios[] = array(  
                // armazena os registros da consulta sql no array $dadosUsuarios
                'idUsuario' => $valores["id_usuario"],
                'nome' => $valores["nome"],
                'documento' => $valores["documento"],
                'telefone' => $valores["telefone"],
                'email' => $valores["email"]
            );
        }

        echo json_encode($dadosUsuarios); // codifica o array $dadosUsuarios em formato json

    }else{
        echo "Nenhum registro encontrado"; // em caso de nao ouver nenhum registro na consulta sql exibi a mensagem
    }
    $conn->close(); // fecha a conexao com o banco de dados

}
?>