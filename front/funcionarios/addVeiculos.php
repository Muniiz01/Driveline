<?php
$severName = "localhost"; // nome do servidor do banco de dados
$dataBase = "driveline"; // nome da base de dados
$userName = "root"; // nome do usuario para acessar o banco de dados
$password = ""; // senha do usuario para acessar o banco de dados


if($_SERVER["REQUEST_METHOD"] == "POST"){ // verifica se o metodo requisitado pelo javascript foi  'POST' 
    //dados requisitados pelo funcionario.js
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

    $conn = mysqli_connect($severName, $userName, $password, $dataBase); //conexao com o banco de dados 

    if(!$conn){ // testa a conexao com o banco de dados em caso de falha exibi uma mensagem no console do navegador
        die("connection failed: " . $conn->connect_error );
    }

    // atribui a consulta sql na variavel $sql
    $sql = "INSERT INTO veiculos (categoria, modelo, marca, cor, quilometragem, cambio, passageiros, ar_condicionado, airbag, abs, volume_carga, descricao) VALUE 
    ( '$categoria', '$modelo', '$marca','$cor', '$quilometragem', '$cambio', '$passageiros', '$ar_condicionado', '$airbag', '$abs', '$volume_carga', '$descricao')"; 

    if($conn->query($sql)  === TRUE) { // executa a variavel $sql
        $id_veiculos = $conn->insert_id; // atribui o id gerado na variavel $id_veiculos caso a consulta tenha tido um sucesso
        echo "Dados inseridos ", $id_veiculos; // exibi mensagem em caso da consulta sql for executada com sucesso
    } else {
        echo "Erro ao inserir dados: " . $conn->error; // exibi mensagem de erro 
    }


    if(isset($_FILES['imagens'])){ // verifica se a um arquivo 
        $imagens = $_FILES['imagens']; // atribui as imagens na variavel $imagens

        $caminhoRelativo = '/xampp/htdocs/Driveline/front/imagens/categorias/imagens_carros/'; // caminho onde a imagens sera armazenada

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
                move_uploaded_file($caminho_temp, $caminhoRelativo . $novoNome); //move a imagem para o caminho designado na variavel $caminhoRelativo
                
                $sql = "INSERT INTO imagens (id_veiculo, caminho_imagem) VALUE ('$id_veiculos', '$caminhoCompleto')"; // consulta sql atribuida a variavel $sql para adcionar o caminho da imagem e o id_veiculo no banco de dados

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