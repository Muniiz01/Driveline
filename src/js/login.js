var root = document.documentElement
window.addEventListener('load', function(){
    var theme = localStorage.getItem("theme")
    
    if(theme == 'dark'){
        root.style.setProperty('--fundo', 'rgb(33,37,41)')
        root.style.setProperty('--fundo-tela-login', '#2b3035')
        root.style.setProperty('--hover', '#8bb9fe')
        root.style.setProperty('--hover2', '#8bb9fe')
        root.style.setProperty('--input', 'transparent')
        root.style.setProperty('--texto2', '#dee2e6')
        root.style.setProperty('--text-input', '#dee2e6')
        document.getElementById('imgLogo').src = 'imagens/logo/slim-logo-white.png'


    }else{
        root.style.setProperty('--fundo', 'rgb(238, 237, 237)')
        root.style.setProperty('--fundo-tela-login', 'white')
        root.style.setProperty('--hover', '#8bb9fe')
        root.style.setProperty('--hover2', 'black')
        root.style.setProperty('--input', 'transparent')
        root.style.setProperty('--texto2', 'grey')
        root.style.setProperty('--texto-input', 'black')
        document.getElementById('imgLogo').src = 'imagens/logo/slim-logo-png.png'


    }
})

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


