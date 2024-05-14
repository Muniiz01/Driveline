
window.addEventListener("load", function () {
  fetch("php/session.php")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const nivel = data.map((item) => item.nivel);
        const nome = data.map((item) => item.nome);
        console.log(`Ola ${nome}, seu nivel e: ${nivel}`);

        if (nivel != "3") {
          window.location.replace("../index.html");
        }
      } else {
        window.location.replace("../index.html");
      }
    });
});
//Funções////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Adicionar/forms////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function adicionarVeiculos() {
  var div = document.getElementById("lista"); // Sera atribuido o elemento html com o id 'lista' na variavel div.
  div.innerHTML = `<div class='form_carros' id='form-addCars'> 
      <input id='categoria' placeholder='categoria'> 
      <input id='modelo' placeholder='modelo'> 
     <input id='marca' placeholder='marca'>  
     <input id='cor' placeholder='cor'>  
     <input id='quilometragem' placeholder='quilometragem'> 
     <input id='cambio' placeholder='cambio'> 
     <input id='passageiros' placeholder='qtd-passageiros'> 
     <input id='ar-condicionado' placeholder='tem ar-condicionado?'> 
     <input id='airbag' placeholder='tem airbag?'> 
     <input id='abs' placeholder='tem abs?'> 
     <input id='volume-carga' placeholder='volume de carga'> 
     <input id='imagens' type='file' multiple accept='image/jpeg, image/png'> 
     <textarea name='descricao' id='descricao' cols='30' rows='10' placeholder='descricao veiculo'></textarea>
     <button id='btnEnviar' onclick='enviarFormCar()'>enviar</button>
      </div>`;
} //  div.innerHTML inseri todos os elementos html no funcionarios.html
function adicionarFuncionario() {
  var div = document.getElementById("lista");
  div.innerHTML = `<div class='form_funcionarios' id='form-addFunc'> 
    <input id='nome' placeholder='Nome Completo'> 
    <input type="text" name="cpf" id="cpf" onkeydown="javascript: fMasc(this, mCPF)" maxlength="14" autocomplete="cpf" required placeholder='Cpf'>
    <input id="telefone" type="text" required autocomplete="tel" onkeydown="fMasc(this, mTel)" maxlength="15" placeholder='Telefone'> 
     <input id='email' placeholder='E-mail'> 
     <input id='senha' placeholder='Senha' type='password'> 
     <button id='btnEnviar' onclick='enviarFormFunc()'>enviar</button>
      </div>
       `;
}
function enviarFormCar() {
  var categoria = document.getElementById("categoria").value; // Atribui o valor do input pelo id em uma variavel " variavel contem o mesmo nome do input "
  var modelo = document.getElementById("modelo").value;
  var marca = document.getElementById("marca").value;
  var cor = document.getElementById("cor").value;
  var quilometragem = document.getElementById("quilometragem").value;
  var cambio = document.getElementById("cambio").value;
  var passageiros = document.getElementById("passageiros").value;
  var arCondicionado = document.getElementById("ar-condicionado").value;
  var airbag = document.getElementById("airbag").value;
  var abs = document.getElementById("abs").value;
  var volumeCarga = document.getElementById("volume-carga").value;
  var descricao = document.getElementById("descricao").value;
  var input = document.getElementById("imagens"); //  pega imagens atribuida no input do tipo file

  var imagens = input.files; // Atribui imagens em um array

  var formData = new FormData(); // FormData e um metodo de armazenamemto para envio de arquivos para o lado do servidor
  formData.append("categoria", categoria); // armazena as variaveis na funcao FormData
  formData.append("modelo", modelo);
  formData.append("marca", marca);
  formData.append("cor", cor);
  formData.append("quilometragem", quilometragem);
  formData.append("cambio", cambio);
  formData.append("passageiros", passageiros);
  formData.append("arCondicionado", arCondicionado);
  formData.append("airbag", airbag);
  formData.append("abs", abs);
  formData.append("volumeCarga", volumeCarga);
  formData.append("descricao", descricao);

  for (var i = 0; i < imagens.length; i++) {
    // laço de repeticao que percorre o array imagens e armazena na funcao FormData em formato de array
    var imagem = imagens[i];
    formData.append("imagens[]", imagem);
  }

  fetch("php/addVeiculos.php", {
    // funcao fetch() e damos os seguintes parametros 'addVeiculos.php' script do servidor
    method: "POST", // method: 'POST' que indica o tipo de envio para o servidor
    body: formData, // body: formData o corpo do envio que e todos os valores armazenado no FormData
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
function enviarFormFunc() {
  var nome = document.getElementById("nome").value;
  var documento = document.getElementById("cpf").value;
  var telefone = document.getElementById("telefone").value;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  var formData = new FormData();
  formData.append("nome", nome);
  formData.append("documento", documento);
  formData.append("telefone", telefone);
  formData.append("email", email);
  formData.append("senha", senha);

  fetch("php/addFuncionario.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); //exibi mensagem enviada do php
    })
    .catch((error) => {
      console.log(error); // exibe mensagem de erro enviada do php
    });
}
//exibir/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------
function exibirUsuarios() {
  selectedDiv = null
  const dadosDiv = document.getElementById("lista");

  fetch("php/listaUsuarios.php", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      
      const lista = data.map(
        (item) => `
            <tr class='tabela_usuario' id='${item.idUsuario}' onclick='selecionaTabela(${item.idUsuario})'>
                <td class='item_usuario'>${item.idUsuario}</td>
                <td class='item_usuario'>${item.nome}</td>
                <td class='item_usuario'>${item.email}</td>
                <td class='item_usuario'>${item.telefone}</td>
                <td class='item_usuario'>${item.documento}</td>
            </tr>
        `
      );
      dadosDiv.innerHTML = `
            <table class='tabela_usuario'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Cpf</th>
                    </tr>
                    <div action="Buscar.php" class="barra_pesquisa">
            <input class="barra" type="text" placeholder="Buscar">
            <button type="submit" class="btn_barra">Buscar</button>
    </div>
                    <div class='tabela_usuario_btn'> 
                    <button onclick='alterar()'>Alterar</button>
                    <button onclick='deletar()'>Excluir</button>
                    </div>
                </thead>
                <tbody>
                    ${lista.join("")}
                </tbody>
            </table>
        `;
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados dos usuários:", error);
      dadosDiv.innerHTML = "Nenhum registro encontrado";
    });
}





//--------------------------------------------------------------------------------------------
function exibirFuncionarios() {
  selectedDiv = null
  const dadosDiv = document.getElementById("lista");

  fetch("php/listaFuncionarios.php", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      
      const lista = data.map((item) => {
        return `
        

        <tr class='tabela_funcionario' id='${item.idUsuario}' onclick='selecionaTabela(${item.idUsuario}, ${item.nivelAcess})'>
        <td class='item_funcionario'>${item.idUsuario}</td>
        <td class='item_funcionario'>${item.nome}</td>
        <td class='item_funcionario'>${item.email}</td>
        <td class='item_funcionario'>${item.telefone}</td>
        <td class='item_funcionario'>${item.documento}</td>
        
        </tr>
    `;
      });

    dadosDiv.innerHTML = `
    <table class='tabela_funcionario'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cpf</th>   
            </tr>
        </thead>
        <div action="Buscar.php" class="barra_pesquisa">
            <input class="barra" type="text" placeholder="Buscar">
            <button type="submit" class="btn_barra">Buscar</button>
    </div>
        <div class='tabela_usuario_btn'> 
                 <button onclick='alterar()'>Alterar</button>
                 <button onclick='deletar()'>Excluir</button>
            </div>

        <tbody>
            ${lista.join("")}
        </tbody>
    </table>
`;
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados dos veículos:", error);
      document.getElementById("lista").innerHTML = "Nenhum registro encontrado";
    });
}

