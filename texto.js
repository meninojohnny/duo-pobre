var categoryId;
var text;

async function init() {
    var params = new URLSearchParams(window.location.search);
    categoryId = params.get('category');

    text = await findText(categoryId);

    adicionarAppBar();
    if (text != null) {
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
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="categoryText.html"><i class="fa-solid fa-arrow-left"></i></a>
                            <span class="text-app-bar">${text.tema}</span>
                            <a class="btn-app-bar" href="inicial.html"><i class="fa-solid fa-house"></i></a>`;
}

async function criarAlternativas() {
    var wordTitle = document.querySelector(".text");
    var traducaoText = document.querySelector(".traducao");

    wordTitle.innerHTML = text.texto;
    traducaoText.innerHTML = text.traducao;
}

window.mostrarTraducao = function () {
    document.querySelector(".traducao-texto").style.display = "flex";
    document.querySelector(".btn-show").style.display = "none";
}

async function lerJsonEMapear() {
    try {
        const response = await fetch("words.json");
        const jsonData = await response.json();

        const listaDicionarios = jsonData.textos.map(item => ({
            tema: item.tema,
            traducao: item.traducao,
            texto: item.texto
        }));

        return listaDicionarios;
    } catch (error) {
        console.error("Erro ao ler JSON:", error);
        return [];
    }
}

function gerarId(texto) {
    return btoa(unescape(encodeURIComponent(texto)));
}

async function findText(id) {
    const texts = await lerJsonEMapear();

    for (var i of texts) {
        var c = gerarId(i.tema);

        if (c == id) {
            return i;
        }
    }
}

init();

// lerJsonEMapear()