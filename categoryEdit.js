import {addCategory, findCategory, removerCategory, updateCategory} from './service.js';

var categories = [];

async function init() {
    categories = await findCategory();
    criarCategoryEditList();
    mostrarMain();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

function criarCategoryEditList() {
    var categoryList = document.querySelector(".category-list");
    categoryList.innerHTML = "";
    categories.forEach(item => {
        categoryList.innerHTML += criarCategoryEditItem(item);
    });
}

function criarCategoryEditItem(item) {
    return `<div class="category-edit-item">
                <div class="category-edit-item-content">
                    <span class="category-name category-name-${item.id}">${item.name}</span>
                    <input type="text" value=${item.name} class="form-control name-category-edit name-category-edit-${item.id}" placeholder="Nome da categoria" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <span id="${item.id}" class="btn btn-edit btn-edit-${item.id}" onclick="editarCategoryItem(id)"><i class="fa-solid fa-pen"></i></span>
                <span id="${item.id}" class="btn btn-remove btn-remove-${item.id}" onclick="remove(id)"><i class="fa-solid fa-trash"></i></span>
                <span id="${item.id}" class="btn btn-save btn-save-${item.id}" onclick="save(id)"><i class="fa-solid fa-check"></i></span>
                <span id="${item.id}" class="btn btn-cancel btn-cancel-${item.id}" onclick="cancelCategoryItem()"><i class="fa-solid fa-xmark"></i></span>
            </div>`;
}

window.editarCategoryItem = function(id) {
    cancelCategoryItem();
    document.querySelector(".btn-edit-" + id).style.display = "none";
    document.querySelector(".btn-remove-" + id).style.display = "none";
    document.querySelector(".btn-save-" + id).style.display = "flex";
    document.querySelector(".btn-cancel-" + id).style.display = "flex";
    document.querySelector(".category-name-" + id).style.display = "none";
    document.querySelector(".name-category-edit-" + id).style.display = "block";
}

window.cancelCategoryItem = function() {
    document.querySelectorAll(".btn-edit").forEach(item => {item.style.display = "flex";}); 
    document.querySelectorAll(".btn-remove").forEach(item => {item.style.display = "flex";}); 
    document.querySelectorAll(".btn-save").forEach(item => {item.style.display = "none";}); 
    document.querySelectorAll(".btn-cancel").forEach(item => {item.style.display = "none";});
    document.querySelectorAll(".category-name").forEach(item => {item.style.display = "block";});
    document.querySelectorAll(".name-category-edit").forEach(item => {item.style.display = "none";});
}

window.addCategory = async function() {
    var nameCategory = document.querySelector(".name-category");
    if (nameCategory.value.length > 0) {
        await addCategory({name: nameCategory.value});
        categories = await findCategory();
        nameCategory.value = "";
        criarCategoryEditList();
    }
}

window.save = async function(id) {
    var nameCategory = document.querySelector(".name-category-edit-" + id);
    if (nameCategory.value.length > 0) {
        var item = {name: nameCategory.value};
        await updateCategory(id, item);
        categories = await findCategory();
        nameCategory.value = "";
        criarCategoryEditList();
    }
}

window.remove = async function(id) {
    await removerCategory(id);
    categories = await findCategory();
    criarCategoryEditList();
}

init();