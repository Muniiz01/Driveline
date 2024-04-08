<?php

// conexao com o banco de dados
require_once("conexaoDb.php");

$conn = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "POST"){ // verifica se o metodo requisitado pelo javascript foi  'GET' 
    //dados requisitados pelo funcionario.js

    
    $query = "SELECT veiculos.id_veiculos, veiculos.categoria, veiculos.modelo, veiculos.marca, veiculos.cor, veiculos.quilometragem, veiculos.cambio, veiculos.passageiros, veiculos.ar_condicionado, veiculos.airbag, veiculos.abs, veiculos.volume_carga, veiculos.descricao, imagens.caminho_imagem FROM veiculos JOIN imagens ON veiculos.id_veiculos = imagens.id_veiculos"; // atribui a consulta sql na variavel $query

    $resultado = $conn->query($query); // executa a variavel $query e armazena o resultado na variavel $resultado
    
    $dadosVeiculos = array(); // define a variavel $dadosUsuarios em um array

    if ($resultado->num_rows > 0){ // verifica se o banco retornou algun registro, se sim..
        while($valores = $resultado->fetch_assoc()){ // armazena os registros da consulta sql na variavel $valores
         // armazena os registros da consulta sql no array $dadosUsuarios
        $dadosVeiculos[] = array(
            'id_veiculos' => $valores["id_veiculos"], 
            'categoria' => $valores["categoria"], 
            'modelo' => $valores["modelo"], 
            'marca' => $valores["marca"], 
            'cor' => $valores["cor"], 
            'quilometragem' => $valores["quilometragem"],
            'cambio' => $valores["cambio"], 
            'passageiros' => $valores["passageiros"], 
            'ar_condicionado' => $valores["ar_condicionado"], 
            'airbag' => $valores["airbag"], 
            'abs' => $valores["abs"], 
            'carga' => $valores["volume_carga"], 
            'descricao' => $valores["descricao"],
            'caminho_imagem' => $valores["caminho_imagem"]
        );

        }

        echo json_encode($dadosVeiculos); // codifica o array $dadosUsuarios em formato json

    } else{
        echo "Nenhum registro encontrado"; // em caso de nao ouver nenhum registro na consulta sql exibi a mensagem
    }
    $conn->close(); // fecha a conexao com o banco de dados

}


?>