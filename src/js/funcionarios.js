
//sessão//////////////////////////////////
window.addEventListener('load', function () {//executa a função ao iniciar a página
  fetch('php/session.php').then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        const nivel = data.map((item) => item.nivel);
        const nome = data.map((item) => item.nome);
        console.log(`Ola ${nome}, seu nivel e: ${nivel}`);

        if (nivel != "2" && nivel != "3") {
          window.location.replace("../index.html")
        }
      } else {
        window.location.replace("../index.html")
      }
    })
  var theme = localStorage.getItem("theme")
  document.documentElement.setAttribute('data-bs-theme', theme)


  if (theme == 'dark') {
    icone_sol.style.display = "block"
    icone_lua.style.display = "none"

    root.style.setProperty('--texto', 'white');
    root.style.setProperty('--principal', '#2b3035');

    tema_site = 0
  } else {
    icone_sol.style.display = "none"
    icone_lua.style.display = "block"
    root.style.setProperty('--texto', 'rgb(0, 0, 0)')
    root.style.setProperty('--principal', 'white')


    tema_site = 1
  }
})
///////////////////////////////////////////

function exibirUsuarios() {
  const dadosDiv = document.getElementById('lista');
  fetch('php/listaUsuarios.php', { method: 'GET' })
    .then(response => response.json())// dados do form no arquivo json
    .then(data => {

      const lista = data.map(item => `
        <tr id='${item.idUsuario}'>
        <th scope="row">${item.idUsuario}</th>
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.telefone}</td>
        <td>${item.documento}</td>
        </tr>
        `
      );
      document.getElementById('nomeLista').innerHTML = "Lista de Usuarios"
      document.getElementById('tableT2').innerHTML = "Nome"
      document.getElementById('tableT3').innerHTML = "Email"
      document.getElementById('tableT4').innerHTML = "Telefone"
      document.getElementById('tableT5').innerHTML = "Documento"

      document.getElementById('barraP').innerHTML = `
    <input class="form-control start-0" id='pesquisa' onkeyup="barraPesquisa('u')" type="search" placeholder="Search" aria-label="Search">
    `

      dadosDiv.innerHTML = lista.join('')

    })
    .catch(error => {
      console.error('Erro ao buscar os dados dos usuários:', error)
      dadosDiv.innerHTML = "Nenhum registro encontrado";
    });
}

function exibirVeiculos() {
  const dadosDiv = document.getElementById('lista')

  fetch('php/listaVeiculos.php', { method: 'POST' }) // Começamos chamando o metodo fetch() e damos os seguintes parametros 'listaVeiculos.php' Ele chama o arquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
    .then((response) => response.json())
    .then((data) => { // Atribui o array json no array data 
      // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'
      const lista = data.map((item) => {   // A funcao data.map() cria um novo array com os resultados do array enviado pelo arquivo php json, nele e criado novos elementos html e inserido os resultados por exemplo: "${item.modelo}" item e o objeto array e modelo e a cahve array, todo o bloco e atribuido a const lista 
        return `
                <tr id='${item.id_veiculos}' onclick= 'selecionaTabela(${item.id_veiculos},4)' >
        <th scope="row">${item.id_veiculos}</th>
        <td class='item_usuario'>${item.categoria}</td>
        <td class='item_usuario'>${item.marca}</td>
        <td class='item_usuario'>${item.modelo}</td>
        <td class='item_usuario'>${dolar(item.preco_veiculo)}</td>
      </tr>
      `
      });
      document.getElementById('nomeLista').innerHTML = "Lista de Veiculos"
      document.getElementById('tableT2').innerHTML = "Categoria"
      document.getElementById('tableT3').innerHTML = "Marca"
      document.getElementById('tableT4').innerHTML = "Modelo"
      document.getElementById('tableT5').innerHTML = "Preco"
      document.getElementById('butoesADV').innerHTML = `
      <button class="btn btn-secondary btn-sm" id="buttonA" data-bs-toggle="modal" data-bs-target="#visualizarV" disabled>Visualizar</button>
      <button class="btn btn-danger btn-sm" id="buttonH" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled>Excluir</button>
      `

      dadosDiv.innerHTML = lista.join('');
      /* console.log(data) */
    })
    .catch(error => {
      // exibi o erro no console do navegador
      console.error('Erro ao buscar os dados dos veículos:', error)
      document.getElementById('lista').innerHTML = "Nenhum registro encontrado"

    });
  document.getElementById('barraP').innerHTML = `
      <input class="form-control start-0" id='pesquisa' onkeyup="barraPesquisa('v')" type="search" placeholder="Search" aria-label="Search">
      `
}


