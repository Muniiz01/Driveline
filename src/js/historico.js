function  historico(idV, idU){
    var formData = new FormData()

    formData.append('idVeiculo',idV)
    fetch('php/historico.php',{
        method: "POST",
        body:formData
    }).then(response => response.text()).then(data => {
        console.log(data)
    
    }).catch(error => {
        console.log('error', error)
    
    })
}

/* var formData = new FormData()
formData.append('idVeiculo', idVeiculo)

fetch('php/alterar.php', {
    method: 'POST',
    body: formData
}).then(response => response.text()).then(data => {
    console.log('carro alterado', idVeiculo, data)

}).catch(error => {
    console.log('error', error)

}) */