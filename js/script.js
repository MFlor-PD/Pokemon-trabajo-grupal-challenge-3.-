
const btnGetPokemon = document.getElementById("get-pokemon"); //Boton
const infoPokemonDIV = document.getElementById("info-pokemon"); //Contenedor
let selectedPokemon;
let pokemon_types;

function getTypesPokemon (){
    let text ="";
    pokemon_types.forEach(element => {
        //console.log(element)
        fetch(`${element.type.url}`)
        .then((response) => {
            if (!response.ok) throw new Error('Error en la solicitud');
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            //console.log(data.sprites["generation-iii"].colosseum.name_icon);
        
            text = `<img src= ${data.sprites["generation-iii"].colosseum.name_icon}>`;
            infoPokemonDIV.innerHTML +=text;
        })
    });
}

function getPokemon (){
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
    .then((response) => {
        if (!response.ok) throw new Error('Error en la solicitud');
        return response.json();
    })
    .then((data) => {
        //console.log(data);
        //getTypesPokemon(data.types);
        pokemon_types = data.types;
        //const pokemonTypes = data.types.map((type) => type.type.name).join(', ');
        infoPokemonDIV.innerHTML =  
            `<div class="character">
                    <img src=${data.sprites.front_default}>
                    <h3>${data.name}</h3>
                    <p>Peso: ${data.weight}</p>
                    <p>Altura: ${data.height}</p>
                </div>`;
    }).then(() => {
        getTypesPokemon();
    })
    .catch((error) => {
        console.error("Error: No se pudo procesar la solicitud")
    });

}

btnGetPokemon.addEventListener("click", () => {
    selectedPokemon = document.getElementById("pokemon-select").value; // Pokemon Seleccionado
    infoPokemonDIV.style="";
    getPokemon()
})