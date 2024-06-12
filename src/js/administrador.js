window.addEventListener("load", function () {
  fetch("php/session.php")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        var nivel = data.map((item) => item.nivel);
        var nome = data.map((item) => item.nome);
        console.log(`Ola ${nome}, seu nivel e: ${nivel}`);
        document.getElementById('nomeProfile').innerHTML = `Ola, ${nome}`


        if (nivel != "3") {
          window.location.replace("../index.html");
        }
      } else {
        window.location.replace("../index.html");
      }
    });
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
});

function fetchText(a, b, c, d) {

  fetch(`${a}`, {
    method: b,
    body: c,
  })
    .then((response) => response.text())
    .then((data) => {
      return console.log(data)
    }).catch((error) => {
      return console.log(error)
    })
}


//Funções////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function enviarFormCar() {
  var categoria = document.getElementById("categoria").value; // Atribui o valor do input pelo id em uma variavel " variavel contem o mesmo nome do input "
  var modelo = document.getElementById("modelo").value;
  var marca = document.getElementById("marca").value;
  var cor = document.getElementById("cor").value;
  var quilometragem = document.getElementById("quilometragem").value;
  var cambio = document.getElementById("cambio").value;
  var passageiros = document.getElementById("passageiros").value;
  var arCondicionado = document.querySelector('input[name="ar-cond"]:checked').value;
  var airbag = document.querySelector('input[name="airbag"]:checked').value;
  var abs = document.querySelector('input[name="airbag"]:checked').value;
  var volumeCarga = document.getElementById("volume-carga").value;
  var preco = document.getElementById("preco_veiculo").value;
  var preco_veiculo = preco.replace(/[^0-9]/g, '')
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
  formData.append("preco_veiculo", preco_veiculo);
  formData.append("descricao", descricao);

  for (var i = 0; i < imagens.length; i++) {
    // laço de repeticao que percorre o array imagens e armazena na funcao FormData em formato de array
    var imagem = imagens[i];
    formData.append("imagens[]", imagem);
  }

  fetchText("php/addVeiculos.php", "POST", formData)

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

  fetchText("php/addFuncionario.php", "POST", formData)
}
//exibir/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------

function fetchJson() {
  fetch(`${a}`, {
    method: b,
    body: c,
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    }).catch((error) => {
      return error
    })
}

function exibirUsuarios() {
  selectedDiv = null
  const dadosDiv = document.getElementById("lista");

  fetch("php/listaUsuarios.php", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {

      const lista = data.map(
        (item) => `
        <tr id='${item.idUsuario}' onclick='selecionaTabela(${item.idUsuario}, ${item.nivelAcess})'>
        <th scope="row">${item.idUsuario}</th>
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.telefone}</td>
        <td>${item.documento}</td>
        </tr>
        `
      );
      document.getElementById('tableT1').innerHTML = "#id"
      document.getElementById('tableT2').innerHTML = "Nome"
      document.getElementById('tableT3').innerHTML = "Email"
      document.getElementById('tableT4').innerHTML = "Telefone"
      document.getElementById('tableT5').innerHTML = "Documento"


      document.getElementById('butoesADV').innerHTML = `
      <button class="btn btn-secondary btn-sm" id="buttonA" data-bs-toggle="modal" data-bs-target="#alterBackdrop" onclick="alterar()" disabled>Alterar</button>
      <button class="btn btn-danger btn-sm" id="buttonH" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled>Excluir</button>
      `

      dadosDiv.innerHTML = lista.join("");
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados dos usuários:", error);
      dadosDiv.innerHTML = "Nenhum registro encontrado";
    });
  document.getElementById('barraP').innerHTML = `
    <input class="form-control start-0" id='pesquisa' onkeyup="barraPesquisa('u')" type="search" placeholder="Search" aria-label="Search">
    `
  document.getElementById('nomeLista').innerHTML = "Lista de Usuarios"
}



