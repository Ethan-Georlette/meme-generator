'use strict'

function init(){
    gIsCanvas=false;
    setController();
    addListeners();
    createImgs();
    renderPage();
}

function setHomePage() {
    document.querySelector('.meme-generator').style.display = 'none';
    document.querySelector('main').hidden = false;
    document.querySelector('.my-gallery').hidden = true;
    changePage('1');
    renderPage();
    resetgMeme();
    gIsCanvas=false;
}

function onImgClick(url) {
    document.querySelector('.meme-generator').style.display = 'flex';
    document.querySelector('main').hidden = true;
    document.querySelector('.my-gallery').hidden = true;
    updateMeme(url);
    setSelectedLine(0);
    resizeCanvas();
    renderCanvas();
}

function onMyImgClick(idx) {
    document.querySelector('.meme-generator').style.display = 'flex';
    document.querySelector('main').hidden = true;
    document.querySelector('.my-gallery').hidden = true;
    const myImgs = getMyImgs();
    setMeme(myImgs[idx].meme);
    resizeCanvas();
    setSelectedLine(0);
    renderCanvas();
}

function onImgInput(ev) {
    loadImageFromInput(ev, onImgClick)
}

function onPage(value) {
    changePage(value);
    renderPage();
}

function onTxt(txt) {
    updateTxt(txt);
    renderCanvas();
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

function onFontChange(val) {
    setFont(val);
    renderCanvas();
}

function onFillColor(val) {
    setFillColor(val);
    renderCanvas();
}

function onStrokeColor(val) {
    setStrokeColor(val);
    renderCanvas();
}

function onDownloadImg() {
    renderCanvas('download');
}

function onShareImg() {
    renderCanvas('share')
}

function onSaveImg() {
    renderCanvas('save');
}

function closeModal() {
    document.body.classList.remove('modal');
}

function onMyGallery() {
    document.querySelector('.meme-generator').style.display = 'none';
    document.querySelector('main').hidden = true;
    var elMyGallery = document.querySelector('.my-gallery');
    elMyGallery.hidden = false;
    gIsCanvas=false;
    renderMyGallery();
}

function onDelete(val) {
    deleteFromDB(val);
    onMyGallery();
}