function alterarCarro(idVeiculo) {
  var div = document.getElementById("lista")
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

function enviarFo(idVeiculo) {

  var categoria = document.getElementById('categoria').value // Atribui o valor do input pelo id em uma variavel " variavel contem o mesmo nome do input " 
  var modelo = document.getElementById('modelo').value
  var marca = document.getElementById('marca').value
  var cor = document.getElementById('cor').value
  var quilometragem = document.getElementById('quilometragem').value
  var cambio = document.getElementById('cambio').value
  var passageiros = document.getElementById('passageiros').value
  var arCondicionado = document.getElementById('ar-condicionado').value
  var airbag = document.getElementById('airbag').value
  var abs = document.getElementById('abs').value
  var volumeCarga = document.getElementById('volume-carga').value
  var descricao = document.getElementById('descricao').value


  var formData = new FormData()  // FormData e um metodo de armazenamemto para envio de arquivos para o lado do servidor 
  formData.append('categoria', categoria)  // armazena as variaveis na funcao FormData 
  formData.append('modelo', modelo)
  formData.append('marca', marca)
  formData.append('cor', cor)
  formData.append('quilometragem', quilometragem)
  formData.append('cambio', cambio)
  formData.append('passageiros', passageiros)
  formData.append('arCondicionado', arCondicionado)
  formData.append('airbag', airbag)
  formData.append('abs', abs)
  formData.append('volumeCarga', volumeCarga)
  formData.append('descricao', descricao)

  formData.append('idVeiculo', idVeiculo)

  fetch('php/alterar.php', {
    method: 'POST',
    body: formData
  }).then(response => response.text()).then(data => {
    console.log('carro alterado', idVeiculo, data)

  }).catch(error => {
    console.log('error', error)

  })
}
function barraPesquisa(tipo) {
  var query = document.getElementById('pesquisa').value

  var formData = new FormData();
  formData.append("query", query);
  formData.append("tipo", tipo);
  fetch("php/pesquisa.php", {
    method: "POST",
    body: formData,
  }).then(response => response.json())
    .then(data => {
      const dadosDiv = document.getElementById('lista')
      function verificaD(msg, value) {
        if (msg == "v") {
          return dolar(value)
        }
        return value
      }
      const lista = data.map(item => {
        var msg = item.msg
        if (msg == "Nenhum registro encontrado") {
          popup("Nenhum registro encontrado")
        } else {
          return `
        
        <tr id='${item.registro1}' onclick='selecionaTabela(${item.registro1})'>
        <th scope="row">${item.registro1}</th>
        <td class='item_usuario'>${item.registro2}</td>
        <td class='item_usuario'>${item.registro3}</td>
        <td class='item_usuario'>${item.registro4}</td>
        <td class='item_usuario'>${verificaD(tipo, item.registro5)}</td>
    </tr>
    `}
      });


      dadosDiv.innerHTML = lista.join('');


    }).catch(error => {


    });
}

var nivel
var id
var selectedDiv = null;
function selecionaTabela(idUser, nivelAcess) {
  var div = document.getElementById(idUser);
  console.log(div)

  if (div.classList.contains('table-active')) {
    div.classList.remove('table-active');
    selectedDiv = null;
    var buttonHab = document.getElementById("buttonH")
    var buttonHaa = document.getElementById("buttonA")
    buttonHaa.disabled = true
    buttonHab.disabled = true
    id = " "
    nivel = " "
    console.log(id)
  } else {

    if (selectedDiv !== null) {
      console.log(selectedDiv)
      document.getElementById(selectedDiv).classList.remove('table-active');

    }
    var buttonHab = document.getElementById("buttonH")
    var buttonHaa = document.getElementById("buttonA")
    buttonHaa.disabled = false
    buttonHab.disabled = false
    div.classList.add('table-active');
    id = idUser
    nivel = nivelAcess
    selectedDiv = idUser;
    console.log(id)
    console.log(nivel)

  }
}
function deletar() {
  idUser = id
  nivelAcess = nivel
  var formData = new FormData();
  formData.append("idUsuario", idUser);
  formData.append("nivelAcess", nivelAcess);

  fetch("php/deletaUsuario.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("usuario deletado");
      if (data == 2) {
        exibirFuncionarios()
        var buttonHab = document.getElementById("buttonH")
        buttonHab.disabled = true
      } else if (data == 1) {
        exibirUsuarios()
      } else if (data == 4)
        exibirVeiculos()
    })
    .catch((error) => {
      console.log("error", error);
    });

}
//retornaHome/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function retornaHome() {
  window.location.replace("../index.html")
}
//mascara/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dolar(e) {
  var num = parseInt(e, 10)
  var input = num
  var value = input

  value = (value / 100).toFixed(2).replace('.', ',')
  value = 'R$ ' + value
  input.value = value

  return value
}

//popup///////////
function popup(msg) {
  var myModal = new bootstrap.Modal(document.getElementById('meuModal'));
  document.getElementById('modalBody').innerHTML = msg
  myModal.show();
}
