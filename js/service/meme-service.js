'use strict'
const KEY = 'MyGalleryDB';
const PAGE_SIZE=9;
var gPageIdx = 0;
var gKeywords = {}
var gImgs;
var gMeme;
var gCanvas = {
    width: 500,
    height: 500
}
var gMyImgs = [];


function saveImgToDB(val) {
    gMyImgs.push({ url: val, meme:gMeme});
    _saveImgsToStorage();

}
function deleteFromDB(idx) {
    gMyImgs.splice(idx, 1);
    _saveImgsToStorage();
}
function getMyImgs() {
    _createMyImgs();
    return gMyImgs;
}
function createImgs() {
    var imgs = _createImgs();
    resetgMeme();
    gImgs = imgs;
}
function getCurrPage(){
    return gPageIdx+1;
}
function getImgs() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gImgs.slice(startIdx,startIdx+PAGE_SIZE);
}
function changePage(value) {
    if ((gPageIdx == 0 && value === 'minus') || (gPageIdx+1 === getPages() && value === 'plus')) return;
    if (value === 'plus') {
        gPageIdx++;
        return;
    }
    if (value === 'minus') {
        gPageIdx--;
        return;
    }
    gPageIdx = value-1;
}
function getPages() {
    return Math.ceil(gImgs.length / PAGE_SIZE);
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
    var pos = getLinePos(gMeme.lines.length);//util function that position the line in the right place on the canvas
    var line = {
        txt: 'Example text',
        font: getCurrLine().font,
        size: getCurrLine().size,
        align: getCurrLine().align,
        fillColor: getCurrLine().fillColor,
        strokeColor: getCurrLine().strokeColor,
        pos
    }
    gMeme.selectedLineIdx = (gMeme.lines.length) ? gMeme.lines.length : 0;
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
    gMeme.selectedLineIdx = 0;
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
    if (gMeme.selectedLineIdx === -1) return gMeme.lines[0];
    if(!gMeme.lines.length)return {
        txt: 'Example text',
        font: 'Impact ,sans-serif',
        size: 48,
        align: 'center',
        fillColor: '#000000',
        strokeColor: '#000000',
        pos: { x: 250, y: 60 }
    }
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
    gCanvas.height = width;
}
function getLinePos(numOfLine) {
    var pos;
    switch (numOfLine) {
        case 0:
            pos = { x: gCanvas.width / 2, y: 60 };
            break;
        case 1:
            pos = { x: gCanvas.width / 2, y: gCanvas.height };
            break;
        case 2:
            pos = { x: gCanvas.width / 2, y: gCanvas.height / 2 };
            break;
        default:
            pos = { x: gCanvas.width / 2, y: gCanvas.height / 2 };
    }
    return pos;
}
function setFont(val) {
    getCurrLine().font = val;
}
function setFillColor(val) {
    getCurrLine().fillColor = val;
}
function setStrokeColor(val) {
    getCurrLine().strokeColor = val;
}
function setMeme(meme) {
    gMeme = meme;
}
function _createImgs() {
    var imgs = [];
    imgs.push({ id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['donald-trump', 'politican'] })
    imgs.push({ id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['animals', 'dogs'] })
    imgs.push({ id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['dogs', 'animals'] })
    imgs.push({ id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['cat', 'animals'] })
    imgs.push({ id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['success', 'kid'] })
    imgs.push({ id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['alians', 'history'] })
    imgs.push({ id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['kid', 'surprised'] })
    imgs.push({ id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['willy wonka', 'tell me more'] })
    imgs.push({ id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['kid', 'ploter'] })
    imgs.push({ id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['obama', 'politican'] })
    imgs.push({ id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['kiss', 'fight'] })
    imgs.push({ id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['you', 'what'] })
    imgs.push({ id: 13, url: 'img/meme-imgs/13.jpg', keywords: ['cheers', 'leonardo dicaprio'] })
    imgs.push({ id: 14, url: 'img/meme-imgs/14.jpg', keywords: ['matrix', 'what if i told you'] })
    imgs.push({ id: 15, url: 'img/meme-imgs/15.jpg', keywords: ['not simply', 'one does'] })
    imgs.push({ id: 16, url: 'img/meme-imgs/16.jpg', keywords: ['picard', 'laugh'] })
    imgs.push({ id: 17, url: 'img/meme-imgs/17.jpg', keywords: ['putin', 'politican'] })
    imgs.push({ id: 17, url: 'img/meme-imgs/18.jpg', keywords: ['jersey shore', 'i told you'] })
    imgs.push({ id: 17, url: 'img/meme-imgs/19.jpg', keywords: ['dance', 'kids'] })
    imgs.push({ id: 17, url: 'img/meme-imgs/20.jpg', keywords: ['dogs', 'animals'] })
    imgs.push({ id: 17, url: 'img/meme-imgs/21.jpg', keywords: ['donald trump', 'politican'] })
    imgs.push({ id: 17, url: 'img/meme-imgs/22.jpg', keywords: ['look at all', 'sound of music'] })
    imgs.push({ id: 17, url: 'img/meme-imgs/23.jpg', keywords: ['oprah', 'everybody'] })
    imgs.push({ id: 18, url: 'img/meme-imgs/drevil.jpg', keywords: ['dr evil', 'quotes'] })
    imgs.push({ id: 19, url: 'img/meme-imgs/everywhere.jpg', keywords: ['everywhere', 'toy story'] })
    return imgs;
}
function resetgMeme() {
    var meme = {
        selectedImgUrl: '',
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Example text',
                font: 'Impact ,sans-serif',
                size: 48,
                align: 'center',
                fillColor: '#000000',
                strokeColor: '#000000',
                pos: { x: 250, y: 60 }
            }
        ]
    }
    gMeme = meme;
}
function _createMyImgs() {
    var imgs = loadFromStorage(KEY)
    gMyImgs = imgs;
    _saveImgsToStorage();
}
function _saveImgsToStorage() {
    saveToStorage(KEY, gMyImgs)
}