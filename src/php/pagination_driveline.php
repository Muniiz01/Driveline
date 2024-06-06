<?php
    //conexão com o banco//
    $con = mysqli_connect("localhost" , "root" , "" , "driveline");
    ////
     
    //limite//
    $limit = 6;
    $page = 0;
    $output = '';
    ////


    if(isset($_POST["page"])){
        $page = $_POST['page'];
    }else{
        $page = 1;
    }

    $start_from =($page - 1)*$limit;
 
    
    $query = mysqli_query($con, "SELECT * from veiculos JOIN img_veiculo ON veiculos.id_veiculos = img_veiculo.idVeiculos ORDER BY id_veiculos ASC LIMIT $start_from, $limit");//busca no sql
    
    ///////////////////////////////
    $output .= " 
            <div class='catalogo_veiculos'>";
    ///////////////////////////////

    if(mysqli_num_rows($query) > 0){
        while($row = mysqli_fetch_array($query)){
            
    /////////////////////////////////////////////////////////////
    $output .= " 
            <section class='info_carro'>
                <div class='img_carro'><img src='src/".($row["caminho_imagem"])."'></div>
                    <article class='desc_veiculo'>
                <div class='modelo_carro'>modelo:        ".($row["modelo"])."</div>  
                <div class='passageiros'>passageiros:    ".($row["passageiros"])."</div>
                <div class='cor'>cor:                    ".($row["cor"])."</div>
                <div class='quilometragem'>quilometragem:".($row["quilometragem"])."</div>
                <div class='airbag'>airbag:              ".($row["airbag"])."</div>
                <div class='cambio'>cambio:              ".($row["cambio"])."</div>
                <div class='preco_veiculo'>Preco:        ".($row["preco_veiculo"])."</div>
                    </article>
                    <div>
                    <button class ='btn-aluguel' onclick = 'veiculo_selecionado(".($row['id_veiculos']).")'><i class='fa-solid fa-car'></i></button>
                    </div>
            </section>";
            ///////////////////////////////////////////////////////////////
        }
    }
    $output .= " 
            </div>";

//pagination code

$query = mysqli_query($con, "SELECT * FROM veiculos");
$total_records = mysqli_num_rows($query);
$total_pages = ceil($total_records/$limit);
////////////////////////////////////////////////////////////////////////////////////////////
$output .= "<ul class='pagination'>";

if($page > 1){
    $anterior = $page - 1;
    $output .= '<li class="page-item" id="1"><span class="page-link">Primeira página</span></li>';
    $output .= '<li class="page-item" id="'.$anterior.'"><span class="page-link">
    <i class="fa fa-solid fa-arrow-left"></i></span></li>';
}
for($i=1; $i<=$total_pages; $i++){
    $active_class = "";
    if($i == $page){
        $active_class = "active";
    }
    $output .= "<li class='page-item ".$active_class."'  id='".$i."'><span class='page-link'>".$i."</span></li>";
}
if($page < $total_pages){
    $page++;
    $output .= '<li class="page-item" id="'.$page.'"><span class="page-link"><i class="fa
    fa-arrow-right"></i></span></li>';
    $output .= '<li class="page-item" id="'.$total_pages.'"><span class="page-link">Ultima página</span></li>';
}
$output .= "</ul>";
echo $output; 
?>  