let conta_slide = 1
document.getElementById("radio1").checked = true

setInterval(function () {
    proximagem()
}, 8000);

function proximagem() {
    conta_slide++
    if (conta_slide > 4) {
        conta_slide = 1
    }

    document.getElementById("radio"+conta_slide).checked = true
}
