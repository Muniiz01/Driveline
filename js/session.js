window.addEventListener('load', function () {
    fetch('src/php/session.php')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                const msgTeste = this.document.getElementById('nome')

                const msg = data.map(item => item.nome)

                console.log(msg)
            }

        }).catch(error => {
            console.log(error)
        })
})