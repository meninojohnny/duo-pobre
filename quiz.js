import {finWord, findWordByCategory, findCategoriaById} from './service.js';

var words = [];
var drownWord;
var drownWords = [];
var conjunto = [];
var clicked = false;
var categoryId = "";
var category;

async function init() {
    var params = new URLSearchParams(window.location.search);
    categoryId = params.get('category');

    if (categoryId == "all") {
        words = await finWord();
        category = "Todos";
    } else {
        words = await findWordByCategory(categoryId);
        category = await findCategoriaById(categoryId);
        category = category.name;
    }
    conjunto = montarConjunto();
    adicionarAppBar();
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

function adicionarAppBar() {
    const textAppBar = document.querySelector(".app-bar");
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="category.html"><i class="fa-solid fa-arrow-left"></i></a>
                            <span class="text-app-bar">${category}</span>
                            <a class="btn-app-bar" href="inicial.html"><i class="fa-solid fa-house"></i></a>`;
}

function criarAlternativas() {
    var wordTitle = document.querySelector(".word");
    var alternatives = document.querySelector(".alternative-list");

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
        document.querySelector("#" + item).style.backgroundColor = "#ff4b4b";
        document.querySelector("#" + drownWord.id).style.backgroundColor = "#43c000";
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