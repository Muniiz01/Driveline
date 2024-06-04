<?php
// Conectar ao banco de dados
require_once('conexaoDb.php');


// Verificar se o termo de pesquisa foi enviado via método POST
if (isset($_POST['termo_pesquisa'])) {
    // Obter o termo de pesquisa do formulário
    $termo = $_POST['termo_pesquisa'];

    // Preparar a consulta SQL para buscar carros pelo modelo
    $query = "SELECT * FROM veiculos WHERE modelo LIKE '%$termo%'";

    // Executar a consulta
    $resultado = mysqli_query($conexao, $query);

    // Verificar se a consulta retornou resultados
    if ($resultado) {
        // Iniciar a construção da resposta HTML
        $htmlResposta = "<h3>Resultados da Busca:</h3>";

        // Verificar se foram encontrados resultados
        if (mysqli_num_rows($resultado) > 0) {
            // Loop através dos resultados e adicionar cada carro à resposta
            while ($carro = mysqli_fetch_assoc($resultado)) {
                $htmlResposta .= "<p>ID: " . $carro['id_veiculos'] . "</p>";
                $htmlResposta .= "<p>Modelo: " . $carro['modelo'] . "</p>";
                $htmlResposta .= "<p>Marca: " . $carro['marca'] . "</p>";
                $htmlResposta .= "<p>Cor: " . $carro['cor'] . "</p>";
                // Adicione outras informações do carro que deseja exibir
                $htmlResposta .= "<hr>";
            }
        } else {
            // Se não foram encontrados resultados, exibir mensagem indicando isso
            $htmlResposta = "<p>Nenhum carro encontrado para o termo de pesquisa '$termo'.</p>";
        }

        // Exibir a resposta HTML na página
        echo $htmlResposta;
    } else {
        // Se ocorrer um erro na consulta, exibir mensagem de erro
        echo "Erro ao buscar carros: " . mysqli_error($conexao);
    }
} else {
    // Se o termo de pesquisa não foi enviado via POST, exibir mensagem de erro
    echo "Erro: Termo de pesquisa não fornecido.";
}

// Fechar a conexão com o banco de dados
mysqli_close($conexao);
?>
