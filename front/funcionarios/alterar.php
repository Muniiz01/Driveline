<?php 
require_once('conexaoDb.php');

session_start();

// quando ele logar no site vai crrar uma chave sessao, na chave vai ter o nivle dele verigico se e 2, 3 adm ou funcionario 
// 2 carro
// 3 tudo 
$POST= ['idVeiculo'] = $idVeiculo;

$sql= "UPDATE FROM veiculos WHERE id_veiculos="$idVeiculo"";
?>