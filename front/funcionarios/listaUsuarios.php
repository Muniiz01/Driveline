<?php
$severName = "localhost"; // nome do servidor do banco de dados
$dataBase = "driveline"; // nome da base de dados
$userName = "root"; // nome do usuario para acessar o banco de dados
$password = ""; // senha do usuario para acessar o banco de dados

if($_SERVER["REQUEST_METHOD"] == "GET"){ // verifica se o metodo requisitado pelo javascript foi  'GET'
    //dados requisitados pelo funcionario.js

    $conn = mysqli_connect($severName, $userName, $password, $dataBase); //conexao com o banco de dados 

    if(!$conn){ // testa a conexao com o banco de dados em caso de falha exibi uma mensagem no console do navegador
        die("connection failed: " . $conn->connect_error );
    }


    $query = "SELECT id_usuario, nome, tipo_doc, documento, telefone, email FROM usuarios"; // atribui a consulta sql na variavel $query
    
    $resultado = $conn->query($query); // executa a variavel $query e armazena o resultado na variavel $resultado

    $dadosUsuarios = array(); // define a variavel $dadosUsuarios em um array

    if ($resultado->num_rows > 0){ // verifica se o banco retornou algun registro, se sim..
        while($valores = $resultado->fetch_assoc()){ // armazena os registros da consulta sql na variavel $valores 
            $dadosUsuarios[] = array(  
                // armazena os registros da consulta sql no array $dadosUsuarios
                'idUsuario' => $valores["id_usuario"],
                'nome' => $valores["nome"],
                'tipoDoc' => $valores["tipo_doc"],
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