document.getElementById("formLogin").addEventListener("submit", function (event){

    event.preventDefault()

    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value

    var formData = new FormData()

    formData.append('email', email)
    formData.append('senha', senha)

    fetch('php/login.php', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
        .then(data => {
            console.log(data)
           if(data == 1){
            window.location.replace("../index.html")
           }else if(data == 2){
            window.location.replace("../src/funcionarios.html")
           }else if(data == 3){
            window.location.replace("../src/adm.html")
           }
            // Exibi mensagens caso o servidor receba os dados
        }).catch(error => {
            console.log('erro:', error)
            // exibe mensagens em caso de erro ao enviar os dados 
        })

})


