'use strict'
// var gKeywords = {'happy': 12,'funny puk': 1}
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['donald-trump'] }];
var gMeme = {
    selectedImgUrl: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 48,
            align: 'center',
            color: 'black',
            pos: { x: 250, y: 60 }
        }
    ]
}

function createImgs() {
    var imgs = [];
    for (var i = 0; i < 18; i++) {
        imgs.push(createImg(i + 1))
    }
    gImgs = imgs;
}
function createImg(id) {
    return { id, url: `img/sqrImg/${id}.jpg` }
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
function changeCurrLine() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
        return;
    }
    gMeme.selectedLineIdx--;
}
function deleteCurrLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--;
    if (!gMeme.lines.length) {
        addLine();
    }
}
function setSelectedLine(pos) {
    var selectedLineIdx = gMeme.lines.findIndex(line => {
        var alignVertical = -line.size - 8
        return ((10 < pos.x && pos.x < 480) && (pos.y < line.pos.y && pos.y > line.pos.y + alignVertical))
    })
    if (selectedLineIdx === -1) return;
    gMeme.selectedLineIdx = selectedLineIdx;
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
            currLine.pos.x = 250;
            break;
        case 'right':
            currLine.pos.x = 470;
            break;
    }
}