function alterar() {
  var div = document.getElementById("modalAlterar")
  fetch("php/listaUsuariosAlterar.php" + "?id=" + id, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {

      const lista = data.map((item) => {
        return `
        <form id='form-addFunc'>
        <div class="input-group mb-3  w-35 mx-auto">
          <i class="input-group-text fa-solid fa-user w-5"></i>
          <input type="text" id="nome" class="form-control" placeholder="Nome Completo"  aria-label="Nome Completo" value='${item.nome}' aria-describedby="basic-addon1"required>
        </div>
        <div class="input-group mb-3  w-35 mx-auto">
          <i class="input-group-text fa-solid fa-address-card w-5"></i>
          <input type="text" id="cpf" class="form-control" onkeydown="javascript: fMasc(this, mCPF)" maxlength="14" autocomplete="cpf"  placeholder="Documento" value='${item.documento}' aria-label="Documento" aria-describedby="basic-addons1"required>
        </div>
        <div class="input-group mb-3  w-35 mx-auto">
          <i class="input-group-text fa-solid fa-phone w-5"></i>
          <input type="text" id="telefone" class="form-control"  autocomplete="tel" onkeydown="fMasc(this, mTel)" placeholder="Telefone" maxlength="15" value='${item.telefone}' aria-label="Telefone" aria-describedby="basic-addons1"required>
        </div>
        <div class="input-group mb-3  w-35 mx-auto">
          <span class="input-group-text w-5">@</span>
          <input type="text" id="email" class="form-control"  placeholder="E-mail" autocomplete="new-email" aria-label="modelo" value='${item.email}' aria-describedby="basic-addons1"required>
        </div>
      </form>`;
      });
      document.getElementById("botaoAlterar").innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button class="btn btn-success mt-3 mb-4" id="btnEnviar" onclick='enviarUsuario(${id})' data-bs-dismiss="modal">Enviar</button> `
      div.innerHTML = "";
      div.innerHTML = lista.join("");

      // Desvincula o evento de clique após o primeiro clique
      document.getElementById("btnEnviar").removeEventListener("click", alterar);
    });
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

function exibirFuncionarios() {
  selectedDiv = null
  const dadosDiv = document.getElementById("lista");

  fetch("php/listaFuncionarios.php", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {

      const lista = data.map(
        (item) => `
          <tr id='${item.idUsuario}' onclick='selecionaTabela(${item.idUsuario},${item.nivelAcess})'>
          <th scope="row">${item.idUsuario}</th>
    <td class='item_usuario'>${item.nome}</td>
    <td class='item_usuario'>${item.email}</td>
    <td class='item_usuario'>${item.telefone}</td>
    <td class='item_usuario'>${item.documento}</td>
    
  </tr>
          `
      );
      document.getElementById('tableT1').innerHTML = "#id"
      document.getElementById('tableT2').innerHTML = "Nome"
      document.getElementById('tableT3').innerHTML = "Email"
      document.getElementById('tableT4').innerHTML = "Telefone"
      document.getElementById('tableT5').innerHTML = "Documento"
      document.getElementById('butoesADV').innerHTML = `
      <button class="btn btn-secondary btn-sm" id="buttonA" data-bs-toggle="modal" data-bs-target="#alterBackdrop" onclick="alterarFuncionario()" disabled>Alterar</button>
      <button class="btn btn-danger btn-sm" id="buttonH" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled>Excluir</button>
      `
      dadosDiv.innerHTML = lista.join("")



    })
    .catch((error) => {
      console.error("Erro ao buscar os dados dos usuários:", error);
      dadosDiv.innerHTML = "Nenhum registro encontrado";
    });
  document.getElementById('barraP').innerHTML = `
    <input class="form-control start-0" id='pesquisa' onkeyup="barraPesquisa('f')" type="search" placeholder="Search" aria-label="Search">
    `

  document.getElementById('nomeLista').innerHTML = "Lista de Funcionarios"
}
function alterarFuncionario() {
  var div = document.getElementById("modalAlterar")
  fetch("php/listaAlterarFuncionario.php" + "?id=" + id, { method: "GET" })

    .then((response) => response.json())
    .then((data) => {

      const lista = data.map((item) => {
        return `
        <form id='form-addFunc'>
        <div class="input-group mb-3  w-35 mx-auto">
          <i class="input-group-text fa-solid fa-user w-5"></i>
          <input type="text" id="nome" class="form-control" placeholder="Nome Completo"  aria-label="Nome Completo" value='${item.nome}' aria-describedby="basic-addon1"required>
        </div>
        <div class="input-group mb-3  w-35 mx-auto">
          <i class="input-group-text fa-solid fa-address-card w-5"></i>
          <input type="text" id="cpf" class="form-control" onkeydown="javascript: fMasc(this, mCPF)" maxlength="14" autocomplete="cpf"  placeholder="Documento" value='${item.documento}' aria-label="Documento" aria-describedby="basic-addons1"required>
        </div>
        <div class="input-group mb-3  w-35 mx-auto">
          <i class="input-group-text fa-solid fa-phone w-5"></i>
          <input type="text" id="telefone" class="form-control"  autocomplete="tel" onkeydown="fMasc(this, mTel)" placeholder="Telefone" maxlength="15" value='${item.telefone}' aria-label="Telefone" aria-describedby="basic-addons1"required>
        </div>
        <div class="input-group mb-3  w-35 mx-auto">
          <span class="input-group-text w-5">@</span>
          <input type="text" id="email" class="form-control"  placeholder="E-mail" autocomplete="new-email" aria-label="modelo" value='${item.email}' aria-describedby="basic-addons1"required>
        </div>
      </form>`;
      });
      document.getElementById("botaoAlterar").innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button class="btn btn-success" id="btnEnviar" onclick='enviarFuncionario(${id})' data-bs-dismiss="modal">Enviar</button> `
      div.innerHTML = "";
      div.innerHTML = lista.join("");



      // Desvincula o evento de clique após o primeiro clique
      document.getElementById("btnEnviar").removeEventListener("click", alterarFuncionario);
    });
}
////////////Seleciona tabela para alteracoes ou deletar
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

