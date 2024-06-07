<?php
require_once("conexaoDb.php");

$conn = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "POST"){

$pesquisa = $_POST['query'];
$tipo = $_POST['tipo'];

if($tipo == 'u'){

    $sql = "SELECT * FROM usuarios WHERE email LIKE '%$pesquisa%' OR nome LIKE '%$pesquisa%' OR id_usuario LIKE '$pesquisa'";

}elseif($tipo == 'f'){

    $sql = "SELECT * FROM funcionarios WHERE idNivel_de_Acesso = 2 AND (email LIKE '%$pesquisa%' OR nome LIKE '%$pesquisa%' OR id_usuario LIKE '$pesquisa') ";

}elseif($tipo == 'v'){
    $sql = "SELECT * FROM veiculos WHERE marca = '%$pesquisa%' AND  ";

}
    
    $pesquisa = $conn->real_escape_string($pesquisa);

    $result = $conn->query($sql);
    $dadosUsuarios = array();
    if($result->num_rows > 0 ){
        while($valores = $result->fetch_assoc()){
            $dadosUsuarios[] = array(
                'idUsuario' => $valores["id_usuario"],
                'nome' => $valores["nome"],
                'documento' => $valores["documento"],
                'telefone' => $valores["telefone"],
                'email' => $valores["email"],
                'categoria' => $valores["categoria"],
                'marca' => $valores["marca"],
                'modelo' => $valores["modelo"],
                'preco_veiculo' => $valores["preco_veiculo"],
                
            );
               
        }
        echo json_encode($dadosUsuarios);
    }else{

        $dadosUsuarios[] = array(
            'msg' => "Nenhum registro encontrado"
        );
        echo json_encode($dadosUsuarios);
    }
}



?>