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
    $stmt = $conn-> prepare("CALL selectAll(?, ?)");
    $stmt->bind_param("ss", $idUser, $nivel);
    $stmt->execute();
    $resut = $stmt->get_result();
    $dadosUsaurio = array();

    while ($linha = $resut->fetch_assoc()){
        $dadosUsaurio[] = array(
            //adciona os dados em um array
            'nome' => $linha['nome'],
            'email' => $linha['email'] 
        );
    }
    echo json_encode($dadosUsaurio);
}else{
    echo json_encode($status);
}
?>