
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
    <link rel="stylesheet" href="../bootstrap/bootstrap-css/bootstrap.css">
    <link rel="stylesheet" href="login_style.css">
    <script src="senha.js"></script>
</head>
<?php 
include('database.php')


if(isset($_POST['email']) && isset($_POST['senha'])){
    if(strlen($_POST['email'])== 0 ){
        echo "Preencha seu E-mail.";
    } else if(strlen($_POST['senha'])== 0 ){
        echo "Preencha seu E-mail.";
    } else{
        $email = $mysqli->real_escape_string($_POST['email']);
        $senha = $mysqli->real_escape_string($_POST['senha']);

        $sql_code = "SELECT * FROM usuarios WHERE email ='$email' AND senha = '$senha'";
        $sql_query = $mysqli ->query($sql_code) or die("Falha na conexão");

        $quantidade = $sql_query->num_rows;
        if($quantidade == 1){
            $usuario = $sql_query -> fetch_assoc();

            if(!isset($_SESSION)){
                session_start();
            }
            $_SESSION['id'] = $usuario['id'];
            $_SESSION['nome'] = $usuario['nome'];
        }else {
            echo "Falha ao logar!"
        }
    }
}

?>
<body>
    <!-- inicio da tela -->
    <form class="tela_login" method="POST">

        <!-- imagens -->
        <!-- caso seja adicionado uma imagem de "x"  -->
        <!-- <div class="cancelar">
            <img src="/imagens/cancel.png" width="40px">
        </div> -->
        <div class="img-logo">
            <img src="../imagens/logo/logo-png.png" width="70%">
        </div>
        <!-- texto -->
        <p class="display-5 text-center" id="login_texto">Login</p>
        <!-- </div> -->

        <!-- inputs  -->
        <!-- input email -->
        <div class="input-group" id="input-group-email">
            <input type="text" required>
            <span>E-mail</span>
        </div>
        <!-- input senha -->
        <div class="input-group" value="" id="input-group-senha">
            <input type="password" id="senha" required>
            <span>Senha</span>
            <input class="ver" type="checkbox" onclick="mostrarSenha()">
        </div>
        <!--  -->

        <!-- alias "ctrl" + ";" comenta tb -->
        <!-- botoes -->
        <!-- botao esqueceu a senha -->
        <div class="div_esqueceu">
            <a href="cadastro.html" id="botao_esqueceu_senha">esqueceu a senha?</a>
        </div>

        <!-- botoes finais enviar e cadastrar-se -->
        <div class="botoes_enviar_cadastrar">
            <button id="enviar" class="btn btn-primary btn-lg">Enviar</button>
            <a id="cadastro" href="../cadastro/cadastro.html">não possui conta?</a>

        </div>
    </form>
    <!-- fim da tela login -->
    <div class="home text-center">
        <a href="../home/home.html">voltar a página inicial</a>
    </div>
</body>

</html>
