<?php

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){


    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $sql = "SELECT * FROM usuarios WHERE email = '$email' ";

    $resultado = $conn->query($sql);

    if($resultado->num_rows > 0 ){
        while($linha = $resultado->fetch_assoc()){
            $senhaCripto = $linha['senha'];
            $idUser = $linha['id_usuario'];
            $nivel = $linha['nivel_acs'];
        }
        if(password_verify($senha, $senhaCripto)){
            
           switch($nivel){
            case "1" :
                echo 1;
                break;

            case "2" :
                echo 2;
                break;

            default:
            echo "algum erro ai papai";
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