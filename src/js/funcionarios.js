
window.addEventListener('load', function(){
    fetch('php/session.php').then(response => response.json())
    .then(data => {
       if(Array.isArray(data)){
           const nivel = data.map(item => item.nivel)
           console.log(nivel)
   
           if(nivel != "2" && nivel != "3"){
               window.location.replace("../index.html")
           }
       }else{
           window.location.replace("../index.html")
       }
    })
   })




function exibirUsuarios() {
    fetch('php/listaUsuarios.php', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        const dadosDiv = document.getElementById('lista');
        const lista = data.map(item => `
            <tr>
                <td>${item.idUsuario}</td>
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.telefone}</td>
                <td>${item.documento}</td>
            </tr>
        `);
        dadosDiv.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Cpf</th>
                    </tr>
                </thead>
                <tbody>
                    ${lista.join('')}
                </tbody>
            </table>
        `;
    })
    .catch(error => {
        console.error('Erro ao buscar os dados dos usuários:', error)
        dadosDiv.innerHTML = "Nenhum registro encontrado";
    });
}


function exibirVeiculos() {
    
    
    fetch('php/listaVeiculos.php', { method: 'POST' }) // Comecamos chamando o metodo fetch() e damos os seguintes parametros 'listaVeiculos.php' Ele chama o aqrquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
    .then(response => response.json())
    .then(data => { // Atribui o array json no array data 
        const dadosDiv = document.getElementById('lista') // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'
        const lista = data.map(item => {   // A funcao data.map() cria um novo array com os resultados do array enviado pelo arquivo php json, nele e criado novos elementos html e inserido os resultados por exemplo: "${item.modelo}" item e o objeto array e modelo e a cahve array, todo o bloco e atribuido a const lista 
            return `<div>modelo: ${item.modelo}</div>  
            <div>passageiros: ${item.passageiros}</div>
                        <img class='img-car' src="${item.caminho_imagem}" alt="">
                        <button class='user-button' onclick="alterarCarro(${item.id_veiculos})">ALTERAR</button>`
                    });
                    
                    
                    dadosDiv.innerHTML = lista.join('')  // inseri os elementos html no funcionario.html 
                    /* console.log(data) */
                })
                .catch(error => {
                    // exibi o erro no console do navegador
                    console.error('Erro ao buscar os dados dos veículos:', error)
                    document.getElementById('lista').innerHTML = "Nenhum registro encontrado"
                    
                });
            }
            
            
function alterarCarro(idVeiculo){
                var div= document.getElementById("lista")
                div.innerHTML = `<div id='form-addCars'> 
                <input id='categoria' placeholder='categoria'> 
                <input id='modelo' placeholder='modelo'> 
                 <input id='marca' placeholder='marca'>  
                 <input id='cor' placeholder='cor'>  
                 <input id='quilometragem' placeholder='quilometragem'> 
                 <input id='cambio' placeholder='cambio'> 
                 <input id='passageiros' placeholder='qtd-passageiros'> 
                 <input id='ar-condicionado' placeholder='tem ar-condicionado?'> 
                 <input id='airbag' placeholder='tem airbag?'> 
                 <input id='abs' placeholder='tem abs?'> 
                 <input id='volume-carga' placeholder='volume de carga'> 
                 <input id='imagens' type='file' multiple accept='image/jpeg, image/png'> 
                 <textarea name='descricao' id='descricao' cols='30' rows='10' placeholder='descricao veiculo'></textarea>
                 <button id='btnEnviar' onclick='enviarFo(${idVeiculo})'>enviar</button>
                  </div>`

            }

            function enviarFo(idVeiculo){
                
                var categoria = document.getElementById('categoria').value // Atribui o valor do input pelo id em uma variavel " variavel contem o mesmo nome do input " 
                  var modelo = document.getElementById('modelo').value
                  var marca = document.getElementById('marca').value
                  var cor = document.getElementById('cor').value
                  var quilometragem = document.getElementById('quilometragem').value
                  var cambio = document.getElementById('cambio').value
                  var passageiros = document.getElementById('passageiros').value
                  var arCondicionado = document.getElementById('ar-condicionado').value
                  var airbag = document.getElementById('airbag').value
                  var abs = document.getElementById('abs').value
                  var volumeCarga = document.getElementById('volume-carga').value
                  var descricao = document.getElementById('descricao').value
              
              
                  var formData = new FormData()  // FormData e um metodo de armazenamemto para envio de arquivos para o lado do servidor 
                  formData.append('categoria', categoria)  // armazena as variaveis na funcao FormData 
                  formData.append('modelo', modelo)
                  formData.append('marca', marca)
                  formData.append('cor', cor)
                  formData.append('quilometragem', quilometragem)
                  formData.append('cambio', cambio)
                  formData.append('passageiros', passageiros)
                  formData.append('arCondicionado', arCondicionado)
                  formData.append('airbag', airbag)
                  formData.append('abs', abs)
                  formData.append('volumeCarga', volumeCarga)
                  formData.append('descricao', descricao)
              
                formData.append('idVeiculo', idVeiculo)
            
                fetch('php/alterar.php', {
                    method:'POST',
                    body: formData
                }).then(response => response.text()).then(data => {
                    console.log('carro alterado', idVeiculo, data)
            
                }).catch(error => {
                    console.log('error', error)
            
                })
            }