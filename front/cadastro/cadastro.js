

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
            // Ainda estou trabalhando nisso // Exibi um popup informando usuario cadastrdo ou se o usuario ja existe
            console.log(data)
            var popup = document.getElementById('popup')
            popup.classList.toggle('popup-frame')
            document.getElementById('msg').innerHTML = `${data}`
            
        }).catch(error => {
            /* console.log(error) */
            // exibe mensagens em caso de erro ao enviar os dados 
            
        })

        function limpaCampo() { 
            // Ainda estou trabalhando nisso // Limpa o popup da tela e redireciona a pagina depois de um teempo (nao sei se e uma boa fazer isso =\) 
            /* popup.classList.toggle('popup-frame')
            window.location.replace("/driveline/front/home/index.html") */
        }
        setTimeout(limpaCampo, 5000)


})


















