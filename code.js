var todosPokemons = [];
var qtPokemons = 500;
var urlImgPokemos =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

async function capturarPokemons() {
  var resposta = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=" + qtPokemons
  );
  var dados = await resposta.json();

  todosPokemons = dados.results;
  // console.log(todosPokemons);
  mostrarPokemons(todosPokemons);
}

function mostrarPokemons(pokemons) {
  var pokeContainer = document.querySelector(".pokeContainer");
  pokeContainer.innerHTML = "";

  // <div class="pokeCard">
  //   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
  //   <span>id</span>
  //   <span>Nome</span>
  // </div>;

  for (i = 0; i < pokemons.length; i++) {
    var pokeCard = document.createElement("div");
    pokeCard.classList.add("pokeCard");

    let id = pokemons[i].url.split("/")[6];
    pokeCard.innerHTML = `<img src=${urlImgPokemos + id + ".png"}>
       <span class="id">${id}</span>
       <span>${pokemons[i].name}</span>`;

    var btn = document.createElement("button");
    btn.classList.add(id + "");
    btn.innerHTML = "Ver";
    btn.addEventListener("click", detalharPokemon);
    pokeCard.appendChild(btn);

    pokeContainer.appendChild(pokeCard);
  }
}

function buscarPokemon() {
  var inputText = document.querySelector("input");
  var pokemonBuscado = [];

  for (i = 0; i < todosPokemons.length; i++) {
    if (todosPokemons[i].name.startsWith(inputText.value)) {
      pokemonBuscado.push(todosPokemons[i]);
    }
  }

  mostrarPokemons(pokemonBuscado);
}

function detalharPokemon(event) {
  let id = event.target.className;
  // window.location.href = `./detail.html?id=${id}`;
  var a = document.createElement("a");
  a.href = `./detail.html?id=${id}&type="Raio"`;
  a.click();
}

capturarPokemons();
