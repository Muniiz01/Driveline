<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){


    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $sql = "SELECT id_usuario, senha FROM usuarios WHERE email = '$email' ";

    $resultado = $conn->query($sql);

    if($resultado->num_rows > 0 ){
        while($linha = $resultado->fetch_assoc()){
            $senhaCripto = $linha['senha'];
        }
        if(password_verify($senha, $senhaCripto)){
            echo "login realizado";
            while($linha = $resultado->fetch_assoc()){
                $idUser = $linha['id_usuario'];
                //Adcionar mais dados do usuario futuramente
            }

            //Criarao uma sesao aqui


        }else{
            echo "senha invalida";
            exit;
        }


    }else{
        echo "email nao existe";
    }



}

?>