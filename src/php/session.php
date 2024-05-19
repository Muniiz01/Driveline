<?php
session_start();
require_once("conexaoDb.php");
$conn = conexaoDb();

if(isset($_SESSION["idUser"]) && isset($_SESSION['nivelAces'])){
    // puxa os dados da db
    $idUser = $_SESSION["idUser"];
    $nivel = $_SESSION['nivelAces'];

}else if(isset($_COOKIE["dados"])){
    $dados = unserialize($_COOKIE["dados"]);
    $nivel = $dados['idUser'];
    $idUser = $dados['nivelAces'];

    $_SESSION['nivelAces'] = $nivel;
    $_SESSION['idUser'] = $idUser;
}else{
   $status = "nao logado";
}
///////////////////////////////
if(isset($idUser) && isset($nivel)){
    $stmt = $conn-> prepare("CALL puxarTabelas(?, ?)");
    $stmt->bind_param("ss", $idUser, $nivel);
    $stmt->execute();
    $resut = $stmt->get_result();
    $dadosUsuario = array();

    while ($linha = $resut->fetch_assoc()){
        $dadosUsuario = array(
            //adciona os dados em um array
            'nome' => $linha['nome'],
            'email' => $linha['email'],
            'nivel' => $linha['idNivel_de_Acesso']
        );
    }
    echo json_encode($dadosUsuario);
}else{
    
        echo json_encode($status);
    
}
?>