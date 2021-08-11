'use strict'
var gElCanvas;
var gCtx;


function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    // addListeners();
    createImgs();
    renderPage();
    onImgClick('img/sqrImg/18.jpg');
}
function renderPage() {
    const imgs = getImgs()
    var htmlStr = '';
    imgs.forEach(img => {
        htmlStr += `<img src="${img.url}" id=${img.id}   onclick="onImgClick('${img.url}')">\n`
    })
    console.log(htmlStr);
    document.querySelector('.main-content').innerHTML = htmlStr;
}
function onImgClick(url) {
    document.querySelector('.meme-generator').hidden = false;
    document.querySelector('.main-content').hidden = true;
    updateMeme(url);
    renderCanvas();

}
function renderCanvas() {
    var meme = getMeme();
    var img = new Image();
    img.src = meme.selectedImgUrl;
    img.onload = () => {
        drawImg(img)
        var lines = meme.lines;
        lines.forEach((line, idx) => {
            drawTxt(line)
            if (idx === meme.selectedLineIdx) {
                drawRect(line)
            }
        })
    }
}
function onTxt(txt) {
    updateTxt(txt);
    renderCanvas();
}
function drawTxt(line) {
    gCtx.font = '48px Impact';
    gCtx.textAlign = 'center';
    var textVertical = (!line.pos.y) ? line.size : -8
    gCtx.fillText(line.txt, line.pos.x, line.pos.y + textVertical);
    console.log(line.txt, line.pos.x, line.pos.y + textVertical);
}
function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function drawRect(line) {
    var y = line.pos.y
    var alignVertical = (!line.pos.y) ? line.size+8 : -line.size-8
    gCtx.beginPath()
    gCtx.rect(10, y, 470, alignVertical)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

}
function onAddLine() {
    addLine();
    document.querySelector('.txtLine').value='';
    renderCanvas();
}