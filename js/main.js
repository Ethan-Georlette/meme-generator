'use strict'
var gElCanvas;
var gCtx;


function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    // addListeners();
    createImgs();
    renderPage();
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
    lines.forEach((line) => {
        drawTxt(line)
    })
}
}
function drawTxt(line) {
    gCtx.font = 'Impact';
    console.log(line.txt);
    gCtx.fillText(line.txt, 100, 100);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)

}

function onTxt(txt) {
    updateTxt(txt);
    renderCanvas();
}
function drawImg(img) { 
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
// var gMeme = {
//  selectedImgId: 5,
//  selectedLineIdx: 0,
//  lines: [
//  {
//  txt: 'I never eat Falafel',
//  size: 20,
//  align: 'left',
//  color: 'red'
//  }
//  ]
// }
// }
function onAddLine() {

}