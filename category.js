import {findCategory} from './service.js';

var categories = [];

async function init() {
    categories = await findCategory();
    criarCategoryList();
}

function criarCategoryList() {
    var categoryList = document.querySelector(".category-list");

    categories.forEach(item => {
        categoryList.innerHTML += criarCategoryItem(item);
    });
}

function criarCategoryItem(item) {
    return `<a class="category-item" href="quiz.html?category=${item.id}"> ${item.name} </a>`;
}

init();