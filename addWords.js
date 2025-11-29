import {addWord} from './service.js';

function init() {
    mostrarMain();
}

window.addWords = async function()  {
    var words = document.querySelector(".name-word");

    if (words.value.length > 0) {

        var lista = JSON.parse(words.value);

        console.log(lista);

        for (var i of lista) {
            await addWord(i);
        }

    }
}


function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

init();
