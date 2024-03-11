<?php
$severName = "localhost";
$dataBase = "driveline";
$userName = "root";
$password = "";

if($_SERVER["REQUEST_METHOD"] == "GET"){
    //dados requisitados pelo funcionario.js

    $conn = mysqli_connect($severName, $userName, $password, $dataBase);


    $query = "SELECT id_usuario, nome, tipo_doc, documento, telefone, email FROM usuarios";
    
    $resultado = $conn->query($query);

    $dadosUsuarios = array();

    if ($resultado->num_rows > 0){
        while($valores = $resultado->fetch_assoc()){
            $dadosUsuarios[] = array(
                'idUsuario' => $valores["id_usuario"],
                'nome' => $valores["nome"],
                'tipoDoc' => $valores["tipo_doc"],
                'documento' => $valores["documento"],
                'telefone' => $valores["telefone"],
                'email' => $valores["email"]
            );
        }

        echo json_encode($dadosUsuarios);

    }else{
        echo "Nenhum registro encontrado";
    }
    $conn->close();

}
?>