document.getElementById("meuFormulario").addEventListener("submit", function (event) {

    event.preventDefault()

    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var docTipo = document.getElementById('docTipo').value
    var documento = document.getElementById('documento').value
    var genero = document.getElementById('genero').value
    var telefone = document.getElementById('telefone').value
    const senha = document.getElementById('senha').value

    var formData = new FormData()
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('docTipo', docTipo)
    formData.append('documento', documento)
    formData.append('genero', genero)
    formData.append('telefone', telefone)
    formData.append('senha', senha)

    fetch('server.php', {
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
})


















