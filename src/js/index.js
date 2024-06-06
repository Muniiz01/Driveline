document.addEventListener('scroll', rolar)
//
var root = document.documentElement
var texto1 = document.getElementById('campo_texto1')
var texto2 = document.getElementById('campo_texto2')
var navbar = document.getElementById('navbar')
//
var ultimaposicao = 1
var podever = 0

function rolar() {

    var posicaoatual = window.scrollY;

    if (posicaoatual > ultimaposicao && podever === 0) {
        podever = 1;
    } else {
        setInterval(() => {
            navbar.style.transform = "translateY(0px)"
        }, 2000);
        }
    ultimaposicao = posicaoatual;
}
var tema_site

window.addEventListener('load', function(){
    var theme = localStorage.getItem("theme")
    
    if(theme == 'dark'){
        icone_sol.style.display = "block"
        icone_lua.style.display = "none"
        root.style.setProperty('--fundo', 'rgb(41, 41, 41)');    
        root.style.setProperty('--texto', 'white');    
        root.style.setProperty('--principal', 'black');    
        root.style.setProperty("--barra-pesquisa", "black")
        root.style.setProperty("--texto2", "white")
        tema_site = 0
    }else{
        icone_sol.style.display = "none"
        icone_lua.style.display = "block"
        root.style.setProperty('--texto', 'rgb(0, 0, 0)')    
        root.style.setProperty('--principal', 'white') 
        root.style.setProperty("--fundo", "rgb(216, 216, 216)")
        root.style.setProperty("--barra-pesquisa", "white")
        root.style.setProperty("--texto2", "gray")
        tema_site = 1
    }

})
//////////////////////////////////////////////////////////////////

var passa_slide = 0
function passa() {
    passa_slide++//acrescenta de 1 em 1 segundos
    // console.log(passa_slide,'passa_slide')
    ////////////////////////////////////////////////////////////////
    switch(passa_slide){
        case 1:
            texto1.style.opacity = ("1")
            // texto1.style.transform = ("translateX(0px)")
            // console.log("passou 1, trouxe")
        break
        case 11://11
            texto1.style.opacity = ("0")
            // texto1.style.transform = ("translateX(-1000px)")
            // console.log("passou 2, escondeu-se")
        break
        case 12://12
        texto2.style.opacity = ("1")
        // texto2.style.transform = ("translateX(0px)")
        // console.log("passou 3, trouxe")
        break
        case 22://22
            texto2.style.opacity = ("0")
            // texto2.style.transform = ("translateX(-1000px)") 
            // console.log("passou 4, escondeu-se")
            passa_slide = 0
        break
    }
}

////////////////////////////////////////////////////////////////////

var icone_lua = document.getElementById('icon_lua')
var icone_sol = document.getElementById('icon_sol')

function tema(){
    if(tema_site == 1){//escuro
        icone_sol.style.display = "block"
        icone_lua.style.display = "none"
        root.style.setProperty('--fundo', 'rgb(41, 41, 41)');    
        root.style.setProperty('--texto', 'white');    
        root.style.setProperty('--principal', 'black');    
        root.style.setProperty("--barra-pesquisa", "black")
        root.style.setProperty("--texto2", "white")        
        localStorage.setItem("theme", "dark")
        tema_site = 0
    }else{//claro

        icone_sol.style.display = "none"
        icone_lua.style.display = "block"
        root.style.setProperty('--texto', 'rgb(0, 0, 0)')    
        root.style.setProperty('--principal', 'white') 
        root.style.setProperty("--fundo", "rgb(216, 216, 216)")
        root.style.setProperty("--barra-pesquisa", "white")
        root.style.setProperty("--texto2", "gray")
        tema_site = 1
        localStorage.setItem("theme", "light")

    }
    
}

////////////////////////////////////////////////////////////////////

setInterval(() => {
    passa()
}, 1000)//1 segundo

function veiculo_selecionado(id_veiculos){
    localStorage.setItem("id_veiculo", id_veiculos)
    console.log(id_veiculos)
    window.location.href = "src/veiculo.html";
}
