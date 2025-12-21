var categories = [];

async function init() {

    categories = await lerJsonEMapear();

    adicionarAppBar();
    if (categories.length > 0) {
        criarAlternativas();
    }

    mostrarMain();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

function adicionarAppBar() {
    const textAppBar = document.querySelector(".app-bar");
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="category.html"><i class="fa-solid fa-arrow-left"></i></a>
                            <span class="text-app-bar">Categorias</span>
                            <a class="btn-app-bar" href="inicial.html"><i class="fa-solid fa-house"></i></a>`;
}

async function criarAlternativas() {
    var alternatives = document.querySelector(".category-list");

    alternatives.innerHTML = "";

    categories.forEach(w => {
        alternatives.innerHTML += criarAlternativaItem(w);
    });
}

function criarAlternativaItem(item) {
    return `<a class="category-item" href="texto.html?category=${gerarId(item.name)}">${item.name}</a>`;
}

async function lerJsonEMapear() {
    try {
        const response = await fetch("words.json");
        const jsonData = await response.json();

        const listaDicionarios = jsonData.textos.map(item => ({
            name: item.tema
        }));

        console.log(listaDicionarios);
        return listaDicionarios;
    } catch (error) {
        console.error("Erro ao ler JSON:", error);
        return [];
    }
}

function gerarId(texto) {
    return btoa(unescape(encodeURIComponent(texto)));
}

init();

// lerJsonEMapear()