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
    $sql = "SELECT * FROM veiculos WHERE marca LIKE '%$pesquisa%' OR modelo LIKE '%$pesquisa%' OR categoria LIKE '%$pesquisa%' OR id_veiculos LIKE '%$pesquisa%'";
    $re1 = "id_veiculos";
    $re2 = "categoria";
    $re3 = "marca";
    $re4 = "modelo";
    $re5 = "preco_veiculo";

}elseif($tipo === 'h'){
    $re1 = "data_registro";
    $re2 = "modelo";
    $re3 = "nome";
    $re4 = "email";
    
    $pesquisa = $conn->real_escape_string($pesquisa);

    $sql4 = "SELECT
    h.data_registro AS data_registro,
    u.nome AS nome,
    u.email AS email,
    v.modelo AS modelo
FROM
    historico h
JOIN
    usuarios u ON h.idUsuarios = u.id_usuario
JOIN
    veiculos v ON h.idVeiculos = v.id_veiculos
WHERE
 u.nome LIKE '%$pesquisa%'
 OR
u.email LIKE '%$pesquisa%'
ORDER BY
    h.data_registro DESC;";

    $resultado = $conn->query($sql4);
    if($resultado->num_rows > 0){
     while($linha = $resultado->fetch_assoc()){
         $dadosUsuarios[] = array(
             'registro1' => $linha["$re1"],
             'registro2' => $linha["$re2"],
             'registro3' => $linha["$re3"],
             'registro4' => $linha["$re4"],
         );
     }
     echo json_encode($dadosUsuarios);
    }else{
        $dadosUsuarios[] = array(
            'msg' => "Nenhum registro encontrado",
            'msg2' => "h"
        );
        echo json_encode($dadosUsuarios);
    }
    
}
    
    if(isset($sql)){
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
                'msg' => "Nenhum registro encontrado",
                'msg2' => "o"
            );
            echo json_encode($dadosUsuarios);
        }
    }
}



?>