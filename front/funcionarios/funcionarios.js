

function exibirUsuarios() {  
    fetch('listaUsuarios.php', { method: 'GET' }).then(response => response.json()).then(data =>{    // Comecamos chamando o metodo fetch() e damos os seguintes parametros 'listaUsuarios.php' Ele chama o aqrquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
        const dadosDiv = document.getElementById('lista')  // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'
        const lista = data.map(item =>{  
                                                              
            return `<div> id: ${item.idUsuario} </div>
            <div> nome: ${item.nome} </div>
            <div> tipo documento: ${item.tipoDoc} </div>
            <div> documento ${item.documento} </div>
            <div> telefone: ${item.telefone} </div>
            <div> email: ${item.email} </div>`
        })

        dadosDiv.innerHTML = lista.join('') // inseri os elementos html no funcionario.html 
        /* console.log(data) */ 
    }).catch(error => {
        // exibi o erro no console do navegador 
        console.error('Erro ao buscar os dados dos veículos:', error)
        document.getElementById('lista').innerHTML = "Nenhum registro encontrado"

    });

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

