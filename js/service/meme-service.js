'use strict'
// var gKeywords = {'happy': 12,'funny puk': 1}
var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['donald-trump']}];
var gMeme = {
 selectedImgId: 5,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I never eat Falafel',
 size: 20,
 align: 'left',
 color: 'red'
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

// function _saveCarsToStorage() {
//     saveToStorage(KEY, gCars)
// }