'use strict'
var gElCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIsDrag = false;
var gIsCanvas = false;
var gPrevPos;

function setController(){
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
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
    gElCanvas.height = elContainer.offsetWidth;
    setCanvasSize(gElCanvas.width);
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (getSelectedLineIdx(pos) !== -1) {
        gPrevPos = pos;
        gIsDrag = true;
        setSelectedLine(getSelectedLineIdx(pos));
        renderCanvas();
    }
}

function getSelectedLineIdx(pos) {
    var meme = getMeme();
    var selectedLineIdx = meme.lines.findIndex(line => {
        var txtWidth = gCtx.measureText(line.txt).width;
        var x = getXVal(line, txtWidth);
        var alignVertical = -line.size - 8
        return ((x < pos.x && pos.x < x + txtWidth) && (pos.y < line.pos.y && pos.y > line.pos.y + alignVertical))
    })
    if (selectedLineIdx === -1) return selectedLineIdx;
    return selectedLineIdx;
}

function onMove(ev) {
    if (!gIsCanvas) return;
    const pos = getEvPos(ev);
    if (getSelectedLineIdx(pos) !== -1) {
        gElCanvas.style.cursor = 'pointer'
    } else {
        gElCanvas.style.cursor = 'auto'
    }
    if (!gIsDrag) return;
    const dx = pos.x - gPrevPos.x
    const dy = pos.y - gPrevPos.y
    moveLine(dx, dy)
    gPrevPos = pos;
    renderCanvas()
}

function onUp() {
    gIsDrag = false;
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
    var htmlStr =`
    <div class="main-content main-layout" id="gallery">
    <div class="img-container input-file">
    <input type="file" class="file-input" name="image" onchange="onImgInput(event)" />
    </div>`
    imgs.forEach(img => {
        htmlStr += `
        <div class="img-container">\n
            <img src="${img.url}" id=${img.id}   onclick="onImgClick('${img.url}')">\n
        </div>\n`
    })
    var numOfPages = getPages();
    htmlStr += `</div>
    <div class="pages flex center justify-center">
        <ul class="clean-list flex">
            <li class="minus" onclick="onPage('minus')"></li>`;
    for (var i = 0; i < numOfPages; i++) {
        htmlStr += `<li onclick="onPage('${i + 1}')">${i + 1}</li>`
    }
    htmlStr += `<li class="plus" onclick="onPage('plus')"></li></ul></div>`
    document.querySelector('.main-page').innerHTML = htmlStr;
    setSelectedPage(getCurrPage());
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.src = event.target.result;
        img.onload = onImageReady.bind(null, img.src)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderCanvas(isDownload = false) {
    gIsCanvas=true;
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    gCtx.fillStyle = '#fff'
    gCtx.fillRect(0, 0, canvas.width, canvas.height)
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
            if (idx === meme.selectedLineIdx && !isDownload) {
                drawRect(line);
                setSelected(line);
            }
        })
        if (isDownload) {
            if (isDownload === 'download') downloadImg();
            if (isDownload === 'save') saveImg();
            if (isDownload === 'share') uploadImg();
        }
    }
}

function drawTxt(line) {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    var textVertical = -8;
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.fillColor
    gCtx.fillText(line.txt, line.pos.x, line.pos.y + textVertical);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y + textVertical);
}

function drawImg(img) {
    var x = img.width;
    var y = img.height;
    if (x > y) {
        y = y - (y / x * (x - gElCanvas.width))
        x = 500;
    } else {
        x = x - (x / y * (y - gElCanvas.width))
        y = 500;
    }
    gCtx.drawImage(img, (gElCanvas.width - x) / 2, (gElCanvas.width - y) / 2, x, y)

}

function drawRect(line) {
    var y = line.pos.y
    var txtWidth = gCtx.measureText(line.txt).width;
    var x = getXVal(line, txtWidth);
    var alignVertical = -line.size - 5
    gCtx.beginPath()
    gCtx.rect(x, y, txtWidth, alignVertical)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

}

function downloadImg() {
    var elLink = document.querySelector('.download-link');
    const data = gElCanvas.toDataURL("image/jpeg");
    elLink.href = data;
    renderCanvas();
}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        document.body.classList.add('modal');
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-btns').innerHTML = `
        <a class="c-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           <i class="fab fa-facebook" onclick="closeModal()">Share</i>  
        </a>`
        renderCanvas();
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function saveImg() {
    var imgData = gElCanvas.toDataURL("image/jpeg");
    imgData = imgData.replace(/^data:image\/(png|jpeg);base64,/, "");
    saveImgToDB(imgData)
    onMyGallery();
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function renderMyGallery() {
    const myImgs = getMyImgs();
    var htmlStr = '';
    if (!myImgs.length) {
        htmlStr = `<h1>You have no Photos In Your Gallery </br> press<span onclick="setHomePage()"> HERE </span>To edit memes</h1>`
        document.querySelector('.my-gallery').innerHTML = htmlStr;
        return;
    }
    myImgs.forEach((img, idx) => {
        htmlStr += `
        <div class="img-container">\n
            <img src="data:image/jpeg;base64,${img.url}" >\n
            <button class="delImg myBtn" onclick="onDelete('${idx}')"></button>
            <button class="edit myBtn" onclick="onMyImgClick('${idx}')"></button>
        </div>\n`
    })
    document.querySelector('.my-gallery-imgs').innerHTML = htmlStr;
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
    document.querySelector('.fill-container').style.backgroundColor = line.fillColor + '70';
    document.querySelector('.stroke-container').style.backgroundColor = line.strokeColor + '70';
}

function setSelectedPage(pageIdx) {
    var elSelects = document.querySelectorAll('.pages li');
    for (var i = 0; i < elSelects.length; i++) {
        elSelects[i].classList.remove('currPage');
        if (elSelects[i].innerText == pageIdx) {
            elSelects[i].classList.add('currPage');
        }
    }
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function removeClass() {
    document.body.removeAttribute('class');
}