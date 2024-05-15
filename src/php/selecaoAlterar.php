<?php
require_once('conexaoDb.php');

$conn = conexaoDb();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $idUSer = $_POST['idUser'];
    $nvUser = $_POST['nvUser'];

    $stmt = $conn-> prepare("CALL puxarTabelas(?, ?)");
    $stmt->bind_param("ss", $idUser, $nvUser);
    $stmt->execute();
    $resut = $stmt->get_result();

    $dadosUsaurio = array();

    while ($linha = $resut->fetch_assoc()){
        $dadosUsaurio[] = array(
            //adciona os dados em um array
            'nome' => $linha['nome'],
            'email' => $linha['email'],
            'cpf' => $linha['documento'],
            'telefone' => $linha['telefone']
            
        );
    }
    echo json_encode($dadosUsaurio);
}
?>