////////////Seleciona tabela para alteracoes ou deletar
var nivel
var id
var selectedDiv = null;

function selecionaTabela(idUser, nivelAcess) {
      var div = document.getElementById(idUser);
      
      
      if (div.classList.contains('tabelaSelect')) {
          div.classList.remove('tabelaSelect');
          selectedDiv = null;
          id = null
          nivel = null
      } else {
          
          if (selectedDiv !== null) {
              document.getElementById(selectedDiv).classList.remove('tabelaSelect');
              
          }
          
        
          div.classList.add('tabelaSelect');
          id = idUser
          nivel = nivelAcess
          selectedDiv = idUser;

      }
}


function exibirVeiculos() {
  const dadosDiv = document.getElementById("lista"); // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'

  fetch("php/listaVeiculos.php", { method: "POST" }) // Comecamos chamando o metodo fetch() e damos os seguintes parametros 'listaVeiculos.php' Ele chama o aqrquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
    .then((response) => response.json())
    .then((data) => {
      // Atribui o array json no array data
      
      const lista = data.map((item) => {
        // A funcao data.map() cria um novo array com os resultados do array enviado pelo arquivo php json, nele e criado novos elementos html e inserido os resultados por exemplo: "${item.modelo}" item e o objeto array e modelo e a cahve array, todo o bloco e atribuido a const lista
        return `<section class='item_lista_veiculo'>
                  <img class='img-car' src="${item.caminho_imagem}" alt="">
                  <article class='info_veiculo'>
                  <div>modelo: ${item.modelo}</div>  
                  <div>passageiros: ${item.passageiros}</div>
                  </article>
                  <button class='user-button' onclick="alterarCarro(${item.id_veiculos})">ALTERAR</button>
                </section>`;
      });

      dadosDiv.innerHTML = lista.join(""); // inseri os elementos html no funcionario.html
      /* console.log(data) */
    })
    .catch((error) => {
      // exibi o erro no console do navegador
      console.error("Erro ao buscar os dados dos veículos:", error);
      document.getElementById("lista").innerHTML = "Nenhum registro encontrado";
    });
}
function alterarCarro(idVeiculo){
  var div= document.getElementById("lista")
  div.innerHTML = `<div id='form-addCars'> 
  <input id='categoria' placeholder='categoria'> 
  <input id='modelo' placeholder='modelo'> 
   <input id='marca' placeholder='marca'>  
   <input id='cor' placeholder='cor'>  
   <input id='quilometragem' placeholder='quilometragem'> 
   <input id='cambio' placeholder='cambio'> 
   <input id='passageiros' placeholder='qtd-passageiros'> 
   <input id='ar-condicionado' placeholder='tem ar-condicionado?'> 
   <input id='airbag' placeholder='tem airbag?'> 
   <input id='abs' placeholder='tem abs?'> 
   <input id='volume-carga' placeholder='volume de carga'> 
   <input id='imagens' type='file' multiple accept='image/jpeg, image/png'> 
   <textarea name='descricao' id='descricao' cols='30' rows='10' placeholder='descricao veiculo'></textarea>
   <button id='btnEnviar' onclick='enviarFo(${idVeiculo})'>enviar</button>
    </div>`

}
//deleter//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deletar(){
  idUser = id
  nivelAcess = nivel
  var formData = new FormData();
  formData.append("idUsuario", idUser);
  formData.append("nivelAcess", nivelAcess);

  if (confirm('Voce tem certeza que deseja deletar?')) {
    // Save it!
    console.log('Salvo no Banco de dados.');
    fetch("php/deletaUsuario.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("usuario deletado", data);
        if(nivel == 2){
          exibirFuncionarios()
        }else{
          exibirUsuarios()
        }
       
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else {
    // Do nothing!
    console.log('Coisas não foram salvas no banco de dados');

  }
  
}
function alterar(){
  var div= document.getElementById("lista")
  div.innerHTML = `<div class='form_funcionarios' id='form-addFunc'> 
  <input id='nome' placeholder='Nome Completo'> 
  <input type="text" id="documento" onkeydown="javascript: fMasc(this, mCPF)" maxlength="14" autocomplete="cpf" required placeholder='Cpf'>
  <input id="telefone" type="text" required autocomplete="tel" onkeydown="fMasc(this, mTel)" maxlength="15" placeholder='Telefone'> 
   <input id='email' placeholder='E-mail'> 
   <button id='btnEnviar' onclick='enviarUsuario(${id})'>enviar</button>
    </div>
     `;
}
function enviarUsuario(idUsuario){
                  var nome = document.getElementById('nome').value // Atribui o valor do input pelo id em uma variavel " variavel contem o mesmo nome do input " 
                  var documento = document.getElementById('documento').value
                  var telefone = document.getElementById('telefone').value
                  var email = document.getElementById('email').value
                  
                  var formData = new FormData()  // FormData e um metodo de armazenamemto para envio de arquivos para o lado do servidor 
                  formData.append('nome', nome)  // armazena as variaveis na funcao FormData 
                  formData.append('documento', documento)
                  formData.append('telefone', telefone)
                  formData.append('email', email)
                  formData.append('idUsuario', idUsuario)
                  formData.append('nivel', nivel)
                  
            
                fetch('php/alterarUsuario.php', {
                    method:'POST',
                    body: formData
                }).then(response => response.text()).then(data => {
                    console.log('usuario alterado', idUsuario, data)
            
                }).catch(error => {
                    console.log('error', error)
            
                })
}
//mascaras/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fMasc(objeto, mascara) {
  obj = objeto;
  masc = mascara;
  setTimeout("fMascEx()", 1);
}
function retornaHome(){
  window.location.replace("../index.html")
}
function fMascEx() {
  obj.value = masc(obj.value);
}
function mCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}
function mTel(tel) {
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/^(\d\d)(\d)/g, "($1) $2");
  tel = tel.replace(/(\d{5})(\d)/, "$1-$2");
  return tel;
}