function enviarFuncionario(idUsuario) {

  var nome = document.getElementById('nome').value // Atribui o valor do input pelo id em uma variavel " variavel contem o mesmo nome do input " 
  var documento = document.getElementById('cpf').value
  var telefone = document.getElementById('telefone').value
  var email = document.getElementById('email').value

  var formData = new FormData()  // FormData e um metodo de armazenamemto para envio de arquivos para o lado do servidor 
  formData.append('nome', nome)  // armazena as variaveis na funcao FormData 
  formData.append('documento', documento)
  formData.append('telefone', telefone)
  formData.append('email', email)
  formData.append('idUsuario', idUsuario)
  formData.append('nivel', nivel)


  fetch('php/alterarFuncionario.php', {
    method: 'POST',
    body: formData
  }).then(response => response.text()).then(data => {
    console.log('Funcionário alterado', idUsuario, data)

  }).catch(error => {
    console.log('error', error)

  })
}


function exibirVeiculos() {
  selectedDiv = null
  const dadosDiv = document.getElementById("lista"); // Sera atribuido um elemento html do funcionarios.html pelo id 'lista'

  fetch("php/listaVeiculos.php", { method: "POST" }) // Comecamos chamando o metodo fetch() e damos os seguintes parametros 'listaVeiculos.php' Ele chama o aqrquivo php com o metodo 'GET' o arquivo php enviara um array no formato json
    .then((response) => response.json())
    .then((data) => {
      // Atribui o array json no array dataF

      const lista = data.map(
        (item) => `
      <tr id='${item.id_veiculos}' onclick= 'selecionaTabela(${item.id_veiculos},4)'>
        <th scope="row">${item.id_veiculos}</th>
        <td class='item_usuario'>${item.categoria}</td>
        <td class='item_usuario'>${item.marca}</td>
        <td class='item_usuario'>${item.modelo}</td>
        <td class='item_usuario'>${dolar(item.preco_veiculo)}</td>
      </tr>
        `
      );
      
    document.getElementById('tableT1').innerHTML = "#id"
      document.getElementById('tableT2').innerHTML = "Categoria"
      document.getElementById('tableT3').innerHTML = "Marca"
      document.getElementById('tableT4').innerHTML = "Modelo"
      document.getElementById('tableT5').innerHTML = "Preço"
      document.getElementById('butoesADV').innerHTML = `
      <button class="btn btn-secondary btn-sm" id="buttonA" data-bs-toggle="modal" data-bs-target="#alterBackdrop" onclick="alterarVeiculo()" disabled>Alterar</button>
      <button class="btn btn-danger btn-sm" id="buttonH" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled>Excluir</button>
      `


      dadosDiv.innerHTML = lista.join(""); // inseri os elementos html no funcionario.html
      /* console.log(data) */
    })
    .catch((error) => {
      // exibi o erro no console do navegador
      console.error("Erro ao buscar os dados dos veículos:", error);
      document.getElementById("lista").innerHTML = "Nenhum registro encontrado";
    });
  document.getElementById('barraP').innerHTML = `
      <input class="form-control start-0" id='pesquisa' onkeyup="barraPesquisa('v')" type="search" placeholder="Search" aria-label="Search">
      `

  document.getElementById('nomeLista').innerHTML = "Lista de Veiculos"
}

