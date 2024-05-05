window.addEventListener('load', function(){
    fetch('session.php')
    .then(response => response.json())
    .then(data =>{
        const msgTeste = this.document.getElementById('nome')

        const msg = data.map(item => item.nome)

        msgTeste.innerHTML = msg

    }).catch(error =>{
        console.log(error)
    })
})