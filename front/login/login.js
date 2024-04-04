document.getElementById("formLogin").addEventListener("submit", function (event){

    event.preventDefault()

    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value

    var formData = new FormData()

    formData.append('email', email)
    formData.append('senha', senha)

    fetch('login.php', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
        .then(data => {
            console.log(data)
            // Exibi mensagens caso o servidor receba os dados
        }).catch(error => {
            console.log('erro:', error)
            // exibe mensagens em caso de erro ao enviar os dados 
        })



})