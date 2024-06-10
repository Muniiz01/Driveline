<?php
require_once("conexaoDb.php");

$conn = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "POST"){

$pesquisa = $_POST['query'];
$tipo = $_POST['tipo'];

if($tipo === 'u'){

    $sql = "SELECT * FROM usuarios WHERE email LIKE '%$pesquisa%' OR nome LIKE '%$pesquisa%' OR id_usuario LIKE '%$pesquisa%'";
    $re1 = "id_usuario";
    $re2 = "nome";
    $re3 = "documento";
    $re4 = "telefone";
    $re5 = "email";
}elseif($tipo === 'f'){

    $sql = "SELECT * FROM funcionarios WHERE idNivel_de_Acesso = 2 AND (email LIKE '%$pesquisa%' OR nome LIKE '%$pesquisa%' OR id_usuario LIKE '%$pesquisa') ";
    $re1 = "id_veiculos";
    $re2 = "nome";
    $re3 = "documento";
    $re4 = "telefone";
    $re5 = "email";
}elseif($tipo === 'v'){
    $sql = "SELECT * FROM veiculos WHERE marca LIKE '%$pesquisa%' OR modelo LIKE '%$pesquisa%'";
    $re1 = "id_veiculos";
    $re2 = "categoria";
    $re3 = "marca";
    $re4 = "modelo";
    $re5 = "preco_veiculo";

}
    
    $pesquisa = $conn->real_escape_string($pesquisa);

    $result = $conn->query($sql);
    $dadosUsuarios = array();
    if($result->num_rows > 0 ){
        while($valores = $result->fetch_assoc()){
            $dadosUsuarios[] = array(
                'registro1' => $valores["$re1"],
                'registro2' => $valores["$re2"],
                'registro3' => $valores["$re3"],
                'registro4' => $valores["$re4"],
                'registro5' => $valores["$re5"],
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