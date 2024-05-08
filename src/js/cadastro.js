

document.getElementById("meuFormulario").addEventListener("submit", function (event) {

    event.preventDefault()

    // pega os dados enviados do formulario
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var documento = document.getElementById('documento').value
    var telefone = document.getElementById('telefone').value
    const senha = document.getElementById('senha').value

    // armazena os dados em um formData
    var formData = new FormData()
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('documento', documento)
    formData.append('telefone', telefone)
    formData.append('senha', senha)


    // envia os dados para o cadastro.php
    fetch('php/cadastro.php', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
        .then(data => {
            // Ainda estou trabalhando nisso // Exibi um popup informando usuario cadastrdo ou se o usuario ja existe
            if(data == "Usuario cadastrado"){
                //redireciona para a pagina home
                window.location.replace("../index.html")
            }
            // const popup = document.getElementById('popup')
            // popup.removeAttribute('class')
            // popup.classList.toggle('popup-on')
            // document.getElementById('msg').innerHTML = `${data}`

        }).catch(error => {
            console.log(error)
            // exibe mensagens em caso de erro ao enviar os dados 

        })
    // setTimeout(function () {
    //     popup.classList.toggle('popup-off') 

    // }, 2000)

})
function removerMascaraCPF(cpf) {
    return documento.replace(/\D/g, '');
}