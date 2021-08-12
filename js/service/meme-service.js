'use strict'
var gKeywords = {}
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['donald-trump'] }];
var gMeme = {
    selectedImgUrl: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Example text',
            font:'Impact ,sans-serif',
            size: 48,
            align: 'center',
            color: 'black',
            pos: { x: 250, y: 60 }
        }
    ]
}
var gCanvas = {
    width: 500,
}

function createImgs() {
    var imgs = _createImgs();
    gImgs=imgs;
}

function getImgs() {
    return gImgs;
}
function updateMeme(url) {
    gMeme.selectedImgUrl = url;
}
function updateTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}
function getMeme() {
    return gMeme;
}
function renderLines() {
    gMeme.lines.forEach((line, idx) => {
        line.pos = getLinePos(idx);
    })
}
function addLine() {
    gMeme.selectedLineIdx = gMeme.lines.length;
    var pos = getLinePos(gMeme.selectedLineIdx);//util function that position the line in the right place on the canvas
    var line = {
        txt: '',
        size: 48,
        align: 'center',
        color: 'black',
        pos
    }
    gMeme.lines.push(line);
}
function changeFontSize(val) {
    if (val === '+') {
        gMeme.lines[gMeme.selectedLineIdx].size++;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].size--;
    }
}
function changeTxtPos(val) {
    if (val === '+') {
        gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].pos.y += 10;
    }
}
function moveLine(dx, dy) {
    var currLine = getCurrLine();
    currLine.pos.x += dx
    currLine.pos.y += dy
}
function changeCurrLine() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
        return;
    }
    gMeme.selectedLineIdx--;
}
function setSelectedLine(val) {
    gMeme.selectedLineIdx = val;
}
function deleteCurrLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--;
    if (!gMeme.lines.length) {
        addLine();
    }
}
function getXVal(line, txtWidth) {
    var x;
    switch (line.align) {
        case 'left':
            x = line.pos.x;
            break;
        case 'center':
            x = line.pos.x - txtWidth / 2;
            break;
        case 'right':
            x = line.pos.x - txtWidth;
            break;
    }
    return x;
}
function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}
function alignText(val) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = val.toLowerCase();
    switch (val) {
        case 'left':
            currLine.pos.x = 20;
            break;
        case 'center':
            currLine.pos.x = gCanvas.width / 2;
            break;
        case 'right':
            currLine.pos.x = gCanvas.width - 20;
            break;
    }
}
function setCanvasSize(width) {
    gCanvas.width = width;
    renderLines();
}
function getLinePos(numOfLine) {
    var pos;
    switch (numOfLine) {
        case 0:
            pos = { x: gCanvas.width / 2, y: 60 };
            break;
        case 1:
            pos = { x: gCanvas.width / 2, y: 500 };
            break;
        case 2:
            pos = { x: gCanvas.width / 2, y: 250 };
            break;
        default:
            pos = { x: gCanvas.width / 2, y: 250 };
    }
    return pos;
}
function setFont(val){
    getCurrLine().font=val;
}


function _createImgs() {
    var imgs = [];
    imgs.push({ id: 1, url: 'img/sqrImg/1.jpg', keywords: ['donald-trump', 'politican'] })
    imgs.push({ id: 2, url: 'img/sqrImg/2.jpg', keywords: ['animals', 'dogs'] })
    imgs.push({ id: 3, url: 'img/sqrImg/3.jpg', keywords: ['dogs', 'animals'] })
    imgs.push({ id: 4, url: 'img/sqrImg/4.jpg', keywords: ['cat', 'animals'] })
    imgs.push({ id: 5, url: 'img/sqrImg/5.jpg', keywords: ['success', 'kid'] })
    imgs.push({ id: 6, url: 'img/sqrImg/6.jpg', keywords: ['alians', 'history'] })
    imgs.push({ id: 7, url: 'img/sqrImg/7.jpg', keywords: ['kid', 'surprised'] })
    imgs.push({ id: 8, url: 'img/sqrImg/8.jpg', keywords: ['willy wonka', 'tell me more'] })
    imgs.push({ id: 9, url: 'img/sqrImg/9.jpg', keywords: ['kid', 'ploter'] })
    imgs.push({ id: 10, url: 'img/sqrImg/10.jpg', keywords: ['obama', 'politican'] })
    imgs.push({ id: 11, url: 'img/sqrImg/11.jpg', keywords: ['kiss', 'fight'] })
    imgs.push({ id: 12, url: 'img/sqrImg/12.jpg', keywords: ['you', 'what'] })
    imgs.push({ id: 13, url: 'img/sqrImg/13.jpg', keywords: ['cheers', 'leonardo dicaprio'] })
    imgs.push({ id: 14, url: 'img/sqrImg/14.jpg', keywords: ['matrix', 'what if i told you'] })
    imgs.push({ id: 15, url: 'img/sqrImg/15.jpg', keywords: ['not simply', 'one does'] })
    imgs.push({ id: 16, url: 'img/sqrImg/16.jpg', keywords: ['picard', 'laugh'] })
    imgs.push({ id: 17, url: 'img/sqrImg/17.jpg', keywords: ['putin', 'politican'] })
    imgs.push({ id: 18, url: 'img/sqrImg/18.jpg', keywords: ['everywhere', 'toy story'] })
    return imgs;
}