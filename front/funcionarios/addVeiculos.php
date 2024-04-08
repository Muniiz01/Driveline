<?php

// conexao com o banco de dados
require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){ // verifica se o metodo requisitado pelo javascript foi do tipo 'POST' 
    
    // atribui os valores enviados pelo javascript no metodo FormData em variaveis
    $categoria = $_POST['categoria'];
    $modelo = $_POST['modelo']; 
    $marca = $_POST['marca'];
    $cor = $_POST['cor'];
    $quilometragem = $_POST['quilometragem'];
    $cambio = $_POST['cambio'];
    $passageiros = $_POST['passageiros'];
    $ar_condicionado = $_POST['arCondicionado'];
    $airbag = $_POST['airbag'];
    $abs = $_POST['abs'];
    $volume_carga = $_POST['volumeCarga'];
    $descricao = $_POST['descricao'];

     

    // atribui a consulta sql na variavel $sql
    $sql = "INSERT INTO veiculos (categoria, modelo, marca, cor, quilometragem, cambio, passageiros, ar_condicionado, airbag, abs, volume_carga, descricao) VALUE 
    ( '$categoria', '$modelo', '$marca','$cor', '$quilometragem', '$cambio', '$passageiros', '$ar_condicionado', '$airbag', '$abs', '$volume_carga', '$descricao')"; 

    $verifica_car = "SELECT id_veiculos FROM veiculos WHERE modelo = '$modelo' ";
    $resultado = $conn->query($verifica_car);

    if($resultado->num_rows < 1) { // executa a variavel $sql
        if( $conn->query($sql) === TRUE){
            $id_veiculos = $conn->insert_id; 
            echo "Dados inseridos "; 
        }else{
            echo "Erro ao inserir dados: " . $conn->error; 
        }
    } else {
        echo "Este modelo ja existe no banco de dados";
        $conn->close();
        exit;
    }


    if(isset($_FILES['imagens'])){ // verifica se a um arquivo 
        $imagens = $_FILES['imagens']; // atribui as imagens na variavel $imagens

        $caminhoRelativo = 'carros/'; // caminho onde a imagens sera armazenada

        foreach($imagens['tmp_name'] as $index => $tmp_name){ //aqui o bagulho fica loco kkkk
            $nome_arquivo = $imagens['name'][$index]; //atribui o nome da imagem na variavel $nome_arquivo
            $novoNome = $modelo . $index . ".jpg"; // defini um novo nome para a imagem de acordo com o modelo do veiculo e o formato da imagem
            $caminho_temp = $tmp_name; // caminho temporario onde a imagem fica salva no php
            $caminhoCompleto = $caminhoRelativo . $novoNome; // junta o caminho onde a imagem sera armazenada e o nome da imagem

            $sql_caminho = "SELECT id_imagens FROM imagens WHERE caminho_imagem = '$caminhoCompleto'"; // consulta sql verifica a existencia de um caminho igual a variavel $caminhoCompleto no banco de dados
            $resultado = $conn->query($sql_caminho);  // executa a variavel a consulta sql e armazena o resultado na variavel $resultado

            if ($resultado->num_rows > 0){ // verifica se o banco retornou algun registro, se sim..
                echo "caminho ja existe"; // exibi mensagem que ja existe um caminho igual a $caminhoCompleto
            }else{ // se nao existir um caminho igual no banco de dados.. 
                $caminhoRelativo2 = '/xampp/htdocs/Driveline/front/funcionarios/carros/';
                move_uploaded_file($caminho_temp, $caminhoRelativo2 . $novoNome); //move a imagem para o caminho designado na variavel $caminhoRelativo
                
                $sql = "INSERT INTO imagens (id_veiculos, caminho_imagem) VALUE ('$id_veiculos', '$caminhoCompleto')"; // consulta sql atribuida a variavel $sql para adcionar o caminho da imagem e o id_veiculo no banco de dados

                if($conn->query($sql) === TRUE){ // executa a variavel $sql
                    echo "imagem enviada com sucesso:" . $caminhoRelativo; // exibi mensagem em caso da consulta sql for executada com sucesso
                }else{
                    echo "Nenhuma imagem enviada"; // casa nenhuma imagem tenha sido inserida no banco de dados
                }
            }  
        }    
    }
    $conn->close(); // fecha a conexao com o banco de dados
}


?>