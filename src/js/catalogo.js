window.onload = catalogo_index

var dadosDiv 
var tabela = 0
var quantidade_items = 0

function catalogo_index() {
    
    fetch('src/php/listaVeiculos.php', { method: 'POST' }) // Começamos chamando o metodo fetch() e damos os seguintes parametros 'listaVeiculos.php' Ele chama o arquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
        .then(response => response.json())
        .then(data => { // Atribui o array json no array data 
            
            
            // var dadosDiv = document.getElementById(`catalogo1`)
            // Sera atribuido um elemento html do index.html pelo id 'catalogo'
            const lista = data.map(item => {  
                // A funcao data.map() cria um novo array com os resultados do array enviado pelo arquivo php json, nele e criado novos elementos html e inserido os resultados por exemplo: "${item.modelo}" item e o objeto array e modelo e a cahve array, todo o bloco e atribuido a const lista 
                    dadosDiv = document.getElementById(`catalogo${tabela}`)
                    quantidade_items++

                if (quantidade_items > 6) {    
                    tabela ++
                    console.log('tabela',tabela)
                }
                else{

                   
                    
                    console.log('qntd',quantidade_items)
                    console.log('tabela',tabela)
                    // console.log('dados',dadosDiv)
                   
                    return `<div class='item'>
                    <img class='img-car' src="src/${item.caminho_imagem}">
                    
                <div class='info_carro'>
                    <div class='modelo_carro'>modelo:         ${item.modelo}       </div>  
                    <div class='passageiros'>passageiros:     ${item.passageiros}  </div>
                    <div class='cor'>cor:                     ${item.cor}          </div>
                    <div class='quilometragem'>quilometragem: ${item.quilometragem}</div>
                    <div class='airbag'>airbag:               ${item.airbag}       </div>
                    <div class='cambio'>cambio:               ${item.cambio}       </div>
                </div>
        
                    <a href='src/login.html'><button class ='btn-aluguel'><i class='fa-solid fa-car'></i></button></a>
                    </div>`
                    
                }  
                   
            });
            dadosDiv.innerHTML = lista.join('')  // inseri os elementos html no funcionario.html 
            /* console.log(data) */
        })

        .catch(error => {// exibi o erro no console do navegador
            console.error('Erro ao buscar os dados dos veículos:', error)
            document.getElementById('lista').innerHTML = "Nenhum registro encontrado"
        });
        
}
