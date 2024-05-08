// window.addEventListener('load', function () {
//     catalogo_index()
// })
function catalogo_index() {

    fetch('src/php/listaVeiculos.php', { method: 'POST' }) // Começamos chamando o metodo fetch() e damos os seguintes parametros 'listaVeiculos.php' Ele chama o arquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
    .then(response => response.json())
    .then(data => { // Atribui o array json no array data 
        const dadosDiv = document.getElementById('catalogo') // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'
        const lista = data.map(item => {   // A funcao data.map() cria um novo array com os resultados do array enviado pelo arquivo php json, nele e criado novos elementos html e inserido os resultados por exemplo: "${item.modelo}" item e o objeto array e modelo e a cahve array, todo o bloco e atribuido a const lista 
            return `<div class=item>
            <img class='img-car' src="src/${item.caminho_imagem}">
            <div class='modelo_carro'>modelo: ${item.modelo}</div>  
            <div class='passageiros'>passageiros: ${item.passageiros}</div>
            <div class='passageiros'>cor: ${item.cor}</div>
            <div class='passageiros'>quilometragem: ${item.quilometragem}</div>
            <div class='passageiros'>airbag: ${item.airbag}</div>
            <div class='passageiros'>cambio: ${item.cambio}</div>
                    </div>`
                        
                    });
                    dadosDiv.innerHTML = lista.join('')  // inseri os elementos html no funcionario.html 
                    /* console.log(data) */
                })
                .catch(error => {// exibi o erro no console do navegador
                    console.error('Erro ao buscar os dados dos veículos:', error)
                    document.getElementById('lista').innerHTML = "Nenhum registro encontrado"
                    
                });
        }