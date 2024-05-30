function fMasc(objeto, mascara) {
    obj = objeto;
    masc = mascara;
    setTimeout("fMascEx()", 1)
}
function fMascEx() {
    obj.value = masc(obj.value)
}
function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}
function mTel(tel) {
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d\d)(\d)/g, "($1) $2")
    tel = tel.replace(/(\d{5})(\d)/, "$1-$2")
    return tel;
}


document.getElementById('preco_veiculo').addEventListener('input', function(e){
    var input = e.target
    var value = input.value

    value = value.replace(/\D/g, '')

    value = (value / 100).toFixed(2).replace('.', ',')
    value = 'R$ ' + value
    input.value = value


})


