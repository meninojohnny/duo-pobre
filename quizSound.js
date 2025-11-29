import {finWord, findWordByCategory, findCategoriaById, falarComGoogle} from './service.js';

var words = [];
var drownWord;
var drownWords = [];
var conjunto = [];
var clicked = false;
var categoryId = "";
var category;
var count = 1;
var audio;

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
    adicionarAppBar();
    if (words.length > 0) {
        conjunto = montarConjunto();
        criarPlacar();
        criarAlternativas();
    }

    mostrarMain();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

function sortearPalavra() {
    var word = words.sort(() => Math.random() - 0.5)[0];
    if (drownWords.includes(word)) {
        return sortearPalavra();
    }
    drownWords.push(word);
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

function criarPlacar() {
    var placar = document.querySelector(".placar");
    placar.innerHTML = `<span class="count">${count}</span> / <span class="total">${words.length}</span>`;
}

async function criarAlternativas() {
    var alternatives = document.querySelector(".alternative-list");

    alternatives.innerHTML = "";

    conjunto.forEach(w => {
        alternatives.innerHTML += criarAlternativaItem(w);
    });
    audio = await falarComGoogle(drownWord.name);
}

function criarAlternativaItem(item) {
    return `<div id=${item.id} onclick="verificar(id)" class="alternative-item">${item.translation}</div>`;
}

window.mostrarAlternativa = function() {
    document.querySelector(".alternative-list").style.display = "block";
    document.querySelector(".btn-show").style.display = "none";
}

window.verificar = function(item) {
    if (!clicked) {
        document.getElementById(item).style.backgroundColor = "#ff4b4b";
        document.getElementById(item).style.color = "white";
        document.getElementById(drownWord.id).style.backgroundColor = "#43c000";
        document.getElementById(drownWord.id).style.color = "white";
        clicked = true;
        document.querySelector(".btn-next").style.display = "block";
    }  
}

window.next = function() {
    if (drownWords.length == words.length) {
        drownWords = [];
        count = 1;
    }
    clicked = false;
    document.querySelector(".btn-next").style.display = "none";
    conjunto = montarConjunto();
    document.querySelector(".alternative-list").style.display = "none";
    document.querySelector(".btn-show").style.display = "block";
    count += 1;
    criarPlacar();
    criarAlternativas();
}

window.toSayWord = function() {
    audio.play();
}

init();