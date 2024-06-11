
window.addEventListener("load", function () {
  fetch("src/php/session.php")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        var nivel = data.map((item) => item.nivel);
        var nome = data.map((item) => item.nome);
        if(nivel == 1){
          document.getElementById('dropdownNav').innerHTML = `
          <li><button class="dropdown-item" onclick="logout()">Sair</button></li>
          `
          var button = document.getElementById("btn_reservas")
          button.disabled = false
        }else if(nivel == 2){
          document.getElementById('dropdownNav').innerHTML = `
          <li><a class="dropdown-item" href="src/funcionarios.html">Gerenciar</a></li>
          <li><button class="dropdown-item" onclick="logout()">Sair</button></li>
          `
        }else if(nivel == 3){
          document.getElementById('dropdownNav').innerHTML = `
          <li><a class="dropdown-item" href="src/adm.html">Gerenciar</a></li>
          <li><button class="dropdown-item" onclick="logout()">Sair</button></li>
          `
        }
        console.log(`Ola ${nome}, seu nivel e: ${nivel}`);
      }else{
        console.log(data)
        var button = document.getElementById("btn_reservas")
          button.disabled = true
      }
      
    });
});

function logout() {

  fetch('src/php/logout.php', {
    // funcao fetch() e damos os seguintes parametros 'addVeiculos.php' script do servidor
    method: "POST", // method: 'POST' que indica o tipo de envio para o servidor
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      // Exibi mensagens caso o servidor receba os dados
      window.location.reload()
      document.getElementById('dropdownNav').innerHTML = `<li><a class="dropdown-item" href="src/login.html">Login</a></li>
            <li><a class="dropdown-item" href="src/cadastro.html">Cadastrar se</a></li>
            <li><button class="dropdown-item" onclick="logout()">Sair</button></li>`
    })
    .catch((error) => {
      console.log(error);
      // exibe mensagens em caso de erro ao enviar os dados
    });
}

