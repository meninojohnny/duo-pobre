import {addWord, finWord, findCategory, removeWord, updateWord} from './service.js';

var words = [];
var categories = [];

async function init() {
    words = await finWord();
    categories = await findCategory();

    var selectOption = document.querySelector(".form-select");
    categories.forEach(item => {
        selectOption.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });

    createWordEditList();
    mostrarMain();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

function createWordEditList() {
    var wordList = document.querySelector(".word-list");
    wordList.innerHTML = "";

    words.forEach(item => {
        wordList.innerHTML += createWordEditItem(item);
    });
}

function createWordEditItem(item) {
    return `<div class="word-edit-item">
                <div class="word-edit-item-content">
                    <span class="word-name word-name-${item.id}">${item.name}</span>
                    <div class="form-edit-word-item form-edit-word-item-${item.id}">
                        <input type="text" value="${item.name}" class="form-control name-word-item name-word-item-${item.id}" placeholder="Palavra" aria-label="Username" aria-describedby="basic-addon1">
                        <input type="text" value="${item.translation}" class="form-control translation-word-item translation-word-item-${item.id}" placeholder="Tradução" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                </div>
                <span id="${item.id}" class="btn btn-edit btn-edit-${item.id}" onclick="editWord(id)"><i class="fa-solid fa-pen"></i></span>
                <span id="${item.id}" class="btn btn-remove btn-remove-${item.id}" onclick="remove(id)"><i class="fa-solid fa-trash"></i></span>
                <span id="${item.id}" class="btn btn-save btn-save-${item.id}" onclick="saveEditWord(id)"><i class="fa-solid fa-check"></i></span>
                <span id="${item.id}" class="btn btn-cancel btn-cancel-${item.id}" onclick="cancelEditWord()"><i class="fa-solid fa-xmark"></i></span>
            </div>`;
}

window.editWord = function(id) {
    cancelEditWord();
    document.querySelector(".btn-edit-" + id).style.display = "none";
    document.querySelector(".btn-remove-" + id).style.display = "none";
    document.querySelector(".btn-save-" + id).style.display = "flex";
    document.querySelector(".btn-cancel-" + id).style.display = "flex";
    document.querySelector(".word-name-" + id).style.display = "none";
    document.querySelector(".form-edit-word-item-" + id).style.display = "block";
}

window.cancelEditWord = function() {
    document.querySelectorAll(".btn-edit").forEach(item => {item.style.display = "flex"});
    document.querySelectorAll(".btn-remove").forEach(item => {item.style.display = "flex"});
    document.querySelectorAll(".btn-save").forEach(item => {item.style.display = "none"});
    document.querySelectorAll(".btn-cancel").forEach(item => {item.style.display = "none"});
    document.querySelectorAll(".word-name").forEach(item => {item.style.display = "block"});
    document.querySelectorAll(".form-edit-word-item").forEach(item => {item.style.display = "none"});
}

window.addWord = async function() {
    var name = document.querySelector(".name-word");
    var translation = document.querySelector(".translation-word");
    var category = document.querySelector(".form-select");

    if (name.value.length > 0 && translation.value.length > 0) {
        var word = {name: name.value, translation: translation.value, category: category.value};
        await addWord(word);

        words = await finWord();
        createWordEditList();

        name.value = "";
        translation.value = "";
        category.value = "null"
    }
}

window.saveEditWord = async function(id) {
    var name = document.querySelector(".name-word-item-" + id);
    var translation = document.querySelector(".translation-word-item-" + id);

    var word = {name: name.value, translation: translation.value};

    await updateWord(id, word);

    words = await finWord();

    createWordEditList();

}

window.remove = async function(id) {
    await removeWord(id);
    words = await finWord();
    createWordEditList();
}


init();