function alterarVeiculo() {
  var div = document.getElementById("modalAlterar")
  fetch("php/listaAlterarVeiculos.php" + "?id=" + id, { method: "GET" })

    .then((response) => response.json())
    .then((data) => {

      const lista = data.map((item) => {
        return `
      
      <div class="input-group mb-3 w-35 mx-auto">
      <label class="input-group-text" for="inputGroupSelect01">Categorias</label>
      <select class="form-select" id="categoria" value="${item.categoria}" required>
        <option value="grupo-b">Grupo B - Economico Compacto</option>
        <option value="grupo-be">Grupo BE - Eletrico Compacto</option>
        <option value="grupo-s">Grupo S - Economico Sedan</option>
        <option value="grupo-bf">Grupo BF - Intermediário Compacto</option>
        <option value="grupo-sf">Grupo SF - Intermediário Sedan</option>
        <option value="grupo-g">Grupo G - SUV</option>
        <option value="grupo-bg">Grupo BG - SUV Compacto</option>
        <option value="grupo-l">Grupo L - Executio</option>
        <option value="grupo-u">Grupo U - Utilitarios</option>
        <option value="SUV">SUV</option>
      </select>
    </div>

    <div class="input-group mb-3  w-35 mx-auto">
      <i class="input-group-text fa-solid fa-car w-5" id="basic-addons1"></i>
      <input type="text" class="form-control" id="modelo" placeholder="Modelo" value="${item.modelo}" autocomplete="off" aria-label="modelo"
        aria-describedby="basic-addons1">
    </div>

    <div class="mb-3">
      <div class="input-group mx-auto w-35">
        <i class="input-group-text fa-solid fa-car-side w-5" id="basic-addons2"></i>
        <input type="text" class="form-control" value="${item.marca}" id="marca" autocomplete="off" placeholder="Marca" aria-label="marca"
          aria-describedby="basic-addons2">
      </div>

      <div class="form-text mx-auto w-35" id="basic-addons2">Marca do veiculo por exemplo: fiat, ford..</div>
    </div>

    <div class="input-group mb-3 w-35 mx-auto">
      <label class="input-group-text" for="inputGroupSelect01">Tipo de Cambio</label>
      <select class="form-select" id="cambio" value="${item.cambio}" required>
        <option value="Automatico">Automatico</option>
        <option value="Manual">Manual</option>
      </select>
    </div>

    <div class="input-group mb-3 mx-auto w-35">
      <i class="input-group-text fa-solid fa-palette w-5" id="basic-addons3"></i>
      <input class="form-control" id="cor" value="${item.cor}" type="text" autocomplete="off" placeholder="Cor" aria-label="cor"
        aria-describedby="basic-addons3">
    </div>
    <div class="input-group mb-3 mx-auto w-35">
      <i class="input-group-text fa-solid fa-road w-5" id="basic-addons4"></i>
      <input class="form-control" value="${item.quilometragem}" id="quilometragem" type="text" autocomplete="off" placeholder="Quilometragem"
        aria-label="quilometragem" aria-describedby="basic-addons4">
    </div>
    <div class="mb-3 ">
      <div class="input-group mx-auto w-35">
        <i class="input-group-text fa-solid fa-user w-5" id="basic-addons5"></i>
        <input class="form-control" value="${item.passageiros}" id="passageiros" type="text" autocomplete="off" placeholder="Passageiros"
          aria-label="quilometragem" aria-describedby="basic-addons4">
      </div>
      <div class="mx-auto form-text w-35" id="basic-addons5">Quantidade suportada de Passageiros</div>
    </div>
    <div class="input-group mb-3 mx-auto w-35">
      <i class="fa-solid fa-weight-hanging input-group-text w-5"></i>
      <input class="form-control" value="${item.carga}" id="volume-carga" type="text" autocomplete="off" placeholder="Volume de carga"
        aria-label="carga" aria-describedby="basic-addons5">
    </div>
    <div class="input-group mb-3 mx-auto w-35">
      <i class="fa-solid fa-dollar-sign input-group-text w-5"></i>
      <input class="form-control" value="${item.preco_veiculo}" type="text" id="preco_veiculo" autocomplete="off" placeholder="Valor do aluguel"
        aria-label="preco" aria-describedby="basic-addons5">
    </div>
    <div class="mb-3 mx-auto w-35">
      <label for="FormControl1" class="form-label">Descricão do veiculo</label>
      <textarea class="form-control" name="FormControl1" placeholder="Coloque uma descricao" id="descricao" rows="4"></textarea>
    </div>
    <div class="mb-3 mx-auto w-35">
      <label for="">Possui ar-condicionado?</label>
      <div class="input-group-text mb-3 w-35">
        <label class="me-2" for="ar-cond">Sim</label>
        <input class="form-check-inputA mt-0" type="radio" name="ar-cond" value="Sim" aria-label="ar-cond">
      </div>
      <div class="input-group-text mb-3 w-35">
        <label class="me-2" for="ar-cond">Não</label>
        <input class="form-check-inputA input-end mt-0" type="radio" name="ar-cond" value="Não" aria-label="ar-cond">
      </div>
    </div>
    <div class="mb-3 mx-auto w-35">
      <label for="">Possui airbag?</label>
      <div class="input-group-text mb-3 w-35">
        <label class="me-2" for="airbag">Sim</label>
        <input class="form-check-inputB mt-0" type="radio" name="airbag" value="Sim" aria-label="airbag">
      </div>
      <div class="input-group-text mb-3 w-35">
        <label class="me-2" for="airbag">Não</label>
        <input class="form-check-inputB input-end mt-0" type="radio" name="airbag" value="Não" aria-label="airbag">
      </div>
    </div>
    <div class="mb-3 mx-auto w-35">
      <label for="">Possui abs?</label>
      <div class="input-group-text mb-3 w-35">
        <label class="me-2" for="abs">Sim</label>
        <input class="form-check-inputS mt-0" type="radio" name="abs" value="Sim" aria-label="abs">
      </div>
      <div class="input-group-text mb-3 w-35">
        <label class="me-2" for="abs">Não</label>
        <input class="form-check-inputS input-end mt-0" type="radio" name="abs" value="Não" aria-label="abs">
      </div>
    </div>

        `
        ;
      });
      document.getElementById("botaoAlterar").innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button class="btn btn-success" id="btnEnviar" onclick='enviarVeiculo(${id}); exibirVeiculos()' data-bs-dismiss="modal">Enviar</button> `
      div.innerHTML = "";
      div.innerHTML = lista.join("");



      // Desvincula o evento de clique após o primeiro clique
      document.getElementById("btnEnviar").removeEventListener("click", alterarFuncionario);
    });


}
 function enviarVeiculo(id){
  var id_veiculos = id
  var categoria = document.getElementById("categoria").value;
  var modelo = document.getElementById("modelo").value;
  var marca = document.getElementById("marca").value;
  var cor = document.getElementById("cor").value;
  var quilometragem = document.getElementById("quilometragem").value;
  var cambio = document.getElementById("cambio").value;
  var passageiros = document.getElementById("passageiros").value;
  var arCondicionado = document.querySelector('input[name="ar-cond"]:checked').value;
  var airbag = document.querySelector('input[name="airbag"]:checked').value;
  var abs = document.querySelector('input[name="airbag"]:checked').value;
  var volumeCarga = document.getElementById("volume-carga").value;
  var preco = document.getElementById("preco_veiculo").value;
  var preco_veiculo = preco.replace(/[^0-9]/g, '')
  var descricao = document.getElementById("descricao").value;
 


  var formData = new FormData(); // FormData e um metodo de armazenamemto para envio de arquivos para o lado do servidor
  formData.append("id_veiculos", id_veiculos)
  formData.append("categoria", categoria); // armazena as variaveis na funcao FormData
  formData.append("modelo", modelo);
  formData.append("marca", marca);
  formData.append("cor", cor);
  formData.append("quilometragem", quilometragem);
  formData.append("cambio", cambio);
  formData.append("passageiros", passageiros);
  formData.append("ar_condicionado", arCondicionado);
  formData.append("airbag", airbag);
  formData.append("abs", abs);
  formData.append("volumeCarga", volumeCarga);
  formData.append("preco_veiculo", preco_veiculo);
  formData.append("descricao", descricao);

  fetch("php/enviarVeiculo.php", {method: "POST",body: formData,})
  .then((response)=>response.json())
  .then((data)=>{

  }).catch(error =>{

  })
 }
//deleter//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function enviarUsuario(idUsuario) {
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
    method: 'POST',
    body: formData
  }).then(response => response.text()).then(data => {
    console.log('usuario alterado', idUsuario, data)

  }).catch(error => {
    console.log('error', error)

  })
}

function historico(){
  const dadosDiv = document.getElementById("lista")
  fetch('php/historico.php', {
    method: 'GET'
  }).then(response => response.json())
  .then(data => {
    const lista = data.map(
      (item) => `
    <tr>
      <th scope="row">#</th>
      <td class='item_usuario'>${item.data}</td>
      <td class='item_usuario'>${item.modelo}</td>
      <td class='item_usuario'>${item.nome}</td>
      <td class='item_usuario'>${item.email}</td>
    </tr>
      `
     
    );
    document.getElementById('tableT1').innerHTML = "#id"
    document.getElementById('tableT2').innerHTML = "Data"
    document.getElementById('tableT3').innerHTML = "Modelo"
    document.getElementById('tableT4').innerHTML = "Nome"
    document.getElementById('tableT5').innerHTML = "Email"
    dadosDiv.innerHTML = lista.join("");
    document.getElementById('butoesADV').innerHTML = ""

  }).catch(error => {
    console.error("Erro ao buscar os dados dos veículos:", error);
      document.getElementById("lista").innerHTML = "Nenhum registro encontrado";

  })
  document.getElementById('barraP').innerHTML = `
    <input class="form-control start-0" id='pesquisa' onkeyup="barraPesquisa('h')" type="search" placeholder="Search" aria-label="Search">
    `

  document.getElementById('nomeLista').innerHTML = "Lista de Historico"
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
  setTimeout(function () {
    myModal.hide()
  }, 3000)
}