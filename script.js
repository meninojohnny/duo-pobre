import {finWord} from './service.js';

var words = [];
var drownWord;
var drownWords = [];
var conjunto = [];
var clicked = false;

async function init() {
    words = await finWord();
    conjunto = montarConjunto();
    criarAlternativas();
}

function sortearPalavra() {
    var word = words.sort(() => Math.random() - 0.5)[0];
    if (drownWords.includes(word)) {
        return sortearPalavra();
    }
    return word;
}

function sortearAlternativa(alternatives) {
    var word = words.sort(() => Math.random() - 0.5)[0];
    if (alternatives.includes(word)) {
        return sortearAlternativa(alternatives);
    }
    return word;
}

function montarConjunto() {
    var alternatives = [];
    drownWord = sortearPalavra();
    alternatives.push(drownWord);
    for (var i = 0;i < 3;i++) {
        alternatives.push(sortearAlternativa(alternatives));
    }
    return alternatives.sort(() => Math.random() - 0.5);
}

function criarAlternativas() {
    var wordTitle = document.querySelector(".word");
    var alternatives = document.querySelector(".alternatives");

    wordTitle.innerHTML = drownWord.name;
    alternatives.innerHTML = "";

    conjunto.forEach(w => {
        alternatives.innerHTML += criarAlternativaItem(w);
    });
}

function criarAlternativaItem(item) {
    return `<div id=${item.id} onclick="verificar(id)" class="alternative-item">${item.translation}</div>`;
}

window.verificar = function(item) {
    if (!clicked) {
        document.querySelector("#" + item).style.backgroundColor = "#ef3c2d";
        document.querySelector("#" + drownWord.id).style.backgroundColor = "#70e000";
        clicked = true;
        document.querySelector(".btn-next").style.display = "block";
    }  
}

window.next = function() {
    if (drownWords.length == words.length) {
        drownWords = [];
    }
    clicked = false;
    document.querySelector(".btn-next").style.display = "none";
    conjunto = montarConjunto();
    criarAlternativas();
}

init();