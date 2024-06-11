
document.getElementById("meuFormulario").addEventListener("submit", function (event) {

    event.preventDefault()

    // pega os dados enviados do formulario
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value

    var documento = document.getElementById('documento').value
    documento = documento.replace(/[^0-9]/g, '')
    var telefone = document.getElementById('telefone').value
    telefone = telefone.replace(/[^0-9]/g, '')
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
            if (data == "Usuario cadastrado") {
                //redireciona para a pagina home
                fetch('php/login.php', {method: "POST", body: formData})
                .then((response)=>response.text())
                .then((data) => {
                    window.location.replace("../index.html")
                })
                
            } else {
                popup()
            }
        }).catch(error => {
            console.log(error)
            // exibe mensagens em caso de erro ao enviar os dados 
        })
    

})
//popup///////////
function popup() {
    var myModal = new bootstrap.Modal(document.getElementById('meuModal'));
    document.getElementById('msg').innerHTML = "Usuario ja existe"
    myModal.show();
}