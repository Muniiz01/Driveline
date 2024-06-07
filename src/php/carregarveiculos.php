<?php
require_once("conexaoDb.php");

if(isset($_POST)){
    $data = file_get_contents("php://input");
    $id_Veiculo = json_decode($data, true);
}

$conn = conexaoDb();
$output = '';

$query = mysqli_query($conn, "SELECT * from veiculos JOIN img_veiculo ON veiculos.id_veiculos = img_veiculo.idVeiculos WHERE id_veiculos = '$id_Veiculo'");

$output .= "<div class= 'container mt-5 mb-5 bg-light d-flex gap-3 align-items-center text-secondary' id='tela_veiculo'>
<div class='d-flex flex-column m-4'>"; 

if(mysqli_num_rows($query) > 0){
    while($row = mysqli_fetch_array($query)){
        
/////////////////////////////////////////////////////////////

$output .= '<img src="'.($row["caminho_imagem"]).'" class="rounded float-start">
</div>

<div class="d-flex flex-column">
            <h1 class="display-6 mb-3 mt-3">'.($row['marca']).' '.($row['modelo']).'</h1>
            <div class="d-flex align-items-end">
                <h2>R$'.($row['preco_veiculo']).'</h2><p class="ms-2">Diaria</p>
            </div>
            <p class="text-md-start pt-2 text-break ">'.($row['descricao']).'</p>
            <div class="d-flex">
                <div class = "d-flex" style = "width:max-content;">
                <ul class = "ps-1" style="list-style: none;">
                    <li><p><i class="fa-solid fa-paint-roller"></i> Cor: '.($row['cor']).'</p></li>
                    <li><p><i class="fa-solid fa-gears"></i> Câmbio: '.($row['cambio']).'</p></li>
                    <li><p><i class="fa-solid fa-car"></i> Quilometragem: '.($row['quilometragem']).'</p></li>
                    <li><p><i class="fa-solid fa-person"></i> Passageiros: '.($row['passageiros']).'</p></li>
                </ul>
                <ul style="list-style: none;">
                    <li><p><i class="fa-solid fa-weight"></i> carga: '.($row['volume_carga']).'</p></li>
                    <li><p><i class="fa-solid fa-wind"></i> Airbag: '.($row['airbag']).'</p></li>
                    <li><p><i class="fa-solid fa-gears"></i> Abs: '.($row['abs']).'</p></li>
                </ul>
                </div>
                
            </div>
           <div class="d-flex justify-content-end align-items-end">
                    <button class="btn btn-lg btn-primary mb-2" style="border-radius: 2rem;">Reservar</button>
                </div>
        </div>
    </div>';
    
}
}
else{
    $output .= "</div>";
}
echo $output;
?>