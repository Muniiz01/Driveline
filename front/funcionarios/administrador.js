function adcionarVeiculos() {
    var div = document.getElementById("lista") // Sera atribuido o elemento html com o id 'lista' na variavel div. 
    div.innerHTML = "<div id='form-addCars'> <input id='categoria' placeholder='categoria'> <input id='modelo' placeholder='modelo'>  <input id='marca' placeholder='marca'>  <input id='cor' placeholder='cor'>  <input id='quilometragem' placeholder='quilometragem'> <input id='cambio' placeholder='cambio'> <input id='passageiros' placeholder='qtd-passageiros'> <input id='ar-condicionado' placeholder='tem ar-condicionado?'> <input id='airbag' placeholder='tem airbag?'> <input id='abs' placeholder='tem abs?'> <input id='volume-carga' placeholder='volume de carga'> <input id='imagens' type='file' multiple accept='image/jpeg, image/png'> <textarea name='descricao' id='descricao' cols='30' rows='10' placeholder='descricao veiculo'></textarea> <button id='btnEnviar' onclick='enviarForm()'>enviar</button></div>"
}                     //  div.innerHTML inseri todos os elementos html no funcionarios.html 

function enviarForm() {
    
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
    var input = document.getElementById('imagens')  //  pega imagens atribuida no input do tipo file 

    var imagens = input.files  // Atribui imagens em um array

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

    for(var i = 0; i < imagens.length; i++){      // laco de repeticao que percorre o array imagens e armazena na funcao FormData em formato de array 
        var imagem = imagens[i]            
        formData.append('imagens[]', imagem)
    }


    fetch('addVeiculos.php', {     // funcao fetch() e damos os seguintes parametros 'addVeiculos.php' script do servidor
        method: 'POST',            // method: 'POST' que indica o tipo de envio para o servidor
        body: formData             // body: formData o corpo do envio que e todos os valores armazenado no FormData
    }).then(response => response.text())
        .then(data => {
            console.log(data)
            // Exibi mensagens caso o servidor receba os dados
        }).catch(error => {
            console.log(error)
            // exibe mensagens em caso de erro ao enviar os dados 
        })


}

function exibirUsuarios() {  
    fetch('listaUsuarios.php', { method: 'GET' }).then(response => response.json()).then(data =>{    // Comecamos chamando o metodo fetch() e damos os seguintes parametros 'listaUsuarios.php' Ele chama o aqrquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
        const dadosDiv = document.getElementById('lista')  // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'
        const lista = data.map(item =>{    // A funcao data.map() cria um novo array com os resultados do array enviado pelo arquivo php json, nele e criado novos elementos html e inserido os resultados por exemplo: "${item.idUsuario}" item e o objeto array e idUsuario e a cahve array, todo o bloco e atribuido a const lista                                                
            return `<div> id: ${item.idUsuario} </div>
            <div> nome: ${item.nome} </div>
            <div> tipo documento: ${item.tipoDoc} </div>
            <div> documento ${item.documento} </div>
            <div> telefone: ${item.telefone} </div>
            <div> email: ${item.email} </div>
            <button onclick="deleteUser(${item.idUsuario})">deletar</button>`
        })

        dadosDiv.innerHTML = lista.join('') // inseri os elementos html no funcionario.html 
        /* console.log(data) */ 
    }).catch(error => {
        // exibi o erro no console do navegador 
        console.error('Erro ao buscar os dados dos veículos:', error)
         document.getElementById('lista').innerHTML = "Nenhum registro encontrado"

    });

}

function exibirFuncionarios(){
    fetch('listaFuncionarios.php', {method: 'GET'}).then(response => response.json()).then(data =>{
        const dadosDiv = document.getElementById('lista')
        const lista = data.map(item =>{                                               
            return `<div> id: ${item.idUsuario} </div>
            <div> nome: ${item.nome} </div>
           
            <div> telefone: ${item.telefone} </div>
            <div> email: ${item.email} </div>`
        })

        dadosDiv.innerHTML = lista.join('')
         
    }).catch(error => {
        console.error('Erro ao buscar os dados dos veículos:', error)
    })
}

function exibirVeiculos() {

    
    fetch('listaVeiculos.php', { method: 'POST' }) // Comecamos chamando o metodo fetch() e damos os seguintes parametros 'listaVeiculos.php' Ele chama o aqrquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
        .then(response => response.json())
        .then(data => { // Atribui o array json no array data 
            const dadosDiv = document.getElementById('lista') // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'
            const lista = data.map(item => {   // A funcao data.map() cria um novo array com os resultados do array enviado pelo arquivo php json, nele e criado novos elementos html e inserido os resultados por exemplo: "${item.modelo}" item e o objeto array e modelo e a cahve array, todo o bloco e atribuido a const lista 
                return `<div>modelo: ${item.modelo}</div>  
                        <div>passageiros: ${item.passageiros}</div>
                        <img src="${item.caminho_imagem}" alt="">`
            });

            
            dadosDiv.innerHTML = lista.join('')  // inseri os elementos html no funcionario.html 
            /* console.log(data) */
        })
        .catch(error => {
            // exibi o erro no console do navegador
            console.error('Erro ao buscar os dados dos veículos:', error)
        });
}

function deleteUser(idUsuario){
    var formData = new FormData()
    formData.append('idUsuario', idUsuario)

    fetch('deletaUsuario.php', {
        method:'POST',
        body:formData
    }).then(response => response.text()).then(data => {
        console.log('usuario deletado', data)

    }).catch(error => {
        console.log('error', error)

    })
}