<?php 
session_start();

// Define o cookie "dados" para expirar no passado, removendo assim o cookie
setcookie("dados", "", time() - 3600, "/");

session_destroy();
echo "teste";
?>
