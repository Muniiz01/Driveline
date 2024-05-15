window.addEventListener('load', function () {
    fetch('src/php/session.php')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {

            const nivel = data.map((item) => item.nivel);
            const nome = data.map((item) => item.erro);
            console.log(`Ola ${nome}, seu nivel e: ${nivel}`);
            }

        }).catch(error => {
            console.log(error)
        })
})