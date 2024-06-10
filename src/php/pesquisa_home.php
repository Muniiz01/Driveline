<?php
require_once("conexaoDb.php");

$conn = conexaoDb();

$outputQuery = "";

if(isset($_POST)){
    $data = file_get_contents("php://input");
    $valor = json_decode($data, true);

}
$query = mysqli_query($conn, "SELECT * FROM veiculos WHERE marca = '$valor' OR modelo = '$valor'");

if(mysqli_num_rows($query) > 0){
    while($row = mysqli_fetch_array($query)){
        $outputQuery .= "
        <tr>
            <td class='ps-4 text-secondary p-3' onclick='veiculo_selecionado(".($row['id_veiculos']).")'>
                ".($row['marca'])."
                ".($row['modelo'])."        
            </td>
        </tr>";
    }
}

echo $outputQuery;
?>