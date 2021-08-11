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
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    setCanvasSize(gElCanvas.width);
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
        htmlStr += `
        <div class="img-container">\n
            <img src="${img.url}" id=${img.id}   onclick="onImgClick('${img.url}')">\n
        </div>\n`
    })
    console.log(htmlStr);
    document.querySelector('.main-content').innerHTML = htmlStr;
}
function setHomePage() {
    document.querySelector('.meme-generator').style.display = 'none';
    document.querySelector('main').hidden = false;
}
function onImgClick(url) {
    document.querySelector('.meme-generator').style.display = 'flex';
    document.querySelector('main').hidden = true;
    updateMeme(url);
    resizeCanvas();
    renderCanvas();

}
function renderCanvas() {
    document.querySelector('.txtLine').value = getCurrLine().txt;
    var meme = getMeme();
    var img = new Image();
    img.src = meme.selectedImgUrl;
    img.onload = () => {
        drawImg(img)
        var lines = meme.lines;
        if (!lines.length) return;
        lines.forEach((line, idx) => {
            drawTxt(line)
            if (idx === meme.selectedLineIdx) {
                drawRect(line);
                setSelected(line)
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
    gCtx.textAlign = line.align;
    var textVertical = -8
    gCtx.fillText(line.txt, line.pos.x, line.pos.y + textVertical);
}
function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function drawRect(line) {
    var y = line.pos.y
    var alignVertical = -line.size - 5
    gCtx.beginPath()
    gCtx.rect(10, y, gElCanvas.width-20, alignVertical)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

}
function onAddLine() {
    addLine();
    renderCanvas();
}
function onFontSize(val) {
    changeFontSize(val)
    renderCanvas();
}
function onTxtPos(val) {
    changeTxtPos(val)
    renderCanvas();
}
function onSwitchLine() {
    changeCurrLine()
    renderCanvas();
}
function onDelLine() {
    deleteCurrLine();
    renderCanvas();
}
function onAlign(val) {
    alignText(val);
    renderCanvas();
}
function setSelected(line) {
    var elSelects = document.querySelectorAll('.selected');
    for (var i = 0; i < elSelects.length; i++) {
        elSelects[i].classList.remove('selected');
    }
    switch (line.align) {
        case 'left':
            document.querySelector('.txtAlignLeft').classList.add('selected')
            break;
        case 'center':
            document.querySelector('.txtAlignCenter').classList.add('selected');
            break;
        case 'right':
            document.querySelector('.txtAlignRight').classList.add('selected')
            break;
    }
}
function toggleMenu() {
    document.body.classList.toggle('menu-open');
}