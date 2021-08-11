'use strict'
var gElCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    createImgs();
    renderPage();
    onImgClick('img/sqrImg/18.jpg');
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchend', onUp)
}
function onDown(ev) {
    const pos = getEvPos(ev)
    setSelectedLine(pos);
    renderCanvas();
}
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
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
    document.querySelector('.txtLine').value=getCurrLine().txt;
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
    gCtx.font = `${line.size}px Impact`;
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
    var alignVertical = (!line.pos.y) ? line.size+6 : -line.size-5
    gCtx.beginPath()
    gCtx.rect(10, y, 470, alignVertical)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

}
function onAddLine() {
    addLine();
    renderCanvas();
}
function onFontSize(val){
    changeFontSize(val)
    renderCanvas();
}