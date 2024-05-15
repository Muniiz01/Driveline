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

function logout(){

fetch ('src/php/logout.php',{
  // funcao fetch() e damos os seguintes parametros 'addVeiculos.php' script do servidor
  method: "POST", // method: 'POST' que indica o tipo de envio para o servidor
})  
.then((response) => response.text())
    .then((data) => {
      console.log(data);
      // Exibi mensagens caso o servidor receba os dados
    })
    .catch((error) => {
      console.log(error);
      // exibe mensagens em caso de erro ao enviar os dados
    });
}
  