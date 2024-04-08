

document.getElementById("meuFormulario").addEventListener("submit", function (event) {

    event.preventDefault()

    // pega os dados enviados do formulario
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var docTipo = document.getElementById('docTipo').value
    var documento = document.getElementById('documento').value
    var telefone = document.getElementById('telefone').value
    const senha = document.getElementById('senha').value

    // armazena os dados em um formData
    var formData = new FormData()
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('docTipo', docTipo)
    formData.append('documento', documento)
    formData.append('telefone', telefone)
    formData.append('senha', senha)


    // envia os dados para o cadastro.php
    fetch('cadastro.php', {
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


















