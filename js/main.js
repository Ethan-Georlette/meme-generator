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
        htmlStr += `<img src="${img.url}" id=${img.id}   onclick="renderGenerator('${img.url}')">\n`
    })
    console.log(htmlStr);
    document.querySelector('.main-content').innerHTML = htmlStr;
}
function renderGenerator(url) {
    document.querySelector('.meme-generator').hidden = false;
    document.querySelector('.main-content').hidden = true;
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}
function onAddLine() {

}