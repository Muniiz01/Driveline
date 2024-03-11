function adcionarVeiculos() {
    var div = document.getElementById("lista")
    div.innerHTML = "<div id='form-addCars'> <input id='categoria' placeholder='categoria'> <input id='modelo' placeholder='modelo'>  <input id='marca' placeholder='marca'>  <input id='cor' placeholder='cor'>  <input id='quilometragem' placeholder='quilometragem'> <input id='cambio' placeholder='cambio'> <input id='passageiros' placeholder='qtd-passageiros'> <input id='ar-condicionado' placeholder='tem ar-condicionado?'> <input id='airbag' placeholder='tem airbag?'> <input id='abs' placeholder='tem abs?'> <input id='volume-carga' placeholder='volume de carga'> <textarea name='descricao' id='descricao' cols='30' rows='10' placeholder='descricao veiculo'></textarea> <button id='btnEnviar' onclick='enviarForm()'>enviar</button></div>"
}

function enviarForm() {
    // Ação a ser executada quando o botão for clicado
    var categoria = document.getElementById('categoria').value
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


    var formData = new FormData()
    formData.append('categoria', categoria)
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



    fetch('addVeiculos.php', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
        .then(data => {
            console.log('cadastro realizado', data)
            // Exibi mensagens caso o servidor receba os dados
        }).catch(error => {
            console.log('erro:', error)
            // exibe mensagens em caso de erro ao enviar os dados 
        })


}

function exibirUsuarios() {
    /* var node = document.getElementById('lista')
    if(node != null){
        node.parentNode.removeChild(node)
    } */

    fetch('listaUsuarios.php', { method: 'GET' }).then(response => response.json()).then(data =>{
        const dadosDiv = document.getElementById('lista')
        const lista = data.map(item =>{
            return `<div> id: ${item.idUsuario} </div>
            <div> nome: ${item.nome} </div>
            <div> tipo documento: ${item.tipoDoc} </div>
            <div> documento ${item.documento} </div>
            <div> telefone: ${item.telefone} </div>
            <div> email: ${item.email} </div>`
        })

        dadosDiv.innerHTML = lista.join('')
        console.log(data)
    }).catch(error => {
        
        console.error('Erro ao buscar os dados dos veículos:', error)
    });

}

function exibirVeiculos() {

    // Remova o elemento 'form-addCars' se ele existir
    /*     var node = document.getElementById('form-addCars');
    if (node != null) {
        node.parentNode.removeChild(node);
    } */

    
    fetch('listaVeiculos.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
           
            const dadosDiv = document.getElementById('lista')
            const lista = data.map(item => {
                return `<div>modelo: ${item.modelo}</div> 
                        <div>passageiros: ${item.passageiros}</div>`
            });

            
            dadosDiv.innerHTML = lista.join('')
            console.log(data)
        })
        .catch(error => {
            
            console.error('Erro ao buscar os dados dos veículos:', error)
        });
}