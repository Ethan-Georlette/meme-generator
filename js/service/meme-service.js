'use strict'
// var gKeywords = {'happy': 12,'funny puk': 1}
var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['donald-trump']}];
var gMeme = {
 selectedImgUrl: '',
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I never eat Falafel',
 size: 48,
 align: 'center',
 color: 'black',
 pos:{x:250,y:0}
 }
 ]
}

function createImgs() {
    var imgs =  [];
    for (var i=0;i<18;i++){
        imgs.push(createImg(i+1))
    }
    gImgs = imgs;
}
function createImg(id){
    return {id,url:`img/sqrImg/${id}.jpg`}
}
function getImgs(){
    return gImgs;
}
function updateMeme(url){
    gMeme.selectedImgUrl=url;
}
function updateTxt(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt=txt;
}
function getMeme(){
    return gMeme;
}
function addLine(){
    gMeme.selectedLineIdx++;
    var pos=getLinePos(gMeme.selectedLineIdx);//util function that position the line in the right place on the canvas
    var line={ txt: '',
    size: 48,
    align: 'center',
    color: 'black',
    pos
    }
    gMeme.lines.push(line);
 }
