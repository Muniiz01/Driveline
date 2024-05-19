<?php
session_start();    

require_once("conexaoDb.php");

$conn = conexaoDb();


if($_SERVER["REQUEST_METHOD"] == "POST"){


    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $sql = "CALL SelecionarDadosDuasTabelas('$email')";

    $resultado = $conn->query($sql);

    if($resultado->num_rows > 0 ){
        while($linha = $resultado->fetch_assoc()){
            $senhaCripto = $linha['senha'];
            $idUser = $linha['id_usuario'];
            $nivel = $linha['idNivel_de_Acesso'];
            $nome = $linha['nome'];
            $email = $linha['email'];
        }
        if(password_verify($senha, $senhaCripto)){
             //Criarao uma sesao aqui
           
             $_SESSION['nivelAces'] = $nivel;
             $_SESSION['idUser'] = $idUser;
             $_SESSION['nome'] = $nome;
             $_SESSION['email'] = $email;

                $dados = array(
                    'idUser' => $idUser,
                    'nivelAces' => $nivel,
                    'nome' => $nome,
                    'email' => $email

                );
                
                $dados_serial = serialize($dados);

                setcookie("dados", $dados_serial, time() + 3600, "/");
              
             //cookie do usuario

             
            
           switch($nivel){
            case "1" :
                echo 1;
                break;

            case "2" :
                
                echo 2;
                break;
            case "3" :
                echo 3;
                break;

            default:
            echo "algum erro ai papai";
           }



        }else{
            echo "senha invalida";
            exit;
        }


    }else{
        echo "email nao existe";
    }

